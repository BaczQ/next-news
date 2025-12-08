# next-news

Experimental blog/CMS engine built with **Next.js (App Router)** and **MySQL**.  
Цель — сделать что-то вроде лёгкого WordPress на Next.js: админка для статей, медиа-библиотека, категории и теги.

## Tech stack

- **Next.js** (App Router, TypeScript)
- **React**
- **Tailwind CSS**
- **HeroUI** (UI-библиотека для админки)
- **MySQL** (основная БД)
- **Prisma ORM**
- **NextAuth** (аутентификация админов)

## Features (MVP)

- Публичная часть:
  - Главная страница со списком постов
  - Страница поста по `slug`
  - Список по категориям и тегам
  - Поиск по постам
  - SEO-мета из БД

- Админка:
  - Логин админа
  - Список постов
  - Создание/редактирование поста (title, slug, status, excerpt, content, SEO)
  - Выбор категории и тегов
  - Загрузка обложки
  - Медиа-библиотека (список медиа, редактирование alt + caption)

## Getting Started

### 1. Установка

```bash
git clone git@github.com:BaczQ/next-news.git
cd next-news
npm install
