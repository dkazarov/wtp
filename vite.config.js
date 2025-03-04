import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import viteCompression from 'vite-plugin-compression';
import autoprefixer from 'autoprefixer';
import { optimizeImages } from './imageOptimizer';
import { wrapImgWithPicture } from './wrapImgWithPicture';
import { DEFAULT_OPTIONS } from './imageOptimizerConfig';

export default defineConfig({
	plugins: [
		// Плагин для оптимизации изображений
		ViteImageOptimizer(DEFAULT_OPTIONS),

		// Плагин для сжатия файлов
		viteCompression({
			algorithm: 'brotliCompress',
		}),
		{
			name: 'optimize-images-and-wrap',
			closeBundle: async () => {
				await optimizeImages();
				await wrapImgWithPicture();
			},
		},
	],

	css: {
		postcss: {
			plugins: [autoprefixer({})],
		},
	},

	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
		},
	},

	base: './',
});
