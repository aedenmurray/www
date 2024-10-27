import { createTheme } from '@mui/material';
import { forwardRef } from 'react';
import { Link } from 'wouter';

// eslint-disable-next-line react/display-name
const WouterLink = forwardRef(
  ({ href, ...other }, ref) => (
    <Link ref={ref} href={href} {...other} />
  ),
);

const base = createTheme({

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
