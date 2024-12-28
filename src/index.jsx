import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { SWRConfig } from 'swr';
import { Route } from 'wouter';
import Header from 'components/Header';
import theme from 'theme';

const Posts = lazy(() => import('pages/Posts'));
const Home = lazy(() => import('pages/Home'));

const fetcher = (...args) => (
  fetch(...args)
    .then((res) => {
      if (!res.ok) {
        const error = new Error(`Error fetching: ${args[0]}`);
        error.headers = res.headers;
        error.status = res.status;
        throw error;
      }

      return res.json();
    })
);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <SWRConfig value={{ fetcher }}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Header />
        <Container sx={{ py: 2 }}>
          <Suspense>
            <Route path="/posts" nest><Posts /></Route>
            <Route path="/"><Home /></Route>
          </Suspense>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  </SWRConfig>,
);
