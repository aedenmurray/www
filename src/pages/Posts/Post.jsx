import { useEffect, useState } from 'react';
import { Typography, Stack } from '@mui/material';
import { useLocation, useParams } from 'wouter';
import Markdown from 'components/ui/Markdown';
import Tags from 'components/ui/Tags';

function Title({ title }) {
  return (
    <Typography
      variant="h1"
      fontWeight="bold"
      lineHeight="normal"
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
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markdown, setMarkdown] = useState(null);
  const [, setLocation] = useLocation();
  const { slug } = useParams();

  useEffect(() => {
    const posts = import.meta.glob('/posts/**/*', {
      import: 'default',
      query: 'raw',
    });

    const importMeta = posts[`/posts/${slug}/meta.json`];
    const importMarkdown = posts[`/posts/${slug}/index.md`];
    if (!importMeta || !importMarkdown) {
      setLocation('~/posts');
      return;
    }

    (async () => {
      const [mdResponse, metaResponse] = await Promise.all([
        importMarkdown(),
        importMeta(),
      ]);

      setMeta(JSON.parse(metaResponse));
      setMarkdown(mdResponse);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <p>loading</p>;

  return (
    <Stack sx={{ mt: 2 }}>
      <Stack spacing={0.5} sx={{ mb: 4 }}>
        <Title title={meta.title} />
        <DateTime date={meta.date} />
        <Tags tags={meta.tags} />
      </Stack>

      <Markdown>
        {markdown}
      </Markdown>
    </Stack>
  );
}
