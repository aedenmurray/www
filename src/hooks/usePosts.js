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
  return posts.map((post, idx) => ({
    slug: slugs[idx],
    ...post,
  }));
}

export default function usePosts() {
  const { data, error, isLoading } = useSWR('posts', fetcher);
  return { posts: data, loading: isLoading, error };
}
