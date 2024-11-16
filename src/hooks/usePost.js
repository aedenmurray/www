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

  // TODO: 404
  const [meta, md] = await Promise.all([
    metaModules[`/${key}/meta.json`](),
    mdModules[`/${key}/index.md`](),
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
