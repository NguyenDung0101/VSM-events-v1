import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Matches,
} from "class-validator";

export class CreateEditorDto {
  @ApiProperty({
    description: "Editor full name",
    example: "Jane Editor",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Editor email address (must be @vsm.org.vn)",
    example: "editor@vsm.org.vn",
  })
  @IsEmail()
  @IsNotEmpty()
  @Matches(/@vsm\.org\.vn$/, {
    message: "Editor email must use @vsm.org.vn domain",
  })
  email: string;

  @ApiProperty({
    description: "Editor password (minimum 6 characters)",
    example: "password123",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: "Editor avatar URL",
    example: "https://example.com/avatar.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar?: string;
}
