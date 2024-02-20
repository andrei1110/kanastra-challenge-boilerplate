import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout, Message } from '@/components';
import { BankSlipProvider, MessageProvider, FileProvider } from '@/context';
import HomePage from '@/pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{
      path: '/',
      element: <HomePage />
    }]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <FileProvider>
      <BankSlipProvider>
        <MessageProvider>
          <RouterProvider router={router} />
          <Message />
        </MessageProvider>
      </BankSlipProvider>
    </FileProvider>
);
