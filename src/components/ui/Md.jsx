import { Typography } from '@mui/material';
import Markdown from 'react-markdown';

const h1 = (props) => <Typography variant="h1" fontWeight="bold" {...props} />;
const h2 = (props) => <Typography variant="h2" fontWeight="bold" {...props} />;
const h3 = (props) => <Typography variant="h3" fontWeight="bold" {...props} />;
const h4 = (props) => <Typography variant="h4" fontWeight="bold" {...props} />;
const h5 = (props) => <Typography variant="h5" fontWeight="bold" {...props} />;
const h6 = (props) => <Typography variant="h6" fontWeight="bold" {...props} />;
const p = (props) => <Typography {...props} />;

export default function Md({ children }) {
  return (
    <Markdown
      // eslint-disable-next-line react/no-children-prop
      children={children}
      components={{ h1, h2, h3, h4, h5, h6, p }}
    />
  );
}
