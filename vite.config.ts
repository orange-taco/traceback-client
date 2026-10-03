import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      "/_allauth": "http://localhost:8000",
      "/accounts": "http://localhost:8000",
    },
  },
});
