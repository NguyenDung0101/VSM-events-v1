import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Role, EventStatus, EventCategory } from '@prisma/client';
import { Event } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { UploadService } from 'src/upload/upload.service';

const eventWithImage = Prisma.validator<Prisma.EventInclude>()({
  image: true,
});
export type EventWithImage = Prisma.EventGetPayload<{ include: typeof eventWithImage }>;
@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService, private uploadService: UploadService,) {}

  private readonly eventWithImage = Prisma.validator<Prisma.EventInclude>()({
    image: true,
  });
  
  async getEvents(status?: string): Promise<EventWithImage[]> {
    // Kiểm tra status có hợp lệ không (nếu lấy từ query string)
    const validStatuses = Object.values(EventStatus);
    const filterStatus = validStatuses.includes(status as EventStatus)
      ? (status as EventStatus)
      : undefined;

    return this.prisma.event.findMany({
      where: filterStatus ? { status: filterStatus } : undefined,
      include: this.eventWithImage,
    });
  }


  async create(createEventDto: CreateEventDto, userId: string, userRole: Role, file?: Express.Multer.File) {
    if (userRole !== Role.EDITOR && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Chỉ Editor và Admin mới có thể tạo sự kiện');
    }

    let imageId: string | undefined;
    let imageUrl: string | undefined;

    if (file) {
      // Lưu file ảnh vào thư mục public/image/events
      imageUrl = await this.uploadService.saveFile(file, 'events');
      // Tạo bản ghi Image trong cơ sở dữ liệu
      const image = await this.prisma.image.create({
        data: {
          url: imageUrl,
          type: 'event_post', // Giữ type là 'event_post' để phân biệt loại ảnh
          eventId: undefined, // Đảm bảo không gán userId
        },
      });
      imageId = image.id;
    }

    const eventData = {
      ...createEventDto,
      imageEvent: imageUrl, // Đồng bộ với image.url
      date: new Date(createEventDto.date),
      registrationDeadline: createEventDto.registrationDeadline
        ? new Date(createEventDto.registrationDeadline)
        : null,
      authorId: userId,
      currentParticipants: 0,
      image: imageId ? { connect: { id: imageId } } : undefined, // Liên kết với Image
    };

    return this.prisma.event.create({
      data: eventData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        image: true, // Include quan hệ Image
      },
    });
  }

  async findAll(query?: any) {
    const {
      category,
      status,
      featured,
      search,
      upcoming = 'true',
      limit = '10',
      page = '1',
    } = query || {};

    const where: any = { published: true };

    if (category) where.category = category;
    if (status) where.status = status;
    if (featured === 'true') where.featured = true;
    if (upcoming === 'true') {
      where.date = { gte: new Date() };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        orderBy: { date: 'asc' },
        take,
        skip,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          image: true, // Include quan hệ Image
          _count: {
            select: {
              registrations: true,
            },
          },
        },
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      data: events,
      pagination: {
        total,
        page: parseInt(page),
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    };
  }

  async findAllForAdmin(query: any, userRole: Role) {
    if (userRole !== Role.EDITOR && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Chỉ Editor và Admin mới có thể xem tất cả sự kiện');
    }

    const {
      category,
      status,
      published,
      search,
      authorId,
      startDate,
      endDate,
      limit = '10',
      page = '1',
    } = query || {};

    const where: any = {};

    if (category) where.category = category;
    if (status) where.status = status;
    if (published === 'true' || published === 'false') {
      where.published = published === 'true';
    }
    if (authorId) where.authorId = authorId;

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take,
        skip,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          image: true, // Include quan hệ Image
          _count: {
            select: {
              registrations: true,
            },
          },
        },
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      data: events,
      pagination: {
        total,
        page: parseInt(page),
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    };
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        image: true, // Include quan hệ Image
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Sự kiện không tồn tại');
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto, userId: string, userRole: Role, file?: Express.Multer.File) {
    if (userRole !== Role.EDITOR && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Chỉ Editor và Admin mới có thể cập nhật sự kiện');
    }

    // Kiểm tra sự kiện tồn tại
    const existingEvent = await this.prisma.event.findUnique({
      where: { id },
      include: { image: true },
    });

    if (!existingEvent) {
      throw new NotFoundException('Không tìm thấy sự kiện');
    }

    let imageId: string | undefined;
    let imageUrl: string | undefined;

    if (file) {
      // Xóa ảnh cũ nếu tồn tại
      if (existingEvent.image) {
        await this.uploadService.deleteFile(existingEvent.image.url);
        await this.prisma.image.delete({ where: { id: existingEvent.image.id } });
      }

      // Lưu file ảnh mới
      imageUrl = await this.uploadService.saveFile(file, 'events');
      const image = await this.prisma.image.create({
        data: {
          url: imageUrl,
          type: 'event_post',
          eventId: id,
        },
      });
      imageId = image.id;
    }

    const eventData = {
      ...updateEventDto,
      imageEvent: file ? imageUrl : existingEvent.imageEvent,
      date: updateEventDto.date ? new Date(updateEventDto.date) : existingEvent.date,
      registrationDeadline: updateEventDto.registrationDeadline
        ? new Date(updateEventDto.registrationDeadline)
        : existingEvent.registrationDeadline,
      image: imageId ? { connect: { id: imageId } } : existingEvent.image ? { connect: { id: existingEvent.image.id } } : undefined,
    };

    return this.prisma.event.update({
      where: { id },
      data: eventData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        image: true,
      },
    });
}

  async remove(id: string, userRole: Role) {
    if (userRole !== Role.EDITOR && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Chỉ Editor và Admin mới có thể xóa sự kiện');
    }

    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException('Sự kiện không tồn tại');
    }

    // Theo schema, image sẽ tự động set null do onDelete: SetNull
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async getEventStats(query: any, userRole: Role) {
    if (userRole !== Role.EDITOR && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Chỉ Editor và Admin mới có thể xem thống kê');
    }

    const { startDate, endDate } = query || {};
    const dateFilter: any = {};

    if (startDate || endDate) {
      if (startDate) dateFilter.gte = new Date(startDate);
      if (endDate) dateFilter.lte = new Date(endDate);
    }

    const where = dateFilter.gte || dateFilter.lte ? { createdAt: dateFilter } : {};

    const [
      totalEvents,
      publishedEvents,
      upcomingEvents,
      ongoingEvents,
      completedEvents,
      totalRegistrations,
      eventsByCategory,
      recentEvents,
    ] = await Promise.all([
      this.prisma.event.count({ where }),
      this.prisma.event.count({ where: { ...where, published: true } }),
      this.prisma.event.count({
        where: {
          ...where,
          status: EventStatus.UPCOMING,
          date: { gte: new Date() },
        },
      }),
      this.prisma.event.count({ where: { ...where, status: EventStatus.ONGOING } }),
      this.prisma.event.count({ where: { ...where, status: EventStatus.COMPLETED } }),
      this.prisma.eventRegistration.count({
        where: {
          event: where,
        },
      }),
      this.prisma.event.groupBy({
        by: ['category'],
        where,
        _count: {
          category: true,
        },
      }),
      this.prisma.event.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          image: true, // Include quan hệ Image
          _count: {
            select: {
              registrations: true,
            },
          },
        },
      }),
    ]);

    return {
      overview: {
        totalEvents,
        publishedEvents,
        upcomingEvents,
        ongoingEvents,
        completedEvents,
        totalRegistrations,
      },
      categoryDistribution: eventsByCategory.reduce((acc, item) => {
        acc[item.category] = item._count.category;
        return acc;
      }, {} as Record<string, number>),
      recentEvents,
    };
  }
}