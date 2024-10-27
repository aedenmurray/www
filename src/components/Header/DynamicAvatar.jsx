import { Avatar, styled } from '@mui/material';

export default styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'big',
})(({ big }) => ({
  width: big ? 150 : undefined,
  height: big ? 150 : undefined,
}));
