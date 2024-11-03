import { Tag } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, Stack } from '@mui/material';
import CardDescription from 'components/ui/CardDescription';
import CardTitle from 'components/ui/CardTitle';

function Tags({ tags }) {
  if (!tags || !tags.length) {
    return null;
  }

  return (
    <Stack direction="row" spacing={0.5}>
      <Tag fontSize="small" />
      <CardDescription>
        {tags.join(', ')}
      </CardDescription>
    </Stack>
  );
}

export default function PostItem({ title, slug, tags }) {
  return (
    <Card>
      <CardActionArea href={`~/posts/${slug}`}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <CardTitle>{title}</CardTitle>
          <Tags tags={tags} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
