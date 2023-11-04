import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";
// https://vitejs.dev/config/

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_APP_API_KEY": JSON.stringify(process.env.VITE_APP_API_KEY),
    "process.env.VITE_APP_API_URL": JSON.stringify(process.env.VITE_APP_API_URL),
  },
});
