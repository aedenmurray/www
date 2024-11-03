import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { StarOutlineRounded } from '@mui/icons-material';
import CardTitle from 'components/ui/CardTitle';
import CardDescription from 'components/ui/CardDescription';

function Stargazers({ children }) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.25} color="gray">
      <Typography variant="subtitle2">{children}</Typography>
      <StarOutlineRounded sx={{ fontSize: '1rem' }} />
    </Stack>
  );
}

function Header({ name, stargazers }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <CardTitle>{name}</CardTitle>
      <Stargazers>{stargazers}</Stargazers>
    </Stack>
  );
}

export default function RepoItem({ name, description, stargazers }) {
  return (
    <Card>
      <CardActionArea href={`https://github.com/aedenmurray/${name}`} target="_blank">
        <CardContent>
          <Header name={name} stargazers={stargazers} />
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
