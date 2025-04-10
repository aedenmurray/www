// TODO: Cleanup

import { Box, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';

const images = import.meta.glob('/posts/**/*.png', {
  query: '?url&format=avif&as=meta:width;height;src',
  import: 'default',
  eager: true,
});

export default function Img({ alt, src }) {
  const [loaded, setLoaded] = useState(false);
  const imgMeta = images[src];

  useEffect(() => {
    if (!imgMeta) return;

    const img = new Image();
    img.src = imgMeta.src;
    img.onload = () => {
      setLoaded(true);
    };
  }, [imgMeta]);

  return (
    <Box sx={{ width: '100%', marginTop: '16px', marginBottom: '16px' }}>
      <Box sx={{ width: '100%', aspectRatio: `${imgMeta.width} / ${imgMeta.height}` }}>
        {loaded
          ? <img alt={alt} src={imgMeta.src} style={{ width: '100%', display: 'block' }} />
          : <Skeleton variant="rectangular" width="100%" height="100%" />}
      </Box>
    </Box>
  );
}
