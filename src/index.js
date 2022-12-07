import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@fontsource/fira-code';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/700.css';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
