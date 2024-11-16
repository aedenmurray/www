import { Masonry } from '@mui/lab';
import usePosts from 'hooks/usePosts';
import PostCard from '../Cards/PostCard';

export default function PostMasonry() {
  const { posts, loading, error } = usePosts();
  if (loading) return null; // TODO: loading state
  if (error) return null; // TODO: error state

  return (
    <Masonry>
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          tags={post.tags}
          title={post.title}
        />
      ))}
    </Masonry>
  );
}
