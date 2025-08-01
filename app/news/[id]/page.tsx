"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommentSection } from "@/components/comments/comment-section";
import {
  ArrowLeft,
  Calendar,
  User,
  Eye,
  Heart,
  Share2,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface Author {
  id: string;
  name: string;
  avatar?: string;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  author: Author;
  date: string;
  category: "training" | "nutrition" | "events" | "tips";
  views: number;
  featured: boolean;
  likes: number;
  commentsCount: number;
  tags?: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [mockPosts, setMockPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Mock data for posts
    const mockData: Post[] = [
      {
        id: "1",
        title: "Hướng dẫn chuẩn bị cho marathon đầu tiên",
        excerpt:
          "5 điều bạn không thể bỏ qua trước khi bắt đầu hành trình 42 km đầu tiên của mình.",
        content:
          "<p>Chuẩn bị cho một cuộc marathon đầu tiên là một thử thách lớn đối với bất kỳ runner nào. Dưới đây là những điều cần lưu ý:</p><h2>1. Xây dựng nền tảng thể lực</h2><p>Trước khi bắt đầu lịch trình tập luyện marathon, bạn nên có khả năng chạy liên tục ít nhất 5-8km thoải mái. Điều này tạo nền tảng vững chắc để xây dựng sức bền cho quãng đường dài hơn.</p><h2>2. Lập kế hoạch tập luyện chi tiết</h2><p>Một lịch trình tập luyện marathon thường kéo dài 16-20 tuần. Kế hoạch này nên bao gồm các bài tập đa dạng như chạy tempo, chạy dài, chạy nhanh ngắt quãng và tập sức mạnh.</p><h2>3. Dinh dưỡng và hydrat hóa</h2><p>Học cách nạp năng lượng trước, trong và sau khi chạy. Thử nghiệm với các loại gel, thanh năng lượng và đồ uống thể thao trong quá trình tập luyện để tìm ra những gì phù hợp với bạn.</p><h2>4. Chọn giày và trang phục phù hợp</h2><p>Đầu tư vào đôi giày chạy bộ chất lượng phù hợp với kiểu bàn chân và phong cách chạy của bạn. Trang phục nên thoáng khí, thoải mái và phù hợp với điều kiện thời tiết.</p><h2>5. Chiến lược race day</h2><p>Lập kế hoạch chi tiết cho ngày đua, bao gồm thời gian đến địa điểm, bữa ăn trước cuộc đua, pace dự kiến và chiến lược tinh thần khi gặp khó khăn.</p>",
        cover: "/placeholder.svg?height=400&width=600",
        author: {
          id: "1",
          name: "Nguyễn Văn A",
          avatar: "/placeholder-user.jpg",
        },
        date: "2024-01-10",
        category: "training",
        views: 1250,
        featured: true,
        likes: 45,
        commentsCount: 12,
        tags: "marathon,running,beginners",
      },
      {
        id: "2",
        title: "Bí quyết giữ phong độ khi chạy đường dài",
        excerpt:
          "Chuyên gia VSM chia sẻ các tip giúp bạn tránh chấn thương và duy trì hiệu suất.",
        content:
          "<p>Chạy bộ đường dài đòi hỏi sự kiên trì và chiến lược đúng đắn. Dưới đây là những bí quyết giúp bạn duy trì phong độ tốt:</p><h2>1. Tăng cường sức mạnh cốt lõi</h2><p>Một thân hình mạnh mẽ, đặc biệt là phần cốt lõi, sẽ cải thiện tư thế chạy và giảm nguy cơ chấn thương. Tập plank, deadlift và các bài tập core 2-3 lần/tuần.</p><h2>2. Luân phiên cường độ tập luyện</h2><p>Không nên tập luyện cường độ cao mỗi ngày. Xen kẽ ngày tập nặng với ngày tập nhẹ hoặc nghỉ ngơi để cơ thể phục hồi.</p><h2>3. Dinh dưỡng phục hồi</h2><p>Trong vòng 30 phút sau khi chạy, bổ sung protein và carbohydrate để tái tạo cơ bắp và nạp lại glycogen.</p><h2>4. Ngủ đủ giấc</h2><p>Giấc ngủ chất lượng là yếu tố quan trọng nhất cho việc phục hồi. Mục tiêu 7-9 giờ ngủ mỗi đêm để cơ thể tái tạo tối đa.</p>",
        cover: "/placeholder.svg?height=400&width=600",
        author: {
          id: "2",
          name: "Trần Thị B",
          avatar: "/placeholder-user.jpg",
        },
        date: "2024-01-08",
        category: "tips",
        views: 980,
        featured: false,
        likes: 28,
        commentsCount: 8,
        tags: "endurance,training,tips",
      },
    ];

    setMockPosts(mockData);

    const postId = params.id as string;
    const foundPost = mockData.find((p) => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
      // Simulate view increment
      foundPost.views += 1;
    }
  }, [params.id]);

  const handleLike = () => {
    if (post) {
      setIsLiked(!isLiked);
      if (!isLiked) {
        post.likes += 1;
      } else {
        post.likes -= 1;
      }
      setPost({ ...post });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Đã sao chép link bài viết!");
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getCategoryText = (category: string) => {
    switch (category.toLowerCase()) {
      case "training":
        return "Huấn luyện";
      case "nutrition":
        return "Dinh dưỡng";
      case "events":
        return "Sự kiện";
      case "tips":
        return "Mẹo hay";
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "training":
        return "bg-blue-500";
      case "nutrition":
        return "bg-green-500";
      case "events":
        return "bg-purple-500";
      case "tips":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-16">
        <article className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Button variant="ghost" className="mb-6" asChild>
                <Link href="/news">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại tin tức
                </Link>
              </Button>

              <div className="max-w-4xl mx-auto">
                {/* Article Header */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge
                      className={`${getCategoryColor(
                        post.category
                      )} text-white`}
                    >
                      {getCategoryText(post.category)}
                    </Badge>
                    {post.featured && (
                      <Badge className="bg-yellow-500 text-white">
                        Nổi bật
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {post.title}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {post.author.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {post.views.toLocaleString()} lượt xem
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        5 phút đọc
                      </span>
                    </div>
                  </div>

                  <div className="aspect-video rounded-xl overflow-hidden mb-8">
                    <img
                      src={
                        post.cover || "/placeholder.svg?height=600&width=800"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Article Content */}
                <Card className="mb-8">
                  <CardContent className="p-8">
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    {post.tags && (
                      <div className="mt-8 pt-8 border-t">
                        <h4 className="font-medium mb-3">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.split(",").map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-sm"
                            >
                              #{tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Social Actions */}
                    <div className="mt-8 pt-8 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant={isLiked ? "default" : "outline"}
                            onClick={handleLike}
                            className={
                              isLiked ? "bg-red-500 hover:bg-red-600" : ""
                            }
                          >
                            <Heart
                              className={`mr-2 h-4 w-4 ${
                                isLiked ? "fill-current" : ""
                              }`}
                            />
                            {post.likes} Thích
                          </Button>
                          <Button variant="outline" onClick={handleShare}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Chia sẻ
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {post.commentsCount} bình luận
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Bài viết liên quan
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockPosts
                        .filter(
                          (p) =>
                            p.id !== post.id && p.category === post.category
                        )
                        .slice(0, 2)
                        .map((relatedPost) => (
                          <Link
                            key={relatedPost.id}
                            href={`/news/${relatedPost.id}`}
                          >
                            <div className="flex space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                              <img
                                src={
                                  relatedPost.cover ||
                                  "/placeholder.svg?height=80&width=80"
                                }
                                alt={relatedPost.title}
                                className="w-20 h-20 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium line-clamp-2 mb-2">
                                  {relatedPost.title}
                                </h4>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <span>
                                    {new Date(
                                      relatedPost.date
                                    ).toLocaleDateString("vi-VN")}
                                  </span>
                                  <span>•</span>
                                  <span>{relatedPost.views} lượt xem</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Comments Section */}
                <CommentSection postId={post.id} />
              </div>
            </motion.div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
