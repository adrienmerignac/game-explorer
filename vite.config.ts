import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Répertoire de build standard
  },
  server: {
    open: true, // Ouvre automatiquement le navigateur en dev
  },
  preview: {
    port: 4173,
    open: true,
  },
});
