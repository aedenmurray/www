import { useEffect, useState } from 'react';
import { Typography, Stack } from '@mui/material';
import { useLocation, useParams } from 'wouter';
import Markdown from 'components/ui/Markdown';
import Tags from 'components/ui/Tags';

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

function Subtitle({ subtitle }) {
  if (!subtitle) return null;
  return (
    <Typography
      variant="h5"
    >
      {subtitle}
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
      <Title title={meta.title} />
      <Subtitle subtitle={meta.subtitle} />
      <Stack spacing={0.5} sx={{ mb: 4, mt: 0.5 }}>
        <DateTime date={meta.date} />
        <Tags tags={meta.tags} />
      </Stack>

      <Markdown>
        {markdown}
      </Markdown>
    </Stack>
  );
}
