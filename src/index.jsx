import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { SWRConfig } from 'swr';
import { Route } from 'wouter';
import Header from 'components/Header';
import Home from 'pages/Home';
import Posts from 'pages/Posts';
import theme from 'theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/roboto-mono/300.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/500.css';
import '@fontsource/roboto-mono/700.css';

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <SWRConfig value={{ fetcher }}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Header />
        <Container sx={{ py: 2 }}>
          <Route path="/posts" nest><Posts /></Route>
          <Route path="/"><Home /></Route>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  </SWRConfig>,
);
