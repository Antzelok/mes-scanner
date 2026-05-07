import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";


const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.errorRecord.deleteMany();

  await prisma.user.createMany({
    data: sampleData.users,
  });

  console.log("Database seeded successfully!");
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
