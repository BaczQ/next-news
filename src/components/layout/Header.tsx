"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon, UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@heroui/react";

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

  return (
    <header className="w-full border-b bg-background">
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

            <NavbarBrand className="cursor-pointer select-none">
              <span className="text-xl font-extrabold tracking-tight">BF</span>
              <span className="ml-1 text-xl font-semibold tracking-tight">News</span>
            </NavbarBrand>
          </NavbarContent>

          {/* Центр: горизонтальное меню, только от 768px */}
          <NavbarContent justify="center" className="hidden md:flex gap-5 text-sm">
            {primaryItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link href={item.href} className="text-foreground/80 hover:text-foreground whitespace-nowrap">
                  {item.label}
                </Link>
              </NavbarItem>
            ))}

            {/* More с выпадающим списком второстепенных разделов */}
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <button className="text-foreground/80 hover:text-foreground text-sm font-medium whitespace-nowrap">More ▾</button>
                </DropdownTrigger>
                <DropdownMenu aria-label="More sections">
                  {secondaryItems.map((item) => (
                    <DropdownItem key={item.href}>
                      <Link href={item.href} className="w-full">
                        {item.label}
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>

          {/* Правая часть: Watch / Log in */}
          <NavbarContent justify="end" className="hidden md:flex gap-3">
            {/* Кнопка поиска */}
            <NavbarItem>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-default-100 flex items-center justify-center"
                aria-label="Open search"
                onClick={() => {
                  // сюда потом повесим открытие модалки поиска
                  console.log("open search modal");
                }}
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </NavbarItem>

            <NavbarItem>
              <Button as={Link} href="/login" size="sm" variant="bordered" className="text-xs font-medium">
                <UserCircleIcon className="w-6 h-6" />
              </Button>
            </NavbarItem>
          </NavbarContent>

          {/* На мобильном справа иконка юзера */}
          <NavbarContent justify="end" className="md:hidden">
            <NavbarItem>
              <Link href="/login">
                <UserCircleIcon className="w-7 h-7" />
              </Link>
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
                <Link href="/listen" className="font-medium">
                  Listen
                </Link>
                <Link href="/watch" className="font-medium">
                  Watch
                </Link>
              </div>
            </div>

            {/* Разделы */}
            <div className="px-4 py-3 flex flex-col gap-1">
              <div className="mt-1 mb-2 text-xs font-semibold uppercase text-foreground/60">Edition</div>
              {allItems.map((item) => (
                <NavbarMenuItem key={item.href}>
                  <Link href={item.href} className="block w-full py-1.5 text-base" onPress={() => setIsMenuOpen(false)}>
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>
          </NavbarMenu>
        </Navbar>
      </div>
    </header>
  );
}
