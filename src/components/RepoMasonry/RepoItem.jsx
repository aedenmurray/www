import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { StarOutlineRounded } from '@mui/icons-material';

export default function RepoItem({ name, description, stargazers }) {
  return (
    <Card>
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
