// src/events/events.service.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from 'src/events/dto/update-event.dto';
import { Role } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto, userId: string, userRole: Role) {
    if (userRole !== Role.EDITOR && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Chỉ Editor và Admin mới có thể tạo sự kiện');
    }

    return this.prisma.event.create({
      data: {
        ...createEventDto,
        authorId: userId,
        currentParticipants: 0,
      },
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      where: { published: true },
      orderBy: { date: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: { registrations: true },
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto, userRole: Role) {
    if (userRole !== Role.EDITOR && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Chỉ Editor và Admin mới có thể cập nhật sự kiện');
    }

    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: string, userRole: Role) {
    if (userRole !== Role.EDITOR && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Chỉ Editor và Admin mới có thể xóa sự kiện');
    }

    return this.prisma.event.delete({
      where: { id },
    });
  }
}