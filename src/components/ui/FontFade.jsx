import { Fade } from '@mui/material';
import { useEffect, useState } from 'react';

export default function FontFade({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      document.fonts.ready,
      new Promise((resolve) => { setTimeout(resolve, 750); }),
    ]).then(() => setLoaded(true));
  }, []);

  return (
    <Fade in={loaded}>
      <div>
        {children}
      </div>
    </Fade>
  );
}
