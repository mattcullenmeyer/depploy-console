import React, { useEffect } from 'react';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Box } from '@twilio-paste/core/box';
import { Separator } from '@twilio-paste/core/separator';
import { Stack } from '@twilio-paste/core/stack';
import { Button } from '@twilio-paste/core/button';
import { Toaster, useToaster } from '@twilio-paste/core/toast';
import { Anchor } from '@twilio-paste/core/anchor';
import { Alert } from '@twilio-paste/core/alert';
import { Text } from '@twilio-paste/core/text';
import { PasswordInput, UsernameInput } from '../../components/Login';
import GoogleImg from '../../assets/google-icon.svg';
import GitHubImg from '../../assets/github-icon.svg';

export interface LoginProps {
  username: string;
  password: string;
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickGoogle: () => void;
  onClickGitHub: () => void;
  isLoading: boolean;
  isLoginSuccess: boolean;
  isIncorrectLogin: boolean;
  isLoginError: boolean;
}

export function Login(props: LoginProps): React.ReactElement {
  const toaster = useToaster();

  useEffect(() => {
    if (props.isLoginSuccess) {
      toaster.push({
        message: 'You successfully logged in to your account',
        variant: 'success',
        dismissAfter: 3000,
      });
    }
  }, [props.isLoginSuccess]);

  // TODO: Create /password-reset page
  // TODO: Create /support/contact page

  return (
    <>
      <Toaster {...toaster} />
      <Box display="flex" justifyContent="center">
        <Box width="480px" marginY="space200">
          <Card padding="space90">
            <Heading as="h1" variant="heading30">
              Log in to your account
            </Heading>
            <Stack orientation="vertical" spacing="space70">
              <Separator orientation="horizontal" />
              {props.isIncorrectLogin && <IncorrectLoginAlert />}
              {props.isLoginError && <LoginErrorAlert />}
              <UsernameInput
                value={props.username}
                onChange={props.onUsernameChange}
              />
              <PasswordInput
                value={props.password}
                onChange={props.onPasswordChange}
              />
              <Button
                variant="primary"
                onClick={props.onFormSubmit}
                fullWidth
                loading={props.isLoading}
              >
                Log in
              </Button>
              <Separator orientation="horizontal" />
              <Button
                variant="secondary"
                onClick={props.onClickGoogle}
                fullWidth
              >
                <GoogleImg />
                <Box marginLeft="space20">Sign in with Google</Box>
              </Button>
              <Button
                variant="secondary"
                onClick={props.onClickGitHub}
                fullWidth
              >
                <GitHubImg />
                <Box marginLeft="space20">Sign in with GitHub</Box>
              </Button>
              <Anchor href="/password-reset">Forgot your password?</Anchor>
            </Stack>
          </Card>
        </Box>
      </Box>
    </>
  );
}

const IncorrectLoginAlert = () => (
  <Alert variant="error">
    <Text as="span">
      <strong>Incorrect email or password.</strong> The email or password you
      entered is incorrect. Please try again or{' '}
      <Anchor href="/support/contact">contact support</Anchor> if you are unable
      to access your account.
    </Text>
  </Alert>
);

const LoginErrorAlert = () => (
  <Alert variant="error">
    <Text as="span">
      <strong>An unknown error has occurred.</strong> Please try again or{' '}
      <Anchor href="/support/contact">contact support</Anchor> if the problem
      continues.
    </Text>
  </Alert>
);
