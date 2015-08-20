import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Routes from './routes';

ReactDOM.render(
  <Router history={new BrowserHistory()}>
    {Routes}
  </Router>,
  document.getElementById('root')
);
