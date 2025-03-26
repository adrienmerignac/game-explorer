import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import asyncCSSLoader from "./plugins/async-css";

export default defineConfig({
  cacheDir: ".vite_cache", // ✅ Déplace ici, hors de `build`

  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
    }),
    viteCompression({ algorithm: "gzip", ext: ".gz", threshold: 10240 }),
    asyncCSSLoader(),
  ],

  build: {
    minify: "esbuild",
    sourcemap: false, // ❌ Désactiver si inutile en production (économie de stockage)
    target: "esnext",
    cssCodeSplit: true, // ✅ Sépare le CSS pour éviter un fichier énorme

    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor"; // ✅ React dans un fichier séparé
            }
            if (id.includes("firebase")) {
              return "firebase"; // ✅ Firebase dans un fichier séparé
            }
            if (id.includes("lodash")) {
              return "lodash"; // ✅ Optimisation pour lodash si utilisé
            }
            return "vendor";
          }
        },
      },
    },

    // ✅ Augmente la limite d'alerte pour les gros fichiers JS
    chunkSizeWarningLimit: 700,
  },

  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },

  server: {
    open: true,
    port: 3000,
    strictPort: true, // ✅ Garantit que le port est réservé
    watch: {
      ignored: ["!**/node_modules/**"], // ✅ Ignore les fichiers inutiles dans le watcher
    },
  },

  preview: {
    port: 4173,
    open: true,
  },
});
