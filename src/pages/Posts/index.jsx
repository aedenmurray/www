import { Route } from 'wouter';
import usePosts from 'hooks/usePosts';
import PostCard from 'components/Cards/PostCard';
import { Masonry } from '@mui/lab';
import Post from './Post';

function List() {
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

export default function Posts() {
  return (
    <div>
      <Route path="/:slug"><Post /></Route>
      <Route path="/"><List /></Route>
    </div>
  );
}
