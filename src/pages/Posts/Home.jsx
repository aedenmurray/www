import { Tag } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Card, CardActionArea, CardContent, CardHeader, Stack, Typography } from '@mui/material';

function Post({ title, slug, tags }) {
  return (
    <Card>
      <CardActionArea href={`/${slug}`}>
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

export default function Home() {
  const posts = import.meta.glob('/posts/**/meta.json', {
    import: 'default',
    eager: true,
  });

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Posts</Typography>
      <Masonry>
        {Object.keys(posts).map((path) => (
          <Post
            key={path}
            slug={path.split('/')[2]}
            title={posts[path].title}
            tags={posts[path].tags}
          />
        ))}
      </Masonry>
    </Stack>
  );
}
