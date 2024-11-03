import { Route } from 'wouter';
import Home from './Home';
import Post from './Post';

export default function Posts() {
  return (
    <div>
      <Route path="/:slug"><Post /></Route>
      <Route path="/"><Home /></Route>
    </div>
  );
}
