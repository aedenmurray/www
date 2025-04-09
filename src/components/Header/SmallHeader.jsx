import { AppBar, Stack, Typography, Container } from '@mui/material';
import AAvatar from './AAvatar';

// eslint-disable-next-line import/no-unresolved
import me from './me.png?format=avif&w=80';

export default function SmallHeader() {
  return (
    <AppBar position="static">
      <Container>
        <Stack spacing={1.5} direction="row" sx={{ py: 1.5 }} alignItems="center">
          <AAvatar size={40} bsize={8} src={me} />

          <Stack spacing={0}>
            <Typography variant="h6" lineHeight="normal" fontWeight="bold" component="h1">Aeden Murray</Typography>
            <Typography variant="caption" lineHeight="normal" component="h2">aeden@aedenmurray.dev</Typography>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
}
