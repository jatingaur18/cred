import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import App from './App.jsx'; // App is your layout component
import Uploads from './components/xml/Uploads.jsx';
import Profile from './components/xml/Profile.jsx';
import Home from './components/Home.jsx';
// import Login from './components/Login/Login.jsx';
// import Register from './components/Register/Register.jsx';
// import P404 from './components/404.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>  {/* App as the layout */}
      <Route index element={<Home />} />
      <Route path='profile/:id' element={<Profile />} />
      <Route path='fileupload' element={<Uploads />} />
      {/* <Route path='Register' element={<Register />} />
      <Route path='*' element={<P404 />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
