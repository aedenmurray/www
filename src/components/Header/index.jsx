import { useRoute } from 'wouter';
import BigHeader from './BigHeader';
import SmallHeader from './SmallHeader';

export default function Header() {
  const [home] = useRoute('/');

  if (home) return <BigHeader />;
  return <SmallHeader />;
}
