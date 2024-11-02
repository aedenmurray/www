import { StarOutlineRounded } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Typography, Card, Stack, CardActionArea, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';

function Repo({ name, description, stargazers }) {
  return (
    <Card variant="outlined">
      <CardActionArea
        href={`https://github.com/aedenmurray/${name}`}
        target="_blank"
      >
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" fontWeight="bold">{name}</Typography>
            <Stack direction="row" alignItems="center" spacing={0.25} color="gray">
              <Typography variant="subtitle2">{stargazers}</Typography>
              <StarOutlineRounded sx={{ fontSize: '1rem' }} />
            </Stack>
          </Stack>

          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function Repos() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await (await fetch('https://api.github.com/users/aedenmurray/repos')).json();
      const sortedByStargazers = response.sort((a, b) => b.stargazers_count - a.stargazers_count);
      setRepos(sortedByStargazers);
    })();
  }, []);

  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {repos.map((repo) => (
        <Repo
          key={repo.id}
          name={repo.name}
          description={repo.description}
          stargazers={repo.stargazers_count}
        />
      ))}
    </Masonry>
  );
}
