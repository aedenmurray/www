import { Redirect, Route, Switch } from 'wouter';
import { SWRConfig } from 'swr';
import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline, Container, Stack } from '@mui/material';
import Header from '~/components/Header';
import theme from '~/theme';

import '@fontsource/roboto/latin-300.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';

const Posts = lazy(() => import('~/pages/Posts'));
const Home = lazy(() => import('~/pages/Home'));

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
        <Stack sx={{ height: '100%' }}>
          <Header />
          <Container sx={{ py: 2, position: 'relative', flexGrow: 1 }}>
            <Suspense>
              <Switch>
                <Route path="/posts" nest><Posts /></Route>
                <Route path="/"><Home /></Route>
                <Route><Redirect replace to="/" /></Route>
              </Switch>
            </Suspense>
          </Container>
        </Stack>
      </CssBaseline>
    </ThemeProvider>
  </SWRConfig>,
);
