import { CircularProgress, Box, styled } from '@mui/material';

const CenterBox = styled(Box)({
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  left: '50%',
  top: '50%',
});

export default function Spinner({ size = 40 }) {
  return (
    <CenterBox height={size}>
      <CircularProgress size={size} />
    </CenterBox>
  );
}
