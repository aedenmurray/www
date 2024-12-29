import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

const plugins = [react(), jsconfigPaths()];
const server = { open: false, port: 8000, hmr: false };
const esbuild = { legalComments: 'none' };

const build = {
  emptyOutDir: true,
  outDir: '/tmp/www',
  assetsInlineLimit: 0
};

export default defineConfig({
  assetsInclude: ['**/*.md'],
  esbuild,
  plugins,
  server,
  build,
});
