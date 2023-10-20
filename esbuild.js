/* eslint-disable import/no-extraneous-dependencies */
import http from 'http';
import esbuild from 'esbuild';
import fs from 'fs-extra';

const options = {
  entryPoints: ['src/index.jsx'],
  outdir: '/tmp/aedenmurray/www',
  metafile: true,
  bundle: true,
  minify: true,
};

const serve = async () => {
  const context = await esbuild.context(options);
  await context.watch();

  const { host: hostname, port } = await context.serve({
    servedir: '/tmp/aedenmurray/www',
  });

  const proxy = http.createServer((request, response) => {
    const forward = (path) => {
      const requestOptions = {
        method: request.method,
        headers: request.headers,
        hostname,
        path,
        port,
      };

      const proxyRequest = http.request(
        requestOptions,
        (proxyResponse) => {
          const { statusCode, headers } = proxyResponse;

          if (statusCode === 404) {
            forward('/');
            return;
          }

          response.writeHead(statusCode, headers);
          proxyResponse.pipe(response, { end: true });
        },
      );

      request.pipe(proxyRequest, { end: true });
    };

    forward(request.url);
  });

  proxy.listen(3000);
};

const build = async () => {
  const result = await esbuild.build({
    minify: true,
    sourcemap: true,
    ...options,
  });

  (function writeMetaFile() {
    const contents = JSON.stringify(result.metafile);
    fs.writeFileSync('metafile.json', contents);
  }());
};

await fs.copy('public', '/tmp/aedenmurray/www');
await (process.argv.includes('--serve')
  ? serve()
  : build()
);
