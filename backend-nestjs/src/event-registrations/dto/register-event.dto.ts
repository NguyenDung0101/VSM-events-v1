import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ExperienceLevel } from '@prisma/client';

export class RegisterEventDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  emergencyContact: string;

  @IsOptional()
  @IsString()
  emergencyPhone?: string;

  @IsOptional()
  @IsString()
  medicalConditions?: string;

  @IsEnum(ExperienceLevel)
  experience: ExperienceLevel;
}
