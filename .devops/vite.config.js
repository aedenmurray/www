/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

const plugins = [react(), jsconfigPaths()];
const server = { open: false, port: 8000, hmr: false };
const build = { outDir: '/tmp/www', emptyOutDir: true };

export default defineConfig({
  plugins,
  server,
  build,
});
