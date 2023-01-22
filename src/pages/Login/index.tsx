import React from 'react';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Box } from '@twilio-paste/core/box';
import { Separator } from '@twilio-paste/core/separator';
import { Stack } from '@twilio-paste/core/stack';
import { Button } from '@twilio-paste/core/button';
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
}

export function Login(props: LoginProps): React.ReactElement {
  return (
    <Box display="flex" justifyContent="center">
      <Box width="480px" marginY="space200">
        <Card padding="space90">
          <Heading as="h1" variant="heading30">
            Log in to your account
          </Heading>
          <Stack orientation="vertical" spacing="space70">
            <Separator orientation="horizontal" />
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
            <Button variant="secondary" onClick={props.onClickGoogle} fullWidth>
              <GoogleImg />
              <Box marginLeft="space20">Sign in with Google</Box>
            </Button>
            <Button variant="secondary" onClick={props.onClickGitHub} fullWidth>
              <GitHubImg />
              <Box marginLeft="space20">Sign in with GitHub</Box>
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}
