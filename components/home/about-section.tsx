"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Trophy, Heart } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Mục tiêu rõ ràng",
    description: "Xây dựng cộng đồng chạy bộ sinh viên mạnh mẽ và bền vững tại Việt Nam.",
  },
  {
    icon: Users,
    title: "Cộng đồng đoàn kết",
    description: "Kết nối hàng nghìn sinh viên có cùng đam mê chạy bộ trên khắp cả nước.",
  },
  {
    icon: Trophy,
    title: "Thành tựu xuất sắc",
    description: "Tổ chức thành công nhiều giải chạy lớn với sự tham gia của hàng nghìn vận động viên.",
  },
  {
    icon: Heart,
    title: "Tinh thần thể thao",
    description: "Lan tỏa tinh thần thể thao, sức khỏe và lối sống tích cực trong giới trẻ.",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Về <span className="gradient-text">VSM</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vietnam Student Marathon (VSM) là tổ chức phi lợi nhuận hàng đầu trong việc phát triển phong trào chạy bộ
            trong cộng đồng sinh viên Việt Nam.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 glass">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h3 className="text-3xl font-bold mb-6">Câu chuyện của chúng tôi</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Được thành lập vào năm 2020, VSM bắt đầu từ ý tưởng đơn giản: tạo ra một không gian để sinh viên có thể
                chia sẻ đam mê chạy bộ và cùng nhau phát triển.
              </p>
              <p>
                Từ những buổi chạy nhỏ với vài chục người tham gia, VSM đã phát triển thành một cộng đồng lớn với hàng
                nghìn thành viên trên khắp cả nước.
              </p>
              <p>
                Chúng tôi tự hào đã tổ chức thành công nhiều sự kiện chạy bộ quy mô lớn, góp phần lan tỏa tinh thần thể
                thao và lối sống khỏe mạnh trong giới trẻ.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img src="/placeholder.svg?height=500&width=500" alt="VSM Story" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-sm">Thành viên</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
