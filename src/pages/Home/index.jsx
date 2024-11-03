import PostMasonry from 'components/PostMasonry';
import RepoMasonry from 'components/RepoMasonry';

export default function Home() {
  return (
    <div>
      <PostMasonry />
      <RepoMasonry />
    </div>
  );
}
