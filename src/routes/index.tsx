import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EmailSignup from '../pages/Signup/Email/Container';
import Signup from '../pages/Signup/Container';

const MockComponent = () => <>Home</>;

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={MockComponent} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/signup/email" exact component={EmailSignup} />
    </Switch>
  </BrowserRouter>
);
