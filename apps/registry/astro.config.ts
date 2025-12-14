import { defineConfig } from "astro/config";

import solid from "@astrojs/solid-js";
import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [solid()],
  vite: { plugins: [tailwindcss()] },
  site: "https://u.rman.dev",
});
