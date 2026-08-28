import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "node:path"

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": resolve(import.meta.dirname, "src"),
		},
		dedupe: ["react", "react-dom", "react-router-dom", "zustand"],
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
