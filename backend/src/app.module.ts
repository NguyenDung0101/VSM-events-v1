import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
import { UploadModule } from 'src/upload/upload.module';
import { EventsModule } from 'src/events/events.module';
import { EventRegistrationsModule } from 'src/event-registrations/event-registrations.module';
import { HomepageSectionsModule } from './homepage-sections/homepage-sections.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    UploadModule,
    EventsModule,
    EventRegistrationsModule,
    MulterModule.register(multerConfig),
    HomepageSectionsModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
