import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

const plugins = [react(), jsconfigPaths()];
const server = { open: false, port: 8000, hmr: false };
const esbuild = { legalComments: 'none' };

const build = {
  emptyOutDir: true,
  outDir: '/tmp/www',
  assetsInlineLimit: (filePath) => {
    const extension = filePath.split('.').pop();
    return !['avif', 'woff', 'woff2'].includes(extension);
    // Don't inline fonts, can cause unused fonts to be inlined.
  }
};

export default defineConfig({
  esbuild,
  plugins,
  server,
  build,
});
