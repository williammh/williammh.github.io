import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vite.dev/config/
export default defineConfig({
  // Relative URLs so the built index.html works from any location, including
  // being opened directly over file:// or served from a subpath.
  base: "./",
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    // JS/CSS are inlined into index.html by viteSingleFile; images and PDFs in
    // public/ stay external files served alongside it.
    cssCodeSplit: false,
  },
})
