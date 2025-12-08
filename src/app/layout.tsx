import type { Metadata } from "next";
import { HeroUIProvider } from "@heroui/react";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "BF News",
  description: "News engine on Next.js + Prisma",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="bg-background text-foreground">
        <HeroUIProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">{children}</div>
            </main>
            <Footer />
          </div>
        </HeroUIProvider>
      </body>
    </html>
  );
}
