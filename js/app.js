import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Routes from './routes';
import ReactRouterRelay from 'react-router-relay';

ReactDOM.render(
  <Router
    history={new BrowserHistory()}
    createElement={ReactRouterRelay.createElement}
  >
    {Routes}
  </Router>,
  document.getElementById('root')
);
