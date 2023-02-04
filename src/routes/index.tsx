import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home';
import Signup from '../pages/Signup/Container';
import EmailSignup from '../pages/Signup/Email/Container';
import SignupUsername from '../pages/Signup/Username/Container';
import Login from '../pages/Login/Container';

const MockComponent = () => <>Home</>;

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* TODO: At "/" router, fetch username of account id and redirect to that page" */}
      {/* if not logged in, then redirect to login page */}
      <Route path="/" exact component={MockComponent} />
      <Route path="/:account" exact component={Home} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/signup/email" exact component={EmailSignup} />
      <Route path="/signup/username" exact component={SignupUsername} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </BrowserRouter>
);
