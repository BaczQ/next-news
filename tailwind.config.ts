// tailwind.config.ts
import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // если есть
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // если есть
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // ВАЖНО
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};

export default config;
