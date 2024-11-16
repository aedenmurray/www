import { Stack, Typography } from '@mui/material';
import { cloneElement } from 'react';

export default function CardHeader({ title, icon }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography fontWeight="bold" variant="body2">{title}</Typography>
      {icon ? cloneElement(icon, { fontSize: 'small' }) : null}
    </Stack>
  );
}
