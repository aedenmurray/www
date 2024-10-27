import { AppBar, IconButton, Stack, Typography } from '@mui/material';
import { useRoute } from 'wouter';
import { GitHub, LinkedIn } from '@mui/icons-material';
import DynamicAvatar from './DynamicAvatar';
import DynamicToolbar from './DynamicToolbar';

export default function Header() {
  const [home] = useRoute('/');

  return (
    <AppBar position="static">
      <DynamicToolbar big={home}>
        <DynamicAvatar big={home} />
        <Stack alignItems="center">
          <Typography variant="h6">Aeden Murray</Typography>
          <Typography variant="subtitle2">aeden@aedenmurray.dev</Typography>
          <Stack direction="row">
            <IconButton sx={{ color: 'inherit' }}><GitHub /></IconButton>
            <IconButton sx={{ color: 'inherit' }}><LinkedIn /></IconButton>
          </Stack>
        </Stack>
      </DynamicToolbar>
    </AppBar>
  );
}
