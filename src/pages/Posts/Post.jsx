import { useEffect, useState } from 'react';
import { Typography, Stack } from '@mui/material';
import { useLocation, useParams } from 'wouter';
import { Tag } from '@mui/icons-material';
import Md from 'components/ui/Md';

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
      <Stack>
        <Typography variant="h2" fontWeight="bold">{meta.title}</Typography>
        <Stack direction="row" spacing={0.5}>
          <Tag fontSize="small" />
          <Typography variant="subtitle2">{meta.tags.join(', ')}</Typography>
        </Stack>
      </Stack>

      <Md>{markdown}</Md>
    </Stack>
  );
}
