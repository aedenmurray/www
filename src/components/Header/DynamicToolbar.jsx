import { Toolbar, styled } from '@mui/material';

export default styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== 'big',
})(({ big, theme }) => ({
  justifyContent: big ? 'center' : undefined,
  flexDirection: big ? 'column' : undefined,
  paddingTop: big ? theme.spacing(3.5) : theme.spacing(2),
  paddingBottom: theme.spacing(2),
  gap: theme.spacing(1),
}));
