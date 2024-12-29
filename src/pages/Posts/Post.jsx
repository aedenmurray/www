import { Typography, Stack, Box, Fade } from '@mui/material';
import { useParams } from 'wouter';
import Markdown from 'components/ui/Markdown';
import Tags from 'components/ui/Tags';
import usePost from 'hooks/usePost';
import Spinner from 'components/ui/Spinner';

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
  if (error) return null; // TODO: error state

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fade in>
      <Stack>
        <Box mb={3}>
          <DateTime date={post.meta.date} />
          <Title title={post.meta.title} />
          <Tags tags={post.meta.tags} />
        </Box>

        <Markdown>
          {post.md}
        </Markdown>
      </Stack>
    </Fade>
  );
}
