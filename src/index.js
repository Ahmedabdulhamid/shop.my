import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './REDUXTOOLKIT/store'
import { PageTransition } from '@steveeeie/react-page-transition';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <Provider store={store}>
      <BrowserRouter>

        <React.StrictMode>
          <GoogleOAuthProvider clientId="205873312720-dcr1he5got2iodcd991nsf8p2r2r5o23.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>

        </React.StrictMode>
      </BrowserRouter>
    </Provider>
 
 


);
