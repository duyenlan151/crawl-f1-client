import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';
import QueryProvider from './provider/query-provider.tsx';
import Routes from './routes';
import { ToasterConfig } from '@/components';
import { F1DataProvider } from '@/context/F1DataContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ToasterConfig />
      <F1DataProvider>
        <Routes />
      </F1DataProvider>
    </QueryProvider>
  </React.StrictMode>,
);
