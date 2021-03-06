import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { LoadingContextProvider } from './utils/loading-context';

ReactDOM.render(
  <LoadingContextProvider>
    <App />
  </LoadingContextProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

window.addEventListener('beforeinstallprompt', (e) => {
  e.prompt();
});
