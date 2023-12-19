import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.sass';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="top-left-triangle"></div>
    <div className="top-right-triangle"></div>
    <div className="bottom-left-circle"></div>
    <div className="bottom-right-circle"></div>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
