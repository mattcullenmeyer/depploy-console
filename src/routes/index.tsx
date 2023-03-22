import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import Signup from '../pages/Signup/Container';
import EmailSignup from '../pages/Signup/Email/Container';
import Login from '../pages/Login/Container';

const MockComponent = () => <>Home</>;

// WARNING: Any routes added here must be added to list of forbidden usernames
export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* TODO: At "/" router, fetch username of user account id and redirect to that page" */}
      {/* if not logged in, then redirect to login page */}
      <Route path="/" Component={MockComponent} />
      <Route path="/signup" Component={Signup} />
      <Route path="/signup/email" Component={EmailSignup} />
      <Route path="/login" Component={Login} />
      {/* The /:account route needs to remain last  */}
      <Route path="/:account" Component={Home} />
    </Routes>
  </BrowserRouter>
);
