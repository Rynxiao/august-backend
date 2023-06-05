import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	optimizeDeps: {
		include: ['schart.js']
	},
	server: {
		proxy: {
		  "/api": {
        target: `http://localhost:${process.env.PROXY_PROT}`,
        changeOrigin: true,
        secure: false,
		  },
		},
  },
  preview: {
    host: true,
    port: process.env.ADMIN_LOCAL_PORT,
    proxy: {
		  "/api": {
        target: `http://app:${process.env.PROXY_PROT}`,
        changeOrigin: true,
        secure: false,
		  },
		},
  }
});
