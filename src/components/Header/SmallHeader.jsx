import { AppBar, Stack, Typography, Container } from '@mui/material';
import AAvatar from './AAvatar';

export default function SmallHeader() {
  return (
    <AppBar position="static">
      <Container>
        <Stack spacing={1.5} direction="row" sx={{ py: 1.5 }} alignItems="center">
          <AAvatar size={40} bsize={8} />

          <Stack spacing={0}>
            <Typography variant="h6" lineHeight="normal" fontWeight="bold">Aeden Murray</Typography>
            <Typography variant="caption" lineHeight="normal">aeden@aedenmurray.dev</Typography>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
}
