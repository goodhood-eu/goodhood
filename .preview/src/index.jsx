import { hydrate, render } from 'react-dom';
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
  hydrate((
    <BrowserRouter>
      {Component}
    </BrowserRouter>
  ), mainNode);
} else {
  const node = document.createElement('main');
  document.body.appendChild(node);

  render((
    <HashRouter basename={process.env.publicPath}>
      {Component}
    </HashRouter>
  ), node);
}
