"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Building,
  Navigation,
  ExternalLink,
  CheckCircle,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(5, "Chủ đề phải có ít nhất 5 ký tự"),
  message: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự"),
});

type ContactForm = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      setIsSubmitting(true);

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Contact form submitted:", data);

      setIsSubmitted(true);
      form.reset();

      toast({
        title: "Gửi tin nhắn thành công!",
        description: "Chúng tôi sẽ phản hồi bạn trong vòng 24 giờ.",
      });
    } catch (error) {
      toast({
        title: "Gửi tin nhắn thất bại",
        description: "Có lỗi xảy ra, vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    address: "Tầng 15 - 279 Nguyễn Tri Phương, Phường Diên Hồng, TP. HCM",
    email: "info@vsm.org.vn",
    phone: "1900 1234",
    workingHours: "Thứ 2 - Thứ 6: 8:00 - 17:00",
    facebook: "facebook.com/VSMVietnam",
    instagram: "@vsm_vietnam",
    youtube: "VSM Vietnam Official",
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 dark:from-primary/5 dark:via-blue-950/50 dark:to-purple-950/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <MessageCircle className="h-8 w-8 text-primary mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Liên hệ với chúng tôi
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Có câu hỏi về sự kiện, muốn tham gia hoặc cần hỗ trợ? Đội ngũ
                VSM luôn sẵn sàng lắng nghe và hỗ trợ bạn.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>

                  <div className="space-y-6">
                    {/* Address */}
                    <Card className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <Building className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">
                              Địa chỉ văn phòng
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {contactInfo.address}
                            </p>
                            <Button
                              variant="link"
                              className="p-0 h-auto mt-2"
                              asChild
                            >
                              <a
                                href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                <Navigation className="h-4 w-4 mr-1" />
                                Xem trên bản đồ
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Email */}
                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-500/10 p-3 rounded-lg">
                            <Mail className="h-6 w-6 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Email</h3>
                            <p className="text-muted-foreground">
                              {contactInfo.email}
                            </p>
                            <Button
                              variant="link"
                              className="p-0 h-auto mt-2"
                              asChild
                            >
                              <a href={`mailto:${contactInfo.email}`}>
                                Gửi email ngay
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Phone */}
                    <Card className="border-l-4 border-l-green-500">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-green-500/10 p-3 rounded-lg">
                            <Phone className="h-6 w-6 text-green-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Hotline</h3>
                            <p className="text-muted-foreground">
                              {contactInfo.phone}
                            </p>
                            <Button
                              variant="link"
                              className="p-0 h-auto mt-2"
                              asChild
                            >
                              <a
                                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                              >
                                Gọi ngay
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Working Hours */}
                    <Card className="border-l-4 border-l-orange-500">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-orange-500/10 p-3 rounded-lg">
                            <Clock className="h-6 w-6 text-orange-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Giờ làm việc</h3>
                            <p className="text-muted-foreground">
                              {contactInfo.workingHours}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Thứ 7, Chủ nhật: Nghỉ
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Social Media */}
                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">
                      Kết nối với chúng tôi
                    </h3>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={`https://${contactInfo.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={`https://instagram.com/${contactInfo.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={`https://youtube.com/@${contactInfo.youtube.replace(" ", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Youtube className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="shadow-xl border-2 border-border/50">
                    <CardHeader className="text-center border-b border-border/50">
                      <CardTitle className="text-2xl">
                        {isSubmitted
                          ? "Cảm ơn bạn đã liên hệ!"
                          : "Gửi tin nhắn cho chúng tôi"}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {isSubmitted
                          ? "Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể."
                          : "Điền thông tin bên dưới và chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ."}
                      </p>
                    </CardHeader>
                    <CardContent className="p-8">
                      {isSubmitted ? (
                        <div className="text-center py-8">
                          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">
                            Tin nhắn đã được gửi!
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            Chúng tôi sẽ phản hồi bạn qua email trong vòng 24
                            giờ.
                          </p>
                          <Button
                            onClick={() => setIsSubmitted(false)}
                            variant="outline"
                          >
                            Gửi tin nhắn khác
                          </Button>
                        </div>
                      ) : (
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Họ và tên{" "}
                                      <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Nhập họ và tên của bạn"
                                        className="h-11 border-2 focus:border-primary transition-colors"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Email{" "}
                                      <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="email@example.com"
                                        type="email"
                                        className="h-11 border-2 focus:border-primary transition-colors"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Số điện thoại (không bắt buộc)
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="0123456789"
                                        className="h-11 border-2 focus:border-primary transition-colors"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Chủ đề{" "}
                                      <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Chủ đề tin nhắn"
                                        className="h-11 border-2 focus:border-primary transition-colors"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Nội dung tin nhắn{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Hãy chia sẻ với chúng tôi câu hỏi, góp ý hoặc yêu cầu hỗ trợ của bạn..."
                                      rows={6}
                                      className="border-2 focus:border-primary transition-colors resize-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                              <div className="flex items-start">
                                <Mail className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                                <div className="text-sm text-blue-800">
                                  <p className="font-medium mb-1">
                                    Cam kết bảo mật thông tin
                                  </p>
                                  <p>
                                    Thông tin của bạn sẽ được bảo mật tuyệt đối
                                    và chỉ được sử dụng để phản hồi yêu cầu của
                                    bạn.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 shadow-lg"
                            >
                              {isSubmitting ? (
                                <div className="flex items-center">
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                  Đang gửi...
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <Send className="mr-2 h-5 w-5" />
                                  Gửi tin nhắn
                                </div>
                              )}
                            </Button>
                          </form>
                        </Form>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Vị trí văn phòng</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Đến thăm văn phòng VSM để gặp gỡ trực tiếp đội ngũ của chúng
                  tôi. Chúng tôi luôn chào đón các runner và những người yêu
                  thích chạy bộ.
                </p>
              </div>

              <Card className="overflow-hidden shadow-xl">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6244374077437!2d106.69197831533463!3d10.762622692332768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zMjc5IE5ndXnhu4VuIFRyaSBQaMawxqFuZywgUGjGsOG7nW5nIDUsIFF1YW4gNSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1647859234567!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        VSM Việt Nam
                      </h3>
                      <p className="text-muted-foreground flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {contactInfo.address}
                      </p>
                    </div>
                    <Button variant="outline" asChild>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Chỉ đường
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
