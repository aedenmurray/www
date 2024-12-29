import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline, Container, Stack } from '@mui/material';
import { SWRConfig } from 'swr';
import { Route } from 'wouter';
import Header from 'components/Header';
import theme from 'theme';
import FontFade from 'components/ui/FontFade';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
  <FontFade>
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Stack sx={{ height: '100%' }}>
            <Header />
            <Container sx={{ py: 2, position: 'relative', flexGrow: 1 }}>
              <Suspense>
                <Route path="/posts" nest><Posts /></Route>
                <Route path="/"><Home /></Route>
              </Suspense>
            </Container>
          </Stack>
        </CssBaseline>
      </ThemeProvider>
    </SWRConfig>
  </FontFade>,
);
