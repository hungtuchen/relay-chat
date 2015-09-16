import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Routes from './routes';
import ReactRouterRelay from 'react-router-relay';

ReactDOM.render(
  <Router
    history={createBrowserHistory()}
    createElement={ReactRouterRelay.createElement}
  >
    {Routes}
  </Router>,
  document.getElementById('root')
);
