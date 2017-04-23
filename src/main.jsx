import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import App from './App.jsx';
import reducers from './reducers';
import './styles.css';

injectTapEventPlugin();
const root = document.querySelector('#root');

const middleware = applyMiddleware(promiseMiddleware(), loggerMiddleware);
const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  root,
);
