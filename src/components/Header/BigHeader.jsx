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
            <IconButton sx={{ color: 'inherit' }}><GitHub /></IconButton>
            <IconButton sx={{ color: 'inherit' }}><LinkedIn /></IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
