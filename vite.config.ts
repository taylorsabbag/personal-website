import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['howler']
	},
	build: {
		commonjsOptions: {
			include: [/howler/]
		}
	}
});
