import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AOS from 'aos';
import { router } from './routes';
import { Provider } from 'react-redux';
import { persiststor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';

AOS.init()

createRoot( document.getElementById( 'root' )! ).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persiststor} />
        <RouterProvider router={router} />
      </Provider>
      <Toaster />
    </div>
  </StrictMode>,
)
