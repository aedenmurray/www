import { Masonry } from '@mui/lab';
import PostCard from '../Cards/PostCard';

export default function PostMasonry() {
  // TODO: sort by date
  const posts = import.meta.glob('/posts/**/meta.json', {
    import: 'default',
    eager: true,
  });

  return (
    <Masonry>
      {Object.keys(posts).map((path) => (
        <PostCard
          key={path}
          slug={path.split('/')[2]}
          title={posts[path].title}
          subtitle={posts[path].subtitle}
          tags={posts[path].tags}
        />
      ))}
    </Masonry>
  );
}
