import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import AAvatar from './AAvatar';

// TODO: cleanup
export default function BigHeader() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'center', flexDirection: 'column', pt: 3.5, paddingBottom: 2, gap: 1 }}>
        <AAvatar size={150} bsize={16} />

        <Stack alignItems="center">
          <Typography variant="h6" fontWeight="bold">Aeden Murray</Typography>
          <Typography variant="subtitle2">aeden@aedenmurray.dev</Typography>

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
