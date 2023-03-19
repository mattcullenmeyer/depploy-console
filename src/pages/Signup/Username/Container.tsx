import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupUsername } from '.';
import { useAuthAxios } from '../../../services/useAuthAxios';
import { RequestTypes } from '../../../services/useAxios';
import { checkUsernameAvailability } from '../helpers/usernameHelpers';
import { words } from '../words';

const SignupUsernameContainer: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value;
    setUsername(username);
    setUsernameErrorMessage('');
  };

  const onUsernameBlur = async () => {
    const error = await checkUsernameAvailability(username);
    setUsernameErrorMessage(error);
  };

  const isDisabled = username === '' || usernameErrorMessage !== '';

  const onFormSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onUsernameBlur();

    if (isDisabled) {
      return;
    }

    setIsLoading(true);

    const response = await useAuthAxios({
      path: 'user/username',
      method: RequestTypes.Patch,
      data: {
        username,
      },
    });

    if (response.status === 200) {
      setIsLoading(false);
      setIsSuccess(true);
      setUsername('');
      navigate(`/${username}`);
    } else {
      setUsernameErrorMessage(words.CreateUsername.errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <SignupUsername
      username={username}
      usernameErrorMessage={usernameErrorMessage}
      onUsernameChange={onUsernameChange}
      onUsernameBlur={onUsernameBlur}
      onFormSubmit={onFormSubmit}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isDisabled={isDisabled}
    />
  );
};

export default SignupUsernameContainer;
