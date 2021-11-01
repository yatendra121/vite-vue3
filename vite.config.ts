import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import vuetify from "@vuetify/vite-plugin";
import DynamicImportVars from "@rollup/plugin-dynamic-import-vars";
// import eslint from "@rollup/plugin-eslint";
const { resolve } = require("path");
import { currentPortal } from "./src/utils/portal-helper";

const pwaConfig = {
  includeAssets: [
    "favicon.svg",
    "favicon.ico",
    "robots.txt",
    "apple-touch-icon.png",
  ],
  manifest: {
    name: "vite-talwind",
    theme_color: "white",
    short_name: "vite-talwind",
    start_url: currentPortal.getDomianPrefix(),
    display: "standalone",
    background_color: "#ffffff",
    lang: "en",
    scope: currentPortal.getDomianPrefix(),
    icons: [
      {
        src: `${currentPortal.getDomianPrefix()}img/icons/48x48.png`,
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: `${currentPortal.getDomianPrefix()}img/icons/72x72.png`,
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: `${currentPortal.getDomianPrefix()}img/icons/96x96.png`,
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: `${currentPortal.getDomianPrefix()}img/icons/144x144.png`,
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: `${currentPortal.getDomianPrefix()}img/icons/512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  //eslint(),
  plugins: [
    vue(),
    VitePWA(pwaConfig),
    vuetify({
      autoImport: true,
      styles: "expose",
    }),
  ],
  base: currentPortal.getDomianPrefix(),
  server: {
    port: currentPortal.getPort(),
  },
  build: {
    outDir: currentPortal.getOutputDir(),
    manifest: true,
    rollupOptions: {
      plugins: [DynamicImportVars()],
      // input: {
      //   main: resolve(__dirname, "public/index.html"),
      //   nested: resolve(__dirname, "nested/index.html"),
      // },
    },
  },
});
