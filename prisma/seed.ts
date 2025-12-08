// prisma/seed.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

// Парсим mysql://user:pass@host:3306/dbname
const url = new URL(databaseUrl);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: parseInt(url.port || "3306", 10),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.slice(1),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

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
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        shortDescription: c.shortDescription,
        sortOrder: 1,
        isActive: true,
      },
      create: {
        name: c.name,
        slug: c.slug,
        shortDescription: c.shortDescription,
        sortOrder: 1,
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
