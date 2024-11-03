import { useState, useEffect } from 'react';
import { Masonry } from '@mui/lab';
import RepoItem from './RepoItem';

export default function RepoMasonry() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await (await fetch('https://api.github.com/users/aedenmurray/repos')).json();
      const sortedByStargazers = response.sort((a, b) => b.stargazers_count - a.stargazers_count);
      setRepos(sortedByStargazers);
    })();
  }, []);

  return (
    <Masonry>
      {repos.map((repo) => (
        <RepoItem
          key={repo.id}
          name={repo.name}
          description={repo.description}
          stargazers={repo.stargazers_count}
        />
      ))}
    </Masonry>
  );
}