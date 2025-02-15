import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

//createroot: Creates a root element for rendering the React app inside the DOM element with the id="root". 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // A wrapper that helps identify potential problems in the app during development 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


//reportWebVitals(); //performance tracking 
