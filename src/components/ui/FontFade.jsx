import { Fade } from '@mui/material';
import { useEffect, useState } from 'react';

export default function FontFade({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready
      .then(() => setLoaded(true));
  }, []);

  return (
    <Fade in={loaded}>
      <div>
        {children}
      </div>
    </Fade>
  );
}
