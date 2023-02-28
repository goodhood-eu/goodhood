import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Routes from './routes';
import './index.scss';
import KnobsProvider from './modules/knobs';
import { loadConfig } from './modules/package';

loadConfig();

const Component = (
  <KnobsProvider>
    <Routes />
  </KnobsProvider>
);


const mainNode = document.getElementById('main');
const isPrerender = Boolean(mainNode);

if (isPrerender) {
  hydrateRoot(mainNode, (
    <BrowserRouter>
      {Component}
    </BrowserRouter>
  ));
} else {
  const node = document.createElement('main');
  document.body.appendChild(node);

  createRoot(node).render((
    // eslint-disable-next-line no-undef
    <HashRouter basename={PUBLIC_PATH}>
      {Component}
    </HashRouter>
  ));
}
