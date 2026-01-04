// @ts-check

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	output: "server",
	integrations: [icon(), react()],
	adapter: vercel(),
});
