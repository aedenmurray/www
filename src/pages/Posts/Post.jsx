import { Typography, Stack, Box, Fade } from '@mui/material';
import { Redirect, useParams } from 'wouter';
import Markdown from '~/components/ui/Markdown';
import Tags from '~/components/ui/Tags';
import usePost from '~/hooks/usePost';
import Spinner from '~/components/ui/Spinner';
import { useEffect } from 'react';

function Title({ title }) {
  return (
    <Typography
      variant="h3"
      component="h1"
      fontWeight="bold"
      sx={{ mb: 2 }}
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

  useEffect(() => {
    if (!post) return () => {};
    const currentTitle = document.title;
    if (!post?.meta?.title) return () => {};
    document.title = `${post.meta.title} - ${currentTitle}`;
    return () => { document.title = currentTitle; };
  }, [post]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Redirect
        to="~/posts"
        replace
      />
    );
  }

  return (
    <Fade in>
      <Stack>
        <Box mb={2}>
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
