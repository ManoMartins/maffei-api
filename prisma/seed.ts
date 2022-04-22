import { PrismaClient } from '@prisma/client';
import { genres } from '../resources/json/genres';
import { cities } from '../resources/json/cities';
import { states } from '../resources/json/states';
import { companies } from '../resources/json/companies';
import { platforms } from '../resources/json/platforms';

const prisma = new PrismaClient();

async function main() {
  await prisma.state.deleteMany();
  await prisma.city.deleteMany();

  console.log('Seeding states 🌱');
  await prisma.state.createMany({
    data: states,
  });

  console.log('Seeding cities 🌱');
  await prisma.city.createMany({
    data: cities,
  });

  console.log('Seeding platforms 🌱');
  await prisma.platform.createMany({
    data: platforms,
  });

  console.log('Seeding companies 🌱');
  await prisma.company.createMany({
    data: companies,
  });

  console.log('Seeding genres 🌱');
  await prisma.genre.createMany({
    data: genres,
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
