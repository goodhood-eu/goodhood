import { Route, Switch } from 'react-router';
import Story from './containers/story';

export default () => (
  <Switch>
    <Route path="/" component={Story} exact />
    <Route path="/:id" component={Story} />
  </Switch>
);
