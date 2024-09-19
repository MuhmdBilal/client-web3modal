import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { nodeResolve } from '@rollup/plugin-node-resolve'; // Rollup eklentilerini import edin
import commonjs from '@rollup/plugin-commonjs'; // Rollup CommonJS eklentisi

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global modülleri için polyfill ekliyoruz
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,  // `buffer` modülü için polyfill
        }),
        NodeModulesPolyfillPlugin(),  // Diğer Node.js modülleri için polyfill
      ],
    },
  },
  resolve: {
    alias: {
      // Polyfill'leri kullanmak için alias tanımlıyoruz
      buffer: 'buffer',
    },
  },
  build: {
    rollupOptions: {
      // Rollup ile tarayıcı uyumlu polyfill'leri ekliyoruz
      plugins: [
        nodeResolve({
          browser: true,
        }),
        commonjs(),
      ],
    },
  },
});
