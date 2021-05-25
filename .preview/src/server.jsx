import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Routes from './routes';
import KnobsProvider from './modules/knobs';

export default ({ location }) => {
  const routerContext = {};

  const Component = (
    <StaticRouter context={routerContext} location={location}>
      <KnobsProvider>
        <Routes />
      </KnobsProvider>
    </StaticRouter>
  );

  return renderToString(Component);
};
