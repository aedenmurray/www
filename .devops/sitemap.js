import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'xmlbuilder2';

export default {
  name: 'vite-plugin-sitemap',
  async generateBundle({ dir: outputDir }) {
    const host = 'https://aedenmurray.dev';

    const url = [
      { loc: host },
      { loc: `${host}/posts` },
      ...fs
        .readdirSync('posts')
        .map((name) => {
          const metaFile = `posts/${name}/meta.json`;
          const meta = JSON.parse(fs.readFileSync(metaFile).toString());
          return { loc: `${host}/posts/${name}`, lastmod: meta.date };
        }),
    ];

    const sitemapObj = {
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        url,
      },
    };

    const sitemapDoc = create({ version: '1.0', encoding: 'UTF-8' }, sitemapObj);
    const sitemapXml = sitemapDoc.end({ prettyPrint: true });
    const outputFile = `${outputDir}/sitemap.xml`;
    fs.writeFileSync(outputFile, sitemapXml);
  },
};
