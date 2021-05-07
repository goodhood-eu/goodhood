import { renderToString } from 'react-dom/server';
import App from './app';

export default () => {
  const Component = (
    <App />
  );

  return renderToString(Component);
};
