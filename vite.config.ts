import path from "node:path";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  resolve: {
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
    tsConfigPaths(),
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    tailwindcss(),
  ],
  build: {
    target: "es2020",
    cssTarget: "chrome90",
    minify: "esbuild",
    cssMinify: "lightningcss",
    reportCompressedSize: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom") || id.includes("scheduler")) return "react-dom";
          if (id.match(/[\\/]react[\\/]/)) return "react";
          if (id.includes("@tanstack")) return "tanstack";
          if (id.includes("framer-motion") || id.includes("/motion/")) return "motion";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("recharts") || id.includes("d3-")) return "charts";
          if (id.includes("three") || id.includes("@react-three")) return "three";
          if (id.includes("embla-carousel")) return "carousel";
          return "vendor";
        },
      },
    },
  },
  esbuild: {
    legalComments: "none",
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
});
