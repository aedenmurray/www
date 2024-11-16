import { useState, useEffect } from 'react';
import { Masonry } from '@mui/lab';
import RepoCard from '../Cards/RepoCard';

export default function RepoMasonry() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await (await fetch('https://api.github.com/users/aedenmurray/repos')).json();
      setRepos(response);
    })();
  }, []);

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
