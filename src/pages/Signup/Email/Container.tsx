import React, { useState } from 'react';
import validator from 'validator';
import { userSignup } from '../../../services/users/userSignup';
import { EmailSignup } from '.';
import { words } from '../words';
import { checkUsernameAvailability } from '../helpers/usernameHelpers';

export interface FormValues {
  email: string;
  code: string;
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
    code: '',
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
  const [accountCreated, setAccountCreated] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    setFormValues({ ...formValues, email, emailErrorMessage: '' });
  };

  const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.target.value;
    setFormValues({ ...formValues, code });
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

    if (email === '') {
      setFormValues({
        ...formValues,
        emailErrorMessage: words.emailRequired,
      });
      return;
    }

    if (!validator.isEmail(email)) {
      setFormValues({ ...formValues, emailErrorMessage: words.invalidEmail });
      return;
    }
  };

  const onUsernameBlur = async () => {
    const username = formValues.username;
    const usernameErrorMessage = await checkUsernameAvailability(username);

    setFormValues({
      ...formValues,
      usernameErrorMessage,
    });
  };

  const onPasswordBlur = () => {
    const password = formValues.password;

    if (password === '') {
      setFormValues({
        ...formValues,
        passwordErrorMessage: words.passwordRequired,
      });
      return;
    }

    if (
      !validator.isStrongPassword(password, {
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

    // This order is intentional since they will trigger simultaneously.
    // If more than one field are blank, only the latter one will take effect.
    // Therefore, they should appear here in reverse order of the UI form.
    onPasswordBlur();
    onUsernameBlur();
    onEmailBlur();

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
      // history.push(''); TODO: Navigate to confirm email page
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
      onCodeChange={onCodeChange}
      onPasswordChange={onPasswordChange}
      onUsernameChange={onUsernameChange}
      onEmailBlur={onEmailBlur}
      onPasswordBlur={onPasswordBlur}
      onUsernameBlur={onUsernameBlur}
      onFormSubmit={onFormSubmit}
      accountCreated={accountCreated}
      emailVerified={emailVerified}
      isLoading={isLoading}
      isSignupSuccess={isSignupSuccess}
    />
  );
};

export default EmailSignupContainer;
