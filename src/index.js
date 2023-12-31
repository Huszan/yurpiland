import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import GlobalStates from './context/GlobalStates';
import Progression from './context/Progression';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import { SaveManager } from './context/SaveManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStates>
      <Progression>
        <SaveManager>
          <Router />
        </SaveManager>
      </Progression>
    </GlobalStates>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
