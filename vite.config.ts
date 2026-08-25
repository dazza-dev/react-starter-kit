import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router"],
          "mui-core": ["@mui/material"],
          "mui-icons": ["@mui/icons-material"],
          "mui-datagrid": ["@mui/x-data-grid"],
          editor: ["@tiptap/react", "@tiptap/starter-kit", "@tiptap/extension-text-align"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          i18n: ["i18next", "react-i18next"],
          utils: ["axios"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
