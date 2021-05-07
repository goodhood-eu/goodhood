import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Routes from './routes';

export default ({ location }) => {
  const routerContext = {};

  const Component = (
    <StaticRouter context={routerContext} location={location}>
      <Routes />
    </StaticRouter>
  );

  return renderToString(Component);
};
