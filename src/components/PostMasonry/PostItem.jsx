import { Bookmark } from '@mui/icons-material';
import { Card, CardActionArea, Stack } from '@mui/material';
import CardContentFlex from 'components/ui/CardContentFlex';
import CardDescription from 'components/ui/CardDescription';
import CardTitle from 'components/ui/CardTitle';
import Tags from 'components/ui/Tags';

function Header({ title, subtitle }) {
  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <CardTitle>{title}</CardTitle>
        <Bookmark fontSize="small" />
      </Stack>

      {subtitle && (
        <CardDescription>
          {subtitle}
        </CardDescription>
      )}

    </Stack>
  );
}

export default function PostItem({ title, subtitle, slug, tags }) {
  return (
    <Card>
      <CardActionArea href={`~/posts/${slug}`}>
        <CardContentFlex>
          <Header title={title} subtitle={subtitle} />
          <Tags tags={tags} />
        </CardContentFlex>
      </CardActionArea>
    </Card>
  );
}
