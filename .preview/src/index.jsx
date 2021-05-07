import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const Component = (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

hydrate(Component, document.getElementById('main'));
