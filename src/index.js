import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './fonts/SourceSansPro/SourceSansPro-Bold.ttf';
import './fonts/SourceSansPro/SourceSansPro-Regular.ttf';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
