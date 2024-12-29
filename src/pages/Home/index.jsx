import ErrorCard from 'components/Cards/ErrorCard';
import PostCard from 'components/Cards/PostCard';
import RepoCard from 'components/Cards/RepoCard';
import Masonry from 'components/ui/Masonry';
import usePosts from 'hooks/usePosts';
import useRepos from 'hooks/useRepos';
import { Fade } from '@mui/material';

export default function Home() {
  const postsHook = usePosts();
  const reposHook = useRepos();
  const { posts } = postsHook;
  const { repos } = reposHook;

  const reposError = reposHook?.error;
  const reposRateLimited = reposError?.headers?.get('x-ratelimit-remaining') === '0';
  const reposRateLimitReset = Number(reposError?.headers?.get('x-ratelimit-reset'));
  const reposRateLimit = Number(reposError?.headers?.get('x-ratelimit-limit'));
  const loading = postsHook.loading || reposHook.loading;

  return (
    <Fade in={!loading}>
      <div>
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

          {reposHook.error && reposRateLimited && (
            <ErrorCard
              title="Fetching Repositories Failed"
              message={`
                This page uses the public GitHub API to fetch the repositories.
                The API has a rate limit of ${reposRateLimit} requests per hour (per IP).
                The rate limit will reset at ${new Date(reposRateLimitReset * 1000)}
              `}
            />
          )}

          {reposHook.error && !reposRateLimited && (
            <ErrorCard
              title="Fetching Repositories Failed"
              message={`
                There was an issue while fetching GitHub repositories. 
                Please check the network console to learn more.
              `}
            />
          )}
        </Masonry>
      </div>
    </Fade>
  );
}
