/* eslint-disable react/no-children-prop */
import { Divider, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const h1 = ({ children }) => <Typography variant="h1" fontWeight="bold" children={children} />;
const h2 = ({ children }) => <Typography variant="h2" fontWeight="bold" children={children} />;
const h3 = ({ children }) => <Typography variant="h3" fontWeight="bold" children={children} />;
const h4 = ({ children }) => <Typography variant="h4" fontWeight="bold" children={children} />;
const h5 = ({ children }) => <Typography variant="h5" fontWeight="bold" children={children} />;
const h6 = ({ children }) => <Typography variant="h6" fontWeight="bold" children={children} />;
const p = ({ children }) => <Typography children={children} />;
const hr = () => <Divider sx={{ my: 1 }} />;
const code = ({ children }) => (
  <Typography
    component="code"
    fontFamily="monospace"
    sx={{ backgroundColor: 'red', borderRadius: '2px' }}
    children={children}
  />
);

export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      // eslint-disable-next-line react/no-children-prop
      children={children}
      components={{ h1, h2, h3, h4, h5, h6, p, hr, code }}
    />
  );
}
