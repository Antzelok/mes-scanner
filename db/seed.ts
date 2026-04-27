import { PrismaClient } from "@prisma/client";
import { sampleData } from "./sample-data";
import bcrypt from "bcryptjs"; // or 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // 1. Clean the database
  await prisma.user.deleteMany();

  // 2. Hash the passwords from sampleData
  const hashedUsers = await Promise.all(
    sampleData.users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword,
      };
    })
  );

  // 3. Seed the data
  const result = await prisma.user.createMany({
    data: hashedUsers,
    skipDuplicates: true,
  });

  console.log(`Seeded ${result.count} users successfully!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });