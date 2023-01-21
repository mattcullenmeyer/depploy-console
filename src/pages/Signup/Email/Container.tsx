import React, { useState } from 'react';
import validator from 'validator';
import useAxios, { RequestTypes } from '../../../services/useAxios';
import { userSignup } from '../../../services/users/userSignup';
import { EmailSignup } from '.';
import { words } from '../words';

export interface FormValues {
  email: string;
  password: string;
  username: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  usernameErrorMessage: string;
  signupErrorMessage: string;
}

const EmailSignupContainer: React.FC = () => {
  const defaultFormValues: FormValues = {
    email: '',
    password: '',
    username: '',
    emailErrorMessage: '',
    passwordErrorMessage: '',
    usernameErrorMessage: '',
    signupErrorMessage: '',
  };

  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    setFormValues({ ...formValues, email, emailErrorMessage: '' });
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setFormValues({ ...formValues, password, passwordErrorMessage: '' });
  };

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value;
    setFormValues({ ...formValues, username, usernameErrorMessage: '' });
  };

  const onEmailBlur = async () => {
    const email = formValues.email;
    if (email !== '' && !validator.isEmail(email)) {
      setFormValues({ ...formValues, emailErrorMessage: words.invalidEmail });
      return;
    }
  };

  const onUsernameBlur = async () => {
    const username = formValues.username;

    const response = await useAxios({
      path: `user/username/${username}`,
      method: RequestTypes.Get,
    });

    if (response.status === 200) {
      setFormValues({
        ...formValues,
        usernameErrorMessage: words.usernameUnavailable,
      });
    }
  };

  const onPasswordBlur = () => {
    const password = formValues.password;

    if (
      password !== '' &&
      !validator.isStrongPassword(password, {
        // TODO: return returnScore to show password strength in UI
        minLength: 10,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      setFormValues({
        ...formValues,
        passwordErrorMessage: words.invalidPassword,
      });
    }
  };

  const isDisabled =
    formValues.email === '' ||
    formValues.password === '' ||
    formValues.emailErrorMessage !== '' ||
    formValues.passwordErrorMessage !== '';

  const onFormSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onEmailBlur();
    onPasswordBlur();
    onUsernameBlur();

    if (isDisabled) {
      return;
    }

    setIsLoading(true);

    const response = await userSignup({
      email: formValues.email,
      password: formValues.password,
      username: formValues.username,
    });

    if (response.status === 201 && response.data) {
      setIsLoading(false);
      setIsSignupSuccess(true);
      setFormValues(defaultFormValues);
    } else {
      setFormValues({
        ...formValues,
        signupErrorMessage: words.signupErrorMessage,
      });
      setIsLoading(false);
    }
  };

  return (
    <EmailSignup
      formValues={formValues}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onUsernameChange={onUsernameChange}
      onEmailBlur={onEmailBlur}
      onPasswordBlur={onPasswordBlur}
      onUsernameBlur={onUsernameBlur}
      onFormSubmit={onFormSubmit}
      isLoading={isLoading}
      isDisabled={isDisabled}
      isSignupSuccess={isSignupSuccess}
    />
  );
};

export default EmailSignupContainer;
