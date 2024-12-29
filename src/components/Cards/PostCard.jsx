import { Bookmark } from '@mui/icons-material';
import Tags from 'components/ui/Tags';
import Card from 'components/ui/Card';

export default function PostCard({ title, slug, tags, date }) {
  return (
    <Card href={`~/posts/${slug}`}>
      <div>
        <Card.Header title={title} icon={<Bookmark />} />
        <Card.Caption>{new Date(date).toUTCString()}</Card.Caption>
      </div>
      <Tags tags={tags} />
    </Card>
  );
}
