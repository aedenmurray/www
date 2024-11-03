import { CardContent } from '@mui/material';

// TODO: Styled
export default function CardContentFlex(props) {
  return (
    <CardContent
      sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
      {...props}
    />
  );
}
