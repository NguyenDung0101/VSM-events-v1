import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { QueryPostsDto } from "./dto/query-posts.dto";
import { Role } from "@prisma/client";
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPostDto: CreatePostDto, authorId: string): Promise<{
        _count: {
            comments: number;
        };
        author: {
            name: string;
            avatar: string;
            id: string;
        };
    } & {
        title: string;
        tags: string;
        content: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        excerpt: string;
        cover: string | null;
        category: import(".prisma/client").$Enums.PostCategory;
        views: number;
        likes: number;
        featured: boolean;
        status: import(".prisma/client").$Enums.PostStatus;
        commentsCount: number;
        publishedAt: Date | null;
        authorId: string;
    }>;
    findAll(query: QueryPostsDto): Promise<{
        data: {
            tags: string[];
            commentsCount: number;
            _count: {
                comments: number;
            };
            author: {
                name: string;
                avatar: string;
                id: string;
            };
            title: string;
            content: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            excerpt: string;
            cover: string | null;
            category: import(".prisma/client").$Enums.PostCategory;
            views: number;
            likes: number;
            featured: boolean;
            status: import(".prisma/client").$Enums.PostStatus;
            publishedAt: Date | null;
            authorId: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        tags: string[];
        commentsCount: number;
        _count: {
            comments: number;
        };
        author: {
            name: string;
            avatar: string;
            id: string;
        };
        title: string;
        content: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        excerpt: string;
        cover: string | null;
        category: import(".prisma/client").$Enums.PostCategory;
        views: number;
        likes: number;
        featured: boolean;
        status: import(".prisma/client").$Enums.PostStatus;
        publishedAt: Date | null;
        authorId: string;
    }>;
    update(id: string, updatePostDto: UpdatePostDto, userId: string, userRole: Role): Promise<{
        author: {
            name: string;
            avatar: string;
            id: string;
        };
    } & {
        title: string;
        tags: string;
        content: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        excerpt: string;
        cover: string | null;
        category: import(".prisma/client").$Enums.PostCategory;
        views: number;
        likes: number;
        featured: boolean;
        status: import(".prisma/client").$Enums.PostStatus;
        commentsCount: number;
        publishedAt: Date | null;
        authorId: string;
    }>;
    remove(id: string, userId: string, userRole: Role): Promise<{
        title: string;
        tags: string;
        content: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        excerpt: string;
        cover: string | null;
        category: import(".prisma/client").$Enums.PostCategory;
        views: number;
        likes: number;
        featured: boolean;
        status: import(".prisma/client").$Enums.PostStatus;
        commentsCount: number;
        publishedAt: Date | null;
        authorId: string;
    }>;
    private parseTags;
}
