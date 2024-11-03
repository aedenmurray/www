import { Tag } from '@mui/icons-material';
import { Card, CardActionArea, Stack } from '@mui/material';
import CardContentFlex from 'components/ui/CardContentFlex';
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
        <CardContentFlex>
          <CardTitle>{title}</CardTitle>
          <Tags tags={tags} />
        </CardContentFlex>
      </CardActionArea>
    </Card>
  );
}
