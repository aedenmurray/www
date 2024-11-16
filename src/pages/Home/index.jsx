import { Masonry } from '@mui/lab';
import PostCard from 'components/Cards/PostCard';
import RepoCard from 'components/Cards/RepoCard';
import usePosts from 'hooks/usePosts';
import useRepos from 'hooks/useRepos';

// TODO: fix flicker: https://github.com/mui/material-ui/issues/36673
// Perhaps: https://www.npmjs.com/package/react-responsive-masonry

export default function Home() {
  const postsHook = usePosts();
  const reposHook = useRepos();
  const loading = postsHook.loading || reposHook.loading;
  const error = postsHook.error || reposHook.error;
  if (loading) return null; // TODO: loading state
  if (error) return null; // TODO: error state

  const { posts } = postsHook;
  const { repos } = reposHook;

  return (
    <Masonry>
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          title={post.title}
          slug={post.slug}
          tags={post.tags}
        />
      ))}

      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          name={repo.name}
          description={repo.description}
        />
      ))}
    </Masonry>
  );
}
