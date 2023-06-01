import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["logo.svg"],
  manifest: {
    name: "Kanban Task Manager",
    short_name: "Kanban",
    description:
      "A task management app that uses the kanban methodology to organize files",
    start_url: "https://kanban-app-yagz.onrender.com",
    display: "standalone",
    theme_color: "#635fc7",
    background_color: "#ffffff",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "logo.svg",
        sizes: "72x72 96x96 128x128 144x144 152x152 192x192 384x384",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "logo-large.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
      // "/tasks": "http://localhost:5000",
    },
  },
});
