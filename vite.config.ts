import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { apiDevPlugin } from "./vite-plugin-api"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const gscToken = env.VITE_GSC_VERIFICATION

  return {
    plugins: [
      react(),
      apiDevPlugin(),
      {
        name: "elystra-html-meta",
        transformIndexHtml(html) {
          if (!gscToken) return html
          const tag = `<meta name="google-site-verification" content="${gscToken}" />`
          return html.replace("</head>", `  ${tag}\n</head>`)
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
