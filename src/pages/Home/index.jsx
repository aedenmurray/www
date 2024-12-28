import Masonry from 'components/ui/Masonry';
import PostCard from 'components/Cards/PostCard';
import RepoCard from 'components/Cards/RepoCard';
import usePosts from 'hooks/usePosts';
import useRepos from 'hooks/useRepos';
import ErrorCard from 'components/Cards/ErrorCard';

export default function Home() {
  const postsHook = usePosts();
  const reposHook = useRepos();

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

      {postsHook.error && (
        <ErrorCard
          title="Fetching Posts Failed"
          message={`
              There was an issue while fetching blog posts. 
              Please check the network console to learn more.
            `}
        />
      )}

      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          name={repo.name}
          description={repo.description}
        />
      ))}

      {reposHook.error && (
        <ErrorCard
          title="Fetching Repositories Failed"
          message={`
            There was an issue while fetching GitHub repositories. 
            Please check the network console to learn more.
          `}
        />
      )}
    </Masonry>
  );
}
