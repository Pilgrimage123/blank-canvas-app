import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), viteSingleFile()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    strictPort: true,
  },
  preview: {
    port: 3000,
    host: "0.0.0.0",
    strictPort: true,
  },
});
