import { useEffect } from 'react';
import { Route } from 'wouter';
import usePosts from 'hooks/usePosts';
import Masonry from 'components/ui/Masonry';
import PostCard from 'components/Cards/PostCard';
import Spinner from 'components/ui/Spinner';
import Post from './Post';

function List() {
  useEffect(() => {
    const currentTitle = document.title;
    document.title = `Posts - ${currentTitle}`;
    return () => { document.title = currentTitle; };
  }, []);

  const { posts, loading, error } = usePosts();
  if (error) return null; // TODO: error state

  if (loading) {
    return <Spinner />;
  }

  return (
    <Masonry>
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          tags={post.tags}
          date={post.date}
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
