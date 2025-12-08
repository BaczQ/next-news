// prisma/seed.ts

import { prisma } from "../src/lib/prisma"; // если папка src есть именно так

const categories = [
  { name: "US", slug: "us", shortDescription: "US news" },
  { name: "World", slug: "world", shortDescription: "World news" },
  { name: "Politics", slug: "politics", shortDescription: "Politics" },
  { name: "Business", slug: "business", shortDescription: "Business" },
  { name: "Health", slug: "health", shortDescription: "Health" },
  { name: "Entertainment", slug: "entertainment", shortDescription: "Entertainment news" },
  { name: "Style", slug: "style", shortDescription: "Style & fashion" },
  { name: "Travel", slug: "travel", shortDescription: "Travel" },
  { name: "Sports", slug: "sports", shortDescription: "Sports" },
  { name: "Science", slug: "science", shortDescription: "Science & Tech" },
  { name: "Climate", slug: "climate", shortDescription: "Climate & Environment" },
  { name: "Weather", slug: "weather", shortDescription: "Weather" },
  { name: "Ukraine-Russia War", slug: "ukraine-russia-war", shortDescription: "War coverage" },
  { name: "Israel-Hamas War", slug: "israel-hamas-war", shortDescription: "War coverage" },
  { name: "Games", slug: "games", shortDescription: "Games & esports" },
];

async function main() {
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];

    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        shortDescription: c.shortDescription,
        sortOrder: i,
        isActive: true,
      },
      create: {
        name: c.name,
        slug: c.slug,
        shortDescription: c.shortDescription,
        sortOrder: i,
        isActive: true,
      },
    });
  }
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
