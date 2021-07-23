import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './index.scss';
import KnobsProvider from './modules/knobs';
import { loadConfig } from './modules/package';

loadConfig();

const Component = (
  <BrowserRouter basename={process.env.publicPath}>
    <KnobsProvider>
      <Routes />
    </KnobsProvider>
  </BrowserRouter>
);


const mainNode = document.getElementById('main');

if (mainNode) {
  hydrate(Component, mainNode);
} else {
  const node = document.createElement('main');
  document.body.appendChild(node);
  render(Component, node);
}
