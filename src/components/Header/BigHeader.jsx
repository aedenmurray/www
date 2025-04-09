import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import AAvatar from './AAvatar';

// eslint-disable-next-line import/no-unresolved
import me from './me.png?format=avif&w=300';

export default function BigHeader() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'center', flexDirection: 'column', pt: 3.5, paddingBottom: 2, gap: 1 }}>
        <AAvatar size={150} bsize={16} src={me} />

        <Stack alignItems="center">
          <Typography variant="h6" fontWeight="bold" component="h1">Aeden Murray</Typography>
          <Typography variant="subtitle2" component="h2">aeden@aedenmurray.dev</Typography>

          <Stack direction="row">
            <IconButton
              sx={{ color: 'inherit' }}
              href="https://github.com/aedenmurray"
              aria-label="Aeden's GitHub"
              target="_blank"
            >
              <GitHub />
            </IconButton>

            <IconButton
              sx={{ color: 'inherit' }}
              href="https://linkedin.com/in/aedenmurray"
              aria-label="Aeden's LinkedIn"
              target="_blank"
            >
              <LinkedIn />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
