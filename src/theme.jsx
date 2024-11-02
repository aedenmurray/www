import { createTheme } from '@mui/material';
import { forwardRef } from 'react';
import { Link } from 'wouter';

// eslint-disable-next-line react/display-name
const WouterLink = forwardRef(
  ({ href, ...other }, ref) => (
    href.includes('://')
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      ? <a ref={ref} href={href} {...other} />
      : <Link ref={ref} href={href} {...other} />
  ),
);

const base = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default createTheme(base, {
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: WouterLink,
      },
    },

    MuiLink: {
      defaultProps: {
        component: WouterLink,
      },
    },
  },
});
