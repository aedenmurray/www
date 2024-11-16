import { Stack, Typography } from '@mui/material';

export default function CardHeader({ title, icon }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography fontWeight="bold" variant="body1">{title}</Typography>
      {icon}
    </Stack>
  );
}
