import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { OverlayProvider } from './components/overlay/OverlayProvider';

import './index.css';

const queryClient = new QueryClient();

window.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <App />
      </OverlayProvider>
    </QueryClientProvider>,
  );
});
