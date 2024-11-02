const x = import.meta.glob('/posts/**/*', { query: '?raw' });

export default function Posts() {
  console.log(x);
  return <p>posts</p>;
}
