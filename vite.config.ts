import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const proxy = {
  "/api/sonik/stations": {
    target: "https://sonik.space",
    changeOrigin: true,
    rewrite: () => "/stations_all/",
    headers: { "X-Requested-With": "XMLHttpRequest" },
    timeout: 10000,
    proxyTimeout: 10000,
  },
};
export default defineConfig({
  plugins: [react()],
  server: { proxy },
  preview: { proxy },
});
