import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from '../pages/Signup/Container';
import EmailSignup from '../pages/Signup/Email/Container';
import Login from '../pages/Login/Container';

const MockComponent = () => <>Home</>;

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={MockComponent} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/signup/email" exact component={EmailSignup} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </BrowserRouter>
);
