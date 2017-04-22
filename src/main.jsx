import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App.jsx';
import './styles.css';

injectTapEventPlugin();
const root = document.querySelector('#root');

ReactDOM.render(
  <App/>,
  root,
);
