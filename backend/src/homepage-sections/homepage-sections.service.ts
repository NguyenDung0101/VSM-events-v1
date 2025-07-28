// src/homepage-sections/homepage-sections.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HomepageSection } from '@prisma/client';

@Injectable()
export class HomepageSectionsService {
  constructor(private prisma: PrismaService) {}

  async getAllSections(): Promise<HomepageSection[]> {
    return this.prisma.homepageSection.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async createSection(data: {
    name: string;
    component: string;
    enabled: boolean;
    config: any;
    order: number;
    authorId?: string;
  }): Promise<HomepageSection> {
    return this.prisma.homepageSection.create({
      data,
    });
  }

  async updateSection(id: string, data: {
    name?: string;
    component?: string;
    enabled?: boolean;
    config?: any;
    order?: number;
  }): Promise<HomepageSection> {
    return this.prisma.homepageSection.update({
      where: { id },
      data,
    });
  }

  async deleteSection(id: string): Promise<HomepageSection> {
    return this.prisma.homepageSection.delete({
      where: { id },
    });
  }

  async reorderSections(sections: { id: string; order: number }[]): Promise<void> {
    const updates = sections.map(({ id, order }) =>
      this.prisma.homepageSection.update({
        where: { id },
        data: { order },
      })
    );
    await Promise.all(updates);
  }
}