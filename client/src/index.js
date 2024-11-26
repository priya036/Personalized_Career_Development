import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-ud1v4jvtt06vmvho.us.auth0.com" 
    clientId="vW5v7e39BJkGkvM9cGk33cAgpm2uVklJ" 
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);

reportWebVitals();
