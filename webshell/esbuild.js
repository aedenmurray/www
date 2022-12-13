require('esbuild')
    .build({
        bundle: true,
        format: 'cjs',
        platform: 'node',
        external: ['aws-sdk'],
        entryPoints: ['webshell/index.mjs'],
        outfile: '/tmp/webshell/bin.js',
    })
    .catch(() => {
        process.exit(1);
    });
