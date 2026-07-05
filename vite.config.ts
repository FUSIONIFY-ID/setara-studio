import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Detect if the build is running on Vercel
const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true" || process.env.NOW_BUILDER === "1";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isVercel ? "/" : "/setara-studio/",
});
