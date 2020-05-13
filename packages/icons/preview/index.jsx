import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { Normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

import icons from './icons';

import Index from './pages';
import Error404 from './pages/404';
import List from './pages/list';

const GlobalStyle = createGlobalStyle`
  html {
    background: #fefefe;
    font: 16px/1.2 sans-serif;
  }
`;

const node = document.createElement('main');
document.body.appendChild(node);
render((
  <BrowserRouter>
    <Normalize />
    <GlobalStyle />
    <Switch>
      <Route path="/" component={Index} exact />

      {Object.keys(icons).map((size) => (
        <Route key={size} path={`/${size}`}>
          <List size={size} />
        </Route>
      ))}

      <Route component={Error404} />
    </Switch>
  </BrowserRouter>
), node);
