// src/homepage-sections/homepage-sections.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { HomepageSectionsService } from './homepage-sections.service';
import { HomepageSection } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Giả sử bạn có guard để bảo vệ API

@Controller('homepage-sections')
export class HomepageSectionsController {
  constructor(private readonly homepageSectionsService: HomepageSectionsService) {}

  @Get()
  async getAllSections(): Promise<HomepageSection[]> {
    return this.homepageSectionsService.getAllSections();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSection(@Body() data: {
    name: string;
    component: string;
    enabled: boolean;
    config: any;
    order: number;
    authorId?: string;
  }): Promise<HomepageSection> {
    return this.homepageSectionsService.createSection(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateSection(@Param('id') id: string, @Body() data: {
    name?: string;
    component?: string;
    enabled?: boolean;
    config?: any;
    order?: number;
  }): Promise<HomepageSection> {
    return this.homepageSectionsService.updateSection(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSection(@Param('id') id: string): Promise<HomepageSection> {
    return this.homepageSectionsService.deleteSection(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reorder')
  async reorderSections(@Body() sections: { id: string; order: number }[]): Promise<void> {
    return this.homepageSectionsService.reorderSections(sections);
  }
}