import { PrismaClient as SeedPrismaClient } from '@prisma/client';

const seedDb = new SeedPrismaClient();

async function main() {
  try {
    await seedDb.category.createMany({
      data: [
        { name: 'Famous People' },
        { name: 'Movies & TV' },
        { name: 'Musicians' },
        { name: 'Games' },
        { name: 'Animals' },
        { name: 'Philosophy' },
        { name: 'Scientists' },
      ],
    });
  } catch (error) {
    console.error('Error seeding default categories:', error);
  } finally {
    await seedDb.$disconnect();
  }
}

main();
