import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { QueryPostsDto } from "./dto/query-posts.dto";
import { Role } from "@prisma/client";
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPostDto: CreatePostDto, authorId: string): Promise<{
        author: {
            id: string;
            name: string;
            avatar: string;
        };
        _count: {
            comments: number;
        };
    } & {
        id: string;
        content: string;
        category: import(".prisma/client").$Enums.PostCategory;
        status: import(".prisma/client").$Enums.PostStatus;
        featured: boolean;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        title: string;
        excerpt: string;
        cover: string | null;
        views: number;
        likes: number;
        tags: string;
        commentsCount: number;
        publishedAt: Date | null;
    }>;
    findAll(query: QueryPostsDto): Promise<{
        data: {
            tags: string[];
            commentsCount: number;
            author: {
                id: string;
                name: string;
                avatar: string;
            };
            _count: {
                comments: number;
            };
            id: string;
            content: string;
            category: import(".prisma/client").$Enums.PostCategory;
            status: import(".prisma/client").$Enums.PostStatus;
            featured: boolean;
            createdAt: Date;
            updatedAt: Date;
            authorId: string;
            title: string;
            excerpt: string;
            cover: string | null;
            views: number;
            likes: number;
            publishedAt: Date | null;
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
        author: {
            id: string;
            name: string;
            avatar: string;
        };
        _count: {
            comments: number;
        };
        id: string;
        content: string;
        category: import(".prisma/client").$Enums.PostCategory;
        status: import(".prisma/client").$Enums.PostStatus;
        featured: boolean;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        title: string;
        excerpt: string;
        cover: string | null;
        views: number;
        likes: number;
        publishedAt: Date | null;
    }>;
    update(id: string, updatePostDto: UpdatePostDto, userId: string, userRole: Role): Promise<{
        author: {
            id: string;
            name: string;
            avatar: string;
        };
    } & {
        id: string;
        content: string;
        category: import(".prisma/client").$Enums.PostCategory;
        status: import(".prisma/client").$Enums.PostStatus;
        featured: boolean;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        title: string;
        excerpt: string;
        cover: string | null;
        views: number;
        likes: number;
        tags: string;
        commentsCount: number;
        publishedAt: Date | null;
    }>;
    remove(id: string, userId: string, userRole: Role): Promise<{
        id: string;
        content: string;
        category: import(".prisma/client").$Enums.PostCategory;
        status: import(".prisma/client").$Enums.PostStatus;
        featured: boolean;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        title: string;
        excerpt: string;
        cover: string | null;
        views: number;
        likes: number;
        tags: string;
        commentsCount: number;
        publishedAt: Date | null;
    }>;
    private parseTags;
}
