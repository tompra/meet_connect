import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import * as atatus from 'atatus-spa';
atatus.config('b4b6a07bd1454eff8879c4dc6d03b9be').install();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
serviceWorkerRegistration.unregister();
reportWebVitals();

atatus.notify(new Error('Test Atatus Setup'));
