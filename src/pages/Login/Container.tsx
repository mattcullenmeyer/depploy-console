import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '.';
import { userLogin } from '../../services/users/userLogin';
import { setAuthCookies } from '../../utils/authCookies';

function LoginContainer(): React.ReactElement {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isIncorrectLogin, setIsIncorrectLogin] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const isDisabled = email === '' || password === '';

  const onFormSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsIncorrectLogin(false);
    setIsLoginError(false);

    if (isDisabled) {
      return;
    }

    setIsLoading(true);

    const response = await userLogin({
      email,
      password,
    });

    if (response.status === 400) {
      setIsLoading(false);
      setIsIncorrectLogin(true);
      return;
    }

    if (response.status === 403) {
      setIsLoading(false);
      setEmail('');
      setPassword('');
      // TODO: Handle cases where user must verify their email
      return;
    }

    if (response.status === 200 && response.data) {
      setIsLoading(false);
      setEmail('');
      setPassword('');
      setAuthCookies(response.data);
      navigate('/'); // TODO: Change this
    } else {
      setIsLoading(false);
      setIsLoginError(true);
    }
  };

  return (
    <Login
      email={email}
      password={password}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onFormSubmit={onFormSubmit}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isIncorrectLogin={isIncorrectLogin}
      isLoginError={isLoginError}
    />
  );
}

export default LoginContainer;
