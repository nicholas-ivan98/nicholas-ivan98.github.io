import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: false
      },
      // includeAssets: ['index.html', 'build/**/*.js', 'build/**/*.css'],
      outDir: "docs",
      manifest: {
        name: "Manga Reader",
        short_name: "Manga Reader",
        icons: [
          {
            src: "./img/icons/icon_square.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "./img/icons/icon_square.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "./img/icons/icon_square.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "./img/icons/icon_square.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        start_url: "/",
        scope: "/",
        background_color: "#000000",
        theme_color: "#3880ff",
        display: "standalone"
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // test: {
  //   globals: true,
  //   environment: 'jsdom'
  // },
  build: {
    outDir: 'docs',
  }
})