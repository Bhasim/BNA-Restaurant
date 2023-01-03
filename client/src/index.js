import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import Context from './Context';
import { AuthProvider } from "../src/context/auth";
import { CartProvider } from './context/cart';
import "../src/style.scss"
import cors from "cors"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
      <App />
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </Context>
);
