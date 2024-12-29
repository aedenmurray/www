import { Typography } from '@mui/material';
import { isValidElement } from 'react';

export default function Paragraph({ children }) {
  if (isValidElement(children)) return children;
  return <Typography>{children}</Typography>;
}
