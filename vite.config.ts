import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
//const { resolve } = require("path");

const portalHelper = require("./src/utils/portal-helper");
const currentPortal = new portalHelper.portal("admin");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA(),
  ],
  base: currentPortal.getDomianPrefix(),
  server: {
    port: currentPortal.getPort(),
  },
  build: {
    outDir: currentPortal.getOutputDir(),
    manifest: true,
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, "public/index.html"),
    //     nested: resolve(__dirname, "nested/index.html"),
    //   },
    // },
  },
});
