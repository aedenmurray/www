/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import { imagetools } from 'vite-imagetools';
import sitemap from './sitemap';

const plugins = [preact(), jsconfigPaths(), imagetools(), sitemap];
const server = { open: false, port: 8000, hmr: false };
const esbuild = { legalComments: 'none' };

const build = {
  emptyOutDir: true,
  outDir: '/tmp/www',
  assetsInlineLimit: 0,
};

export default defineConfig({
  publicDir: './.devops/public',
  assetsInclude: ['**/*.md'],
  esbuild,
  plugins,
  server,
  build,
});
