# 🏃 Vietnam Student Marathon (VSM) - Fullstack Web App

A dynamic and responsive fullstack website designed for the **Vietnam Student Marathon** community. The platform provides event information, news updates, image galleries, and a custom-built CMS to manage all content.

## 🌐 Live Demo  
👉 [https://vsm.org.vn](https://vsm.org.vn)

---

## 🚀 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) – React framework for server-side rendering and routing  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework  
- [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/) – Accessible and customizable components  
- [Framer Motion](https://www.framer.com/motion/) – Animation library for smooth transitions  
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) – Form handling and validation  
- [Lucide Icons](https://lucide.dev/), [Recharts](https://recharts.org/), [Embla Carousel](https://www.embla-carousel.com/react/)

### Backend *(in progress)*
- [NestJS](https://nestjs.com/) – Node.js framework for scalable backend systems  
- [MySQL](https://www.mysql.com/) – Relational database  
- [Prisma](https://www.prisma.io/) – Type-safe ORM for database access  

---

## 📸 Features

- 🖥️ **Responsive UI** built with Tailwind and Radix  
- 📰 **News Section** with dynamic rendering of posts  
- 📷 **Event Image Gallery**  
- 🧩 **CMS Interface** for managing homepage layout and content  
- ✍️ **CRUD System** for events, news posts, images  
- 📈 Integrated components like charts, carousels, dialogs, tabs, etc.

---

## 🛠️ Project Scripts

```bash
npm run dev        # Start local development
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run linting
```

## 📦 Folder Structure (Frontend)

```bash
/app           # Next.js app router
/components    # Reusable UI components
/lib           # Utilities, hooks, helpers
/styles        # Global styles
/public        # Static assets
```

## 🔧 Setup Instructions

1. Clone the repo

```bash
git clone https://github.com/<your-username>/VSM-events-v1.git
cd VSM-events-v1
```

2. Install dependencies

```bash
npm install
```

3. Run the app locally

```bash
npm run dev
```

## 📍 Status

- ✅ Frontend: Completed
- 🔧 Backend (NestJS, MySQL): In progress (Auth, Admin Panel, API, CMS logic)

## ✨ Author

Nguyen Dung

- GitHub: @NguyenDung0101
- Email: dnguyentuan03@gmail.com

## 📄 License

This project is licensed under the MIT License. Feel free to use and modify for educational purposes.
