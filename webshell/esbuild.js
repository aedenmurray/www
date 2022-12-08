require('esbuild')
    .build({
        bundle: true,
        format: 'cjs',
        platform: 'node',
        external: ['aws-sdk'],
        entryPoints: ['webshell/index.mjs'],
        outfile: 'webshell/bin.js',
    })
    .catch(() => {
        process.exit(1);
    });
