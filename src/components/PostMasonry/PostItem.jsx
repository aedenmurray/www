import { Card, CardActionArea, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { Tag } from '@mui/icons-material';

// TODO: Handle no tags.
export default function PostItem({ title, slug, tags }) {
  return (
    <Card>
      <CardActionArea href={`~/posts/${slug}`}>
        <CardContent>
          <Stack spacing={0.5}>
            <CardHeader title={title} />
            <Stack direction="row" spacing={0.5}>
              <Tag fontSize="small" />
              <Typography variant="caption">{tags.join(', ')}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
