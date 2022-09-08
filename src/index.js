import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      {localStorage.getItem('accesstoken') && <Navbar/>}
      <Routes>
      <Route path='/*' element={ <App/> } />
    </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


