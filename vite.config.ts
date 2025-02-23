import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      deleteOriginFile: false, // ✅ Ne supprime pas les fichiers originaux (important pour Vercel)
    }),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: false,
    }),
  ],
  build: {
    minify: "esbuild",
    sourcemap: false,
    target: "esnext",
    cssCodeSplit: true,
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
});
