import Masonry from 'components/ui/Masonry';
import PostCard from 'components/Cards/PostCard';
import RepoCard from 'components/Cards/RepoCard';
import usePosts from 'hooks/usePosts';
import useRepos from 'hooks/useRepos';

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
