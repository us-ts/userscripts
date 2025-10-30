import { defineConfig } from "astro/config";

import solid from "@astrojs/solid-js";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [solid()],
  vite: { plugins: [tailwindcss()] },
});
