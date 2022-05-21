import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { HashRouter } from "react-router-dom";
import './scss/main.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log(process.env.PUBLIC_URL)

root.render(
  <React.StrictMode>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <App />
    </HashRouter>
  </React.StrictMode>
);