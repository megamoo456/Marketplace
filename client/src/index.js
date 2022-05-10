import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ContextStore } from './ContextStore';
import { CartProvider } from "react-use-cart";
import  CartopenProvider from "./contexts/cart";
import  CheckoutProvider from "./contexts/checkout";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
   // <React.StrictMode>
      <ContextStore>
       <CartProvider>
          <CartopenProvider>
            <CheckoutProvider>
               <BrowserRouter>
                  <App />
               </BrowserRouter>
            </CheckoutProvider>
         </CartopenProvider>
       </CartProvider>
      </ContextStore>,
   // </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
