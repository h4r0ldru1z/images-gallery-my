import React from 'react';
import ReactDOM from 'react-dom/client'; /*DOM is what I see in browser*/
import './css/index.css';
import App from './App'; /*extension can be ommited if it is JS*/

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*getelementbyID searches for an Id called root, which is at the document, which is a global variable. this is defined in HTML file*/