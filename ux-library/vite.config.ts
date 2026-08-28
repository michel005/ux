import react from "@vitejs/plugin-react"
import { resolve } from "node:path"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": resolve(import.meta.dirname, "src"),
		},
	},
	build: {
		lib: {
			entry: "src/index.ts",
			formats: ["es"],
			fileName: "index",
		},
		rollupOptions: {
			external: [
				"react",
				"react-dom",
				"react/jsx-runtime",
				"react-dom/client",
				"react-hook-form",
			],
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,
				silenceDeprecations: ["import"],
			},
		},
	},
})
