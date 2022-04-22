import { PrismaClient } from '@prisma/client';
import { cities } from '../resources/json/cities';
import { states } from '../resources/json/states';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding states...');
  await prisma.state.deleteMany();
  await prisma.city.deleteMany();

  await prisma.state.createMany({
    data: states,
  });

  console.log('Seeding cities...');
  await prisma.city.createMany({
    data: cities,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
