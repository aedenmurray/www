import { Route } from 'wouter';
import PostMasonry from 'components/PostMasonry';
import Post from './Post';

export default function Posts() {
  return (
    <div>
      <Route path="/:slug"><Post /></Route>
      <Route path="/"><PostMasonry /></Route>
    </div>
  );
}
