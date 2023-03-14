import React from 'react';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Box } from '@twilio-paste/core/box';
import { Separator } from '@twilio-paste/core/separator';
import { Stack } from '@twilio-paste/core/stack';
import { Button } from '@twilio-paste/core/button';
import { Paragraph } from '@twilio-paste/core/paragraph';
import GoogleImg from '../../assets/google-icon.svg';
import GitHubImg from '../../assets/github-icon.svg';
import { words } from './words';
import { ErrorType } from './Container';
import { SignupErrorAlert } from './components/ErrorAlerts';
import { useGoogleLogin } from '../../hooks/useGoogleLogin';
import { useGitHubLogin } from '../../hooks/useGitHubLogin';

export interface SignupProps {
  onClickEmail: () => void;
  errorType: ErrorType | null;
}

export function Signup({ onClickEmail, errorType }: SignupProps): React.ReactElement {
  return (
    <Box display="flex" justifyContent="center">
      <Box width="480px" marginY="space200">
        <Card padding="space90">
          <Heading as="h1" variant="heading30">
            Create your account
          </Heading>
          <Stack orientation="vertical" spacing="space70">
            <Separator orientation="horizontal" />
            {errorType === ErrorType.Generic && <SignupErrorAlert />}
            {errorType === ErrorType.Google && (
              <SignupErrorAlert title="An error occurred connecting to your Google account." />
            )}
            {errorType === ErrorType.GitHub && (
              <SignupErrorAlert title="An error occurred connecting to your GitHub account." />
            )}
            <Paragraph>{words.signupDescription}</Paragraph>
            <Button variant="primary" fullWidth onClick={onClickEmail}>
              Sign up with email
            </Button>
            <Button variant="secondary" onClick={useGoogleLogin()} fullWidth>
              <GoogleImg />
              <Box marginLeft="space20">Sign up with Google</Box>
            </Button>
            <Button variant="secondary" onClick={useGitHubLogin()} fullWidth>
              <GitHubImg />
              <Box marginLeft="space20">Sign up with GitHub</Box>
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}
