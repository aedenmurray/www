import useSWR from 'swr';

async function fetcher(key) {
  const metaModules = import.meta.glob(
    '/posts/**/meta.json',
    { import: 'default' },
  );

  const mdModules = import.meta.glob(
    '/posts/**/index.md',
    {
      import: 'default',
      query: 'raw',
    },
  );

  const metaImportFn = metaModules[`/${key}/meta.json`];
  const mdImportFn = mdModules[`/${key}/index.md`];

  if (!metaImportFn || !mdImportFn) {
    const error = new Error('Post not found!');
    error.status = 404;
    throw error;
  }

  const [meta, md] = await Promise.all([
    metaImportFn(),
    mdImportFn(),
  ]);

  return {
    meta,
    md,
  };
}

export default function usePost(slug) {
  const { data, error, isLoading } = useSWR(`posts/${slug}`, fetcher);
  return { post: data, loading: isLoading, error };
}
