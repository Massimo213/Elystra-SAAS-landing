import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { apiDevPlugin } from "./vite-plugin-api"

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
