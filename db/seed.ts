import { PrismaClient } from "@prisma/client";
import { sampleData } from "./sample-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // 1. Clean the database (Order matters if you have relations!)
  // Delete child records first, then parents
  await prisma.user.deleteMany();

  // 2. Seed the data
  const result = await prisma.user.createMany({
    data: sampleData.users,
    skipDuplicates: true, // Prevents crashes if IDs overlap
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
