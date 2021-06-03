import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './index.scss';
import KnobsProvider from './modules/knobs';
import { loadConfig } from './modules/package';

loadConfig();

const Component = (
  <BrowserRouter>
    <KnobsProvider>
      <Routes />
    </KnobsProvider>
  </BrowserRouter>
);

hydrate(Component, document.getElementById('main'));
