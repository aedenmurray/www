import { Code } from '@mui/icons-material';
import Card from 'components/ui/Card';

export default function RepoCard({ name, description }) {
  return (
    <Card href={`https://github.com/aedenmurray/${name}`}>
      <Card.Header title={name} icon={<Code />} />
      <Card.Description>{description}</Card.Description>
    </Card>
  );
}
