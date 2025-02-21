import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild", // ✅ Minifie le code
    sourcemap: false, // ✅ Désactive les sourcemaps pour gagner de l'espace
    rollupOptions: {
      treeshake: true, // ✅ Active le tree shaking correctement ici
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // ✅ Sépare les dépendances externes
          }
        },
      },
    },
  },
  server: {
    open: true, // Ouvre automatiquement le navigateur en dev,
    port: 3000, // Port par défaut
  },
  preview: {
    port: 4173,
    open: true,
  },
  css: {
    postcss: "./postcss.config.cjs", // ✅ Assure-toi qu'il pointe vers le bon fichier
  },
});
