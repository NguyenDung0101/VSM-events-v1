import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@vsm.org.vn" },
    update: {},
    create: {
      email: "admin@vsm.org.vn",
      name: "VSM Admin",
      password: adminPassword,
      role: Role.ADMIN,
      isActive: true,
    },
  });

  // Create editor user
  const editorPassword = await bcrypt.hash("editor123", 10);
  const editor = await prisma.user.upsert({
    where: { email: "editor@vsm.org.vn" },
    update: {},
    create: {
      email: "editor@vsm.org.vn",
      name: "VSM Editor",
      password: editorPassword,
      role: Role.EDITOR,
      isActive: true,
    },
  });

  // Create test user
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Test User",
      password: userPassword,
      role: Role.USER,
      isActive: true,
    },
  });

  console.log("✅ Seeding completed!");
  console.log({ admin, editor, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
