import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { CreateEditorDto } from "./dto/create-editor.dto";
import { Role } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (
      user &&
      user.isActive &&
      (await bcrypt.compare(password, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      role: Role.USER,
    });

    const { password, ...result } = user;
    return result;
  }

  async createEditor(createEditorDto: CreateEditorDto, adminId: string) {
    // Verify admin permissions
    const admin = await this.usersService.findById(adminId);
    if (!admin || admin.role !== Role.ADMIN) {
      throw new ForbiddenException("Only admins can create editor accounts");
    }

    // Check if email has @vsm.org.vn domain
    if (!createEditorDto.email.endsWith("@vsm.org.vn")) {
      throw new ForbiddenException(
        "Editor accounts must use @vsm.org.vn email domain",
      );
    }

    const existingUser = await this.usersService.findByEmail(
      createEditorDto.email,
    );
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(createEditorDto.password, 10);
    const editor = await this.usersService.create({
      ...createEditorDto,
      password: hashedPassword,
      role: Role.EDITOR,
    });

    const { password, ...result } = editor;
    return result;
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const { password, ...result } = user;
    return result;
  }
}
