import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home';
import Signup from '../pages/Signup/Container';
import EmailSignup from '../pages/Signup/Email/Container';
import SignupUsername from '../pages/Signup/Username/Container';
import Login from '../pages/Login/Container';
import { EmailVerification } from '../pages/Signup/EmailVerification';
import { EmailConfirmation } from '../pages/Signup/EmailConfirmation';

const MockComponent = () => <>Home</>;

// WARNING: Any routes added here must be added to list of forbidden usernames
export const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* TODO: At "/" router, fetch username of user account id and redirect to that page" */}
      {/* if not logged in, then redirect to login page */}
      <Route path="/" exact component={MockComponent} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/signup/email" exact component={EmailSignup} />
      <Route path="/signup/email/verification" exact component={EmailVerification} />
      <Route path="/signup/email/confirmation" exact component={EmailConfirmation} />
      <Route path="/signup/username" exact component={SignupUsername} />
      <Route path="/login" exact component={Login} />
      {/* The /:account route needs to remain last  */}
      <Route path="/:account" exact component={Home} />
    </Switch>
  </BrowserRouter>
);
