import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string | null;
        password: string;
        avatar: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
    }>;
    findAll(role?: string, isActive?: string, keyword?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            posts: number;
            comments: number;
        };
        email: string;
        avatar: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
    }[]>;
    findById(id: string): Promise<{
        _count: {
            events: number;
            posts: number;
            comments: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string | null;
        password: string;
        avatar: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string | null;
        password: string;
        avatar: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        avatar: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string | null;
        password: string;
        avatar: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
    }>;
}
