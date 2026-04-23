import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  console.log("Cleaning database...");
  await prisma.user.deleteMany();

  console.log("Seeding user...");
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Seed finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });