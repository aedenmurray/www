import { Card, CardActionArea, Stack } from '@mui/material';
import { Code } from '@mui/icons-material';
import CardTitle from 'components/ui/CardTitle';
import CardDescription from 'components/ui/CardDescription';
import CardContentFlex from 'components/ui/CardContentFlex';

function Header({ name }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <CardTitle>{name}</CardTitle>
      <Code fontSize="small" />
    </Stack>
  );
}

export default function RepoItem({ name, description }) {
  return (
    <Card>
      <CardActionArea href={`https://github.com/aedenmurray/${name}`} target="_blank">
        <CardContentFlex>
          <Header name={name} />
          <CardDescription>{description}</CardDescription>
        </CardContentFlex>
      </CardActionArea>
    </Card>
  );
}
