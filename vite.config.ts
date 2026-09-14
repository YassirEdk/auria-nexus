import path from "node:path";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/react-start",
    ],
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro(),
    viteReact(),
    tailwindcss(),
  ],
  build: {
    target: "es2020",
    cssTarget: "chrome90",
    cssMinify: "lightningcss",
    reportCompressedSize: false,
    // The only chunk over the default 500 kB is react-globe.gl (three.js),
    // which is already lazy-loaded (see TradeGlobe.tsx) so it never touches
    // the initial page load and can't be split smaller. Set the ceiling just
    // above it (~1.85 MB) so the warning still fires if our own code bloats.
    chunkSizeWarningLimit: 2000,
  },
});
