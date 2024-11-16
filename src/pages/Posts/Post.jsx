import { Typography, Stack } from '@mui/material';
import { useParams } from 'wouter';
import Markdown from 'components/ui/Markdown';
import Tags from 'components/ui/Tags';
import usePost from 'hooks/usePost';

function Title({ title }) {
  return (
    <Typography
      variant="h3"
      fontWeight="bold"
    >
      {title}
    </Typography>
  );
}

function DateTime({ date }) {
  return (
    <Typography variant="subtitle2">
      {new Date(date).toUTCString()}
    </Typography>
  );
}

export default function Post() {
  const { slug } = useParams();
  const { post, loading, error } = usePost(slug);

  if (loading) return null; // TODO: loading state
  if (error) return null; // TODO: error state

  return (
    <Stack>
      <Title title={post.meta.title} />
      <Stack spacing={0.5} sx={{ mb: 4, mt: 0.5 }}>
        <DateTime date={post.meta.date} />
        <Tags tags={post.meta.tags} />
      </Stack>

      <Markdown>
        {post.markdown}
      </Markdown>
    </Stack>
  );
}
