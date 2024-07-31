import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// vite.config.js
	server: {
		host: true, // Allows access from any network
		port: 5173, // Change if you're using a different port
	},
});
