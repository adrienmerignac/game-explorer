import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: "brotliCompress" }), // ✅ Active la compression Brotli pour réduire la taille des fichiers
  ],
  build: {
    minify: "esbuild", // ✅ Minification rapide avec esbuild
    sourcemap: false, // ✅ Désactive les sourcemaps en prod pour économiser de l'espace
    target: "esnext", // ✅ Génère un JS plus moderne pour réduire la taille
    cssCodeSplit: true, // ✅ Sépare le CSS inutilisé pour éviter le chargement global
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    open: true, // ✅ Ouvre automatiquement le navigateur en mode dev
    port: 3000,
  },
  preview: {
    port: 4173,
    open: true,
  },
  css: {
    postcss: "./postcss.config.cjs", // ✅ Vérifie que ce fichier est bien configuré
  },
});
