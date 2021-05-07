import { hydrate } from 'react-dom';
import App from './app';

const Component = (
  <App />
);

hydrate(Component, document.getElementById('main'));
