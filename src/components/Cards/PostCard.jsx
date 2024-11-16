import { Bookmark } from '@mui/icons-material';
import Tags from 'components/ui/Tags';
import Card from 'components/ui/Card';

export default function PostCard({ title, slug, tags }) {
  return (
    <Card href={`~/posts/${slug}`}>
      <Card.Header title={title} icon={<Bookmark />} />
      <Tags tags={tags} />
    </Card>
  );
}
