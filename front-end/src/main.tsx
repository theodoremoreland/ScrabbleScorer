// React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Third party
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import App from './App.tsx';

// Styles
import './index.css';

const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
  </React.StrictMode>,
);
