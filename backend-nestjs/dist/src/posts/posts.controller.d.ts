import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { QueryPostsDto } from "./dto/query-posts.dto";
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, req: any): Promise<{
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
    update(id: string, updatePostDto: UpdatePostDto, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
}
