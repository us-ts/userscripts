import { defineConfig, envField } from "astro/config";

import solid from "@astrojs/solid-js";
import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [solid()],
  vite: { plugins: [tailwindcss()] },

  env: {
    schema: {
      REGISTRY_URL: envField.string({
        context: "client",
        access: "public",
        url: true,
      }),
    },
    validateSecrets: true,
  },
});
