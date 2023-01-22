import React, { useState } from 'react';
import { Login } from '.';
import { userLogin } from '../../services/users/userLogin';

function LoginContainer(): React.ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const isDisabled = username === '' || password === '';

  const onFormSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    setIsLoading(true);

    const response = await userLogin({
      username,
      password,
    });

    if (response.status === 200 && response.data) {
      setIsLoading(false);
      setUsername('');
      setPassword('');
      // TODO: Handle tokens
      // TODO: Add success toast
      // TODO: Redirect to previous page or home / account page
    } else {
      setIsLoading(false);
      // TODO: Add error message
    }
  };

  const onClickGoogle = () => {};
  const onClickGitHub = () => {};

  return (
    <Login
      username={username}
      password={password}
      onUsernameChange={onUsernameChange}
      onPasswordChange={onPasswordChange}
      onFormSubmit={onFormSubmit}
      onClickGoogle={onClickGoogle}
      onClickGitHub={onClickGitHub}
      isLoading={isLoading}
    />
  );
}

export default LoginContainer;
