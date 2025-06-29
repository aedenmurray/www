import { Error } from '@mui/icons-material';
import Card from '~/components/ui/Card';

export default function ErrorCard({
  title = 'Error',
  message,
}) {
  return (
    <Card sx={{ backgroundColor: 'error.main' }}>
      <Card.Header title={title} icon={<Error />} />
      <Card.Description>{message}</Card.Description>
    </Card>
  );
}
