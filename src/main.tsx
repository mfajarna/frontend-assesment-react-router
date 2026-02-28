import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FilterPage from './pages/FilterPage.tsx'
import RootLayout, { rootLoader } from './layouts/RootLayout.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    loader: rootLoader, 
    children: [
      {
        index: true,
        element: <FilterPage />,
      },
    ],
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
