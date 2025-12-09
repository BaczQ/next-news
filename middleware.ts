// middleware.ts (в корне проекта)
export { auth as middleware } from "@/auth";

export const config = {
  // middleware будет срабатывать только для /admin/*,
  // а не для всего сайта
  matcher: ["/admin/:path*"],
};
