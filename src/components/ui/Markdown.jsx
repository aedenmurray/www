/* eslint-disable react/no-children-prop */
import { Divider, Typography, useTheme, Box, Link } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { visit } from 'unist-util-visit';

// TODO: Cleanup

const h1 = ({ children }) => <Typography variant="h1" fontWeight="bold" children={children} />;
const h2 = ({ children }) => <Typography variant="h2" fontWeight="bold" children={children} />;
const h3 = ({ children }) => <Typography variant="h3" fontWeight="bold" children={children} />;
const h4 = ({ children }) => <Typography variant="h4" fontWeight="bold" children={children} />;
const h5 = ({ children }) => <Typography variant="h5" fontWeight="bold" children={children} />;
const h6 = ({ children }) => <Typography variant="h6" fontWeight="bold" children={children} />;
const img = ({ alt, src }) => <img alt={alt} src={src} style={{ width: '100%', borderRadius: 5 }} />;
const a = ({ children, href }) => <Link href={href}>{children}</Link>;
const p = ({ children }) => <Typography children={children} />;
const hr = () => <Divider sx={{ my: 1 }} />;
const code = ({ children, node }) => {
  const { palette: { action } } = useTheme();
  const backgroundColor = action.selected;

  if (node.inline) {
    return (
      <Typography
        component="code"
        fontFamily="monospace"
        children={children}
        sx={{
          backgroundColor,
          px: 0.5,
        }}
      />
    );
  }

  return (
    <Box sx={{
      backgroundColor,
      px: 0.5,
    }}
    >
      <Typography
        component="code"
        fontFamily="monospace"
      >
        {children}
      </Typography>
    </Box>
  );
};

export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      children={children}
      components={{ h1, h2, h3, h4, h5, h6, p, hr, code, a, img }}
      rehypePlugins={[
        () => (tree) => {
          visit(tree, { tagName: 'code' }, (node, idx, parent) => {
            // eslint-disable-next-line no-param-reassign
            node.inline = (parent.tagName !== 'pre');
          });
        },
      ]}
    />
  );
}
