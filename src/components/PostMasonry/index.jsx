import { Masonry } from '@mui/lab';
import PostItem from './PostItem';

export default function PostMasonry() {
  // TODO: sort by date
  const posts = import.meta.glob('/posts/**/meta.json', {
    import: 'default',
    eager: true,
  });

  return (
    <Masonry>
      {Object.keys(posts).map((path) => (
        <PostItem
          key={path}
          slug={path.split('/')[2]}
          title={posts[path].title}
          tags={posts[path].tags}
        />
      ))}
    </Masonry>
  );
}
