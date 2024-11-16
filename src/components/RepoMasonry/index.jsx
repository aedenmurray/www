import { Masonry } from '@mui/lab';
import useRepos from 'hooks/useRepos';
import RepoCard from '../Cards/RepoCard';

export default function RepoMasonry() {
  const { repos, loading, error } = useRepos();
  if (loading) return null; // TODO: loading state
  if (error) return null; // TODO: loading state

  return (
    <Masonry>
      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          name={repo.name}
          description={repo.description}
          stargazers={repo.stargazers_count}
        />
      ))}
    </Masonry>
  );
}
