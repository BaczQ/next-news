// src/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "database", // сессии через таблицу Session из твоей схемы
  },
  providers: [
    // GitHub OAuth, env-переменные будут подхватываться автоматически:
    // AUTH_GITHUB_ID и AUTH_GITHUB_SECRET
    GitHub,
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role; // тип role уже есть у AdapterUser
      }
      return session;
    },
  },
};

export const {
  handlers, // { GET, POST } для /api/auth/[...nextauth]
  auth, // auth() – проверка сессии на сервере (Page, Route, Middleware и т.д.)
  signIn,
  signOut,
} = NextAuth(authConfig);
