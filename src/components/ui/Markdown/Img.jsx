import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const imagesSmall = import.meta.glob('/posts/**/*.png', {
  query: '?url&format=avif&as=meta:src&w=5&inline',
  import: 'default',
  eager: true,
});

const images = import.meta.glob('/posts/**/*.png', {
  query: '?url&format=avif&as=meta:width;height;src',
  import: 'default',
  eager: true,
});

export default function Img({ alt, src }) {
  const [loaded, setLoaded] = useState(false);
  const imgSmall = imagesSmall[src];
  const imgMeta = images[src];

  useEffect(() => {
    if (!imgSmall) return;
    if (!imgMeta) return;

    const img = new Image();
    img.fetchPriority = 'high';
    img.decoding = 'sync';
    img.src = imgMeta.src;
    img.onload = () => {
      setLoaded(true);
    };
  }, [imgMeta]);

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          aspectRatio: `${imgMeta.width} / ${imgMeta.height}`,
        }}
      >
        <img
          alt={alt}
          style={{
            width: '100%',
            display: 'block',
            transition: 'filter 0.5s ease',
            filter: !loaded
              ? 'blur(1rem)'
              : 'blur(0)',
          }}
          src={
            !loaded
              ? imgSmall.src
              : imgMeta.src
          }
        />
      </Box>
    </Box>
  );
}
