import { Tag } from '@mui/icons-material';
import { Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'wouter';

export default function Post() {
  const { slug } = useParams();
  const [meta, setMeta] = useState(null);
  const [markdown, setMarkdown] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const posts = import.meta.glob('/posts/**/*', {
      import: 'default',
      query: 'raw',
    });

    const importMeta = posts[`/posts/${slug}/meta.json`];
    const importMarkdown = posts[`/posts/${slug}/index.md`];
    if (!importMeta || !importMarkdown) {
      return; // TODO: 404;
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
    <Stack>
      <Stack>
        <Typography variant="h5">{meta.title}</Typography>
        <Stack direction="row" spacing={0.5}>
          <Tag fontSize="small" />
          <Typography variant="caption">{meta.tags.join(', ')}</Typography>
        </Stack>
      </Stack>

      <Markdown>{markdown}</Markdown>
    </Stack>
  );
}
