"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon, UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, Input } from "@heroui/react";

type NavItem = {
  label: string;
  href: string;
};

const primaryItems: NavItem[] = [
  { label: "US", href: "/us" },
  { label: "World", href: "/world" },
  { label: "Politics", href: "/politics" },
  { label: "Business", href: "/business" },
  { label: "Health", href: "/health" },
  { label: "Entertainment", href: "/entertainment" },
  { label: "Style", href: "/style" },
];

const secondaryItems: NavItem[] = [
  { label: "Travel", href: "/travel" },
  { label: "Sports", href: "/sports" },
  { label: "Science", href: "/science" },
  { label: "Climate", href: "/climate" },
  { label: "Weather", href: "/weather" },
  { label: "Ukraine-Russia War", href: "/ukraine-russia-war" },
  { label: "Israel-Hamas War", href: "/israel-hamas-war" },
  { label: "Games", href: "/games" },
];

const allItems: NavItem[] = [...primaryItems, ...secondaryItems];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const [isMoreOpen, setIsMoreOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isInMore = secondaryItems.some((i) => i.href === pathname);

  return (
    <header className="w-full border-b bg-white text-black">
      <div className="mx-auto max-w-6xl px-4">
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          isBordered={false}
          maxWidth="full"
          classNames={{
            base: "h-[60px] px-0",
            wrapper: "px-0",
          }}
        >
          {/* Левая часть: бургер + логотип */}
          <NavbarContent justify="start" className="gap-2">
            {/* Бургер только до 768px */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-default-100 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>

            <NavbarBrand className="select-none">
              {isHome ? (
                <div className="flex items-center">
                  <span className="text-xl font-extrabold tracking-tight">BF</span>
                  <span className="ml-1 text-xl font-semibold tracking-tight">News</span>
                </div>
              ) : (
                <NextLink href="/" className="flex items-center text-black hover:opacity-80">
                  <span className="text-xl font-extrabold tracking-tight">BF</span>
                  <span className="ml-1 text-xl font-semibold tracking-tight">News</span>
                </NextLink>
              )}
            </NavbarBrand>
          </NavbarContent>

          {/* Центр: горизонтальное меню, только от 768px */}
          <NavbarContent justify="center" className="hidden md:flex gap-5 text-sm">
            {primaryItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  href={item.href}
                  className={
                    pathname === item.href
                      ? "font-semibold text-sm text-black bg-gray-100 whitespace-nowrap px-3 py-1 rounded-full"
                      : "font-semibold text-sm text-black/80 whitespace-nowrap transition-colors px-3 py-1 rounded-full hover:bg-gray-100 hover:text-black"
                  }
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}

            {/* More: свой дропдаун без HeroUI */}
            <NavbarItem>
              <div className="relative group">
                <button
                  type="button"
                  className={
                    isInMore
                      ? "font-semibold text-black px-2 py-1 rounded-full bg-gray-100"
                      : "font-semibold text-black/80 hover:bg-gray-100 hover:text-black px-2 py-1 rounded-full "
                  }
                >
                  More ▾
                </button>

                <div
                  className="
          pointer-events-auto
          invisible opacity-0
          group-hover:visible group-hover:opacity-100
          transition-opacity
          absolute left-0 top-full mt-0
          min-w-[190px]
          rounded-md border border-gray-200 bg-white shadow-lg z-50 py-1
        "
                >
                  {secondaryItems.map((item) => (
                    <NextLink
                      key={item.href}
                      href={item.href}
                      className={
                        pathname === item.href
                          ? "block px-3 py-1 text-sm font-semibold text-black bg-gray-100 rounded-full"
                          : "block px-3 py-1 text-sm font-medium text-black/80 hover:text-black hover:font-semibold hover:bg-gray-100 rounded-full transition-colors"
                      }
                    >
                      {item.label}
                    </NextLink>
                  ))}
                </div>
              </div>
            </NavbarItem>
          </NavbarContent>

          {/* Правая часть: поиск + логин */}
          <NavbarContent justify="end" className="hidden md:flex gap-3">
            {/* Кнопка поиска */}
            <NavbarItem>
              <button
                type="button"
                className="flex items-center justify-center rounded-full border border-gray-300 p-1.5 hover:bg-gray-100 hover:bg-gray-100 transition-colors"
                aria-label="Open search"
                onClick={() => {
                  console.log("open search modal");
                }}
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </NavbarItem>

            {/* Логин без HeroUI Button */}
            <NavbarItem>
              <NextLink
                href="/login"
                className="flex items-center justify-center rounded-full border border-gray-300 p-1.5 hover:bg-gray-100 transition-colors"
                aria-label="Log in"
              >
                <UserCircleIcon className="w-6 h-6" />
              </NextLink>
            </NavbarItem>
          </NavbarContent>

          {/* На мобильном справа иконка юзера */}
          <NavbarContent justify="end" className="md:hidden">
            <NavbarItem>
              <NextLink href="/login" aria-label="Log in" className="flex items-center justify-center">
                <UserCircleIcon className="w-7 h-7" />
              </NextLink>
            </NavbarItem>
          </NavbarContent>

          {/* Мобильное полноэкранное меню */}
          <NavbarMenu className="pt-0">
            {/* Верхняя строка с поиском */}
            <div className="sticky top-0 z-10 bg-background border-b px-4 pb-3 pt-4 flex flex-col gap-3">
              <Input
                size="lg"
                radius="none"
                aria-label="Search BF News"
                placeholder="Search BF News..."
                classNames={{
                  inputWrapper: "border border-default-200 rounded-none shadow-none",
                }}
              />
              <div className="flex justify-between items-center text-sm">
                <NextLink href="/listen" className="font-medium text-black hover:text-black/70">
                  Listen
                </NextLink>
                <NextLink href="/watch" className="font-medium text-black hover:text-black/70">
                  Watch
                </NextLink>
              </div>
            </div>

            {/* Разделы */}
            <div className="px-4 py-3 flex flex-col gap-1">
              <div className="mt-1 mb-2 text-xs font-semibold uppercase text-foreground/60">Edition</div>
              {allItems.map((item) => (
                <NavbarMenuItem key={item.href}>
                  <NextLink
                    href={item.href}
                    className="block w-full py-1.5 text-base text-black hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NextLink>
                </NavbarMenuItem>
              ))}
            </div>
          </NavbarMenu>
        </Navbar>
      </div>
    </header>
  );
}
