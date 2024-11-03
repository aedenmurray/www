import { Bookmark } from '@mui/icons-material';
import { Card, CardActionArea, Stack } from '@mui/material';
import CardContentFlex from 'components/ui/CardContentFlex';
import CardTitle from 'components/ui/CardTitle';
import Tags from 'components/ui/Tags';

function Header({ title }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <CardTitle>{title}</CardTitle>
      <Bookmark fontSize="small" />
    </Stack>
  );
}

export default function PostItem({ title, slug, tags }) {
  return (
    <Card>
      <CardActionArea href={`~/posts/${slug}`}>
        <CardContentFlex>
          <Header title={title} />
          <Tags tags={tags} />
        </CardContentFlex>
      </CardActionArea>
    </Card>
  );
}
