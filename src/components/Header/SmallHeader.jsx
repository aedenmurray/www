import { AppBar, Stack, Typography, Container } from '@mui/material';
import AAvatar from './AAvatar';

/* eslint-disable import/no-unresolved */
import meNonRetina from './me.png?format=avif&w=40';
import meRetina from './me.png?format=avif&w=80';
/* eslint-enable import/no-unresolved */

export default function SmallHeader() {
  const me = window.devicePixelRatio === 1
    ? meNonRetina
    : meRetina;

  return (
    <AppBar position="static">
      <Container>
        <Stack spacing={1.5} direction="row" sx={{ py: 1.5 }} alignItems="center">
          <AAvatar size={40} bsize={8} src={me} />

          <Stack spacing={0}>
            <Typography variant="h6" lineHeight="normal" fontWeight="bold">Aeden Murray</Typography>
            <Typography variant="caption" lineHeight="normal">aeden@aedenmurray.dev</Typography>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
}
