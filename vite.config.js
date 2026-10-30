import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  // Relative base keeps the build working at workouts.tian.im/james/ and at
  // tian-im.github.io/workouts.tian.im/james/ without changes.
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        plan: fileURLToPath(new URL("./james/index.html", import.meta.url)),
      },
    },
  },
});
