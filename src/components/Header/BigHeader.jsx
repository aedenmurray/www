import { AppBar, Avatar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

// TODO: cleanup
export default function BigHeader() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'center', flexDirection: 'column', pt: 3.5, paddingBottom: 2, gap: 1 }}>
        <Avatar sx={{ width: 150, height: 150 }} />

        <Stack alignItems="center">
          <Typography variant="h6">Aeden Murray</Typography>
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
