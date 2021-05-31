import { Route, Switch } from 'react-router';
import Story from './containers/story';
import Error404 from './containers/error404';

export default () => (
  <Switch>
    <Route path="/" component={Story} exact />
    <Route path="/:id" component={Story} />

    <Route component={Error404} />
  </Switch>
);
