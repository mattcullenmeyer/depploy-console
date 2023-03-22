import React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Separator } from '@twilio-paste/core/separator';
import { Stack } from '@twilio-paste/core/stack';
import { Button } from '@twilio-paste/core/button';
import { Anchor } from '@twilio-paste/core/anchor';
import { FormCard } from '../../components/FormCard';
import { BasicErrorAlert, ContactSupportLink } from '../../components/BasicErrorAlert';
import { PasswordInput, EmailInput } from './components';
import { paths } from '../../constants/paths';
import { useGoogleLogin } from '../../hooks/useGoogleLogin';
import { useGitHubLogin } from '../../hooks/useGitHubLogin';
import GoogleImg from '../../assets/google-icon.svg';
import GitHubImg from '../../assets/github-icon.svg';

export interface LoginProps {
  email: string;
  password: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled: boolean;
  isLoading: boolean;
  isIncorrectLogin: boolean;
  isLoginError: boolean;
}

export function Login({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onFormSubmit,
  isDisabled,
  isLoading,
  isIncorrectLogin,
  isLoginError,
}: LoginProps): React.ReactElement {
  // TODO: Create /password-reset page
  // TODO: Create /support/contact page

  return (
    <FormCard heading="Log in to your account">
      <Stack orientation="vertical" spacing="space70">
        <Separator orientation="horizontal" />
        {isIncorrectLogin && <IncorrectLoginAlert />}
        {isLoginError && <LoginErrorAlert />}
        <EmailInput value={email} onChange={onEmailChange} />
        <PasswordInput value={password} onChange={onPasswordChange} />
        <Button
          variant="primary"
          onClick={onFormSubmit}
          fullWidth
          loading={isLoading}
          disabled={isDisabled}
        >
          Log in
        </Button>
        <Anchor href={paths.passwordReset}>Forgot your password?</Anchor>
        <Separator orientation="horizontal" />
        <Button variant="secondary" onClick={useGoogleLogin()} fullWidth>
          <GoogleImg />
          <Box marginLeft="space20">Sign in with Google</Box>
        </Button>
        <Button variant="secondary" onClick={useGitHubLogin()} fullWidth>
          <GitHubImg />
          <Box marginLeft="space20">Sign in with GitHub</Box>
        </Button>
      </Stack>
    </FormCard>
  );
}

const IncorrectLoginAlert = () => (
  <BasicErrorAlert>
    <strong>Incorrect email or password.</strong> The email or password you entered is incorrect.
    Please try again, reset your password, or <ContactSupportLink /> if you are unable to access
    your account.
  </BasicErrorAlert>
);

const LoginErrorAlert = () => (
  <BasicErrorAlert>
    <strong>An unknown error has occurred.</strong> Please try again or <ContactSupportLink /> if
    the problem continues.
  </BasicErrorAlert>
);
