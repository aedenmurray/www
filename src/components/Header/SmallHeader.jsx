import { AppBar, Avatar, Stack, Toolbar, Typography } from '@mui/material';

export default function SmallHeader() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 1.5 }}>
        <Avatar />

        <Stack spacing={0}>
          <Typography variant="h6" lineHeight="normal">Aeden Murray</Typography>
          <Typography variant="caption">aeden@aedenmurray.dev</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
