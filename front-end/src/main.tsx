// React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Third party
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

// Components
import App from './App.tsx';

// Styles
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
);
