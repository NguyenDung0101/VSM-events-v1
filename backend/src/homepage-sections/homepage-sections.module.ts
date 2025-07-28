// src/homepage-sections/homepage-sections.module.ts
import { Module } from '@nestjs/common';
import { HomepageSectionsService } from './homepage-sections.service';
import { HomepageSectionsController } from './homepage-sections.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [HomepageSectionsService, PrismaService],
  controllers: [HomepageSectionsController],
})
export class HomepageSectionsModule {}