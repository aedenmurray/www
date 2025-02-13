import useSWR from 'swr';

async function fetcher() {
  const modules = import.meta.glob(
    '/posts/**/meta.json',
    { import: 'default' },
  );

  const keys = Object.keys(modules);
  const importFns = keys.map((key) => modules[key]);
  const slugs = keys.map((key) => key.split('/')[2]);
  const promises = importFns.map((importFn) => importFn());
  const posts = await Promise.all(promises);

  return posts
    .map((post, idx) => ({
      slug: slugs[idx],
      ...post,
    }))
    .sort(
      (a, b) =>
        new Date(b.date)
        - new Date(a.date),
    );
}

export default function usePosts() {
  const { data, error, isLoading } = useSWR('posts', fetcher);
  return !error
    ? { posts: data ?? [], loading: isLoading, error }
    : { posts: [], loading: isLoading, error };
}
