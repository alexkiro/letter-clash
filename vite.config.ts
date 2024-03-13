/* eslint-disable camelcase */
import vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // eslint-disable-next-line new-cap
    VitePWA({
      devOptions: {
        enabled: true,
      },
      manifest: {
        background_color: "#fdd018",
        categories: ["games", "words", "letters", "anagrams"],
        description: "Anagram Game Solver. Try to make as many words as you can with just 7 letters.",
        dir: "ltr",
        display: "fullscreen",
        icons: [
          {
            purpose: "any",
            sizes: "192x192",
            src: "pwa-192x192.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "pwa-512x512.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "192x192",
            src: "pwa-maskable-192x192.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "pwa-maskable-512x512.png",
            type: "image/png",
          },
        ],
        id: "letter-clash.alexkiro.com",
        launch_handler: {
          client_mode: "auto",
        },
        name: "Letter Clash",
        screenshots: [
          {
            sizes: "1170x2532",
            src: "screenshot1.png",
            type: "image/png",
          },
          {
            sizes: "1170x2532",
            src: "screenshot2.png",
            type: "image/png",
          },
        ],
        short_name: "Letter Clash",
        theme_color: "#048978",
      },
      registerType: "autoUpdate",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 8080,
  },
});
