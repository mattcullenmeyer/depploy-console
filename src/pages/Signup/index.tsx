import React from 'react';
// Components
import { Box } from '@twilio-paste/core/box';
import { Separator } from '@twilio-paste/core/separator';
import { Stack } from '@twilio-paste/core/stack';
import { Button } from '@twilio-paste/core/button';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { SignupErrorAlert } from './components/ErrorAlerts';
import { FormCard } from '../../components/FormCard';
// Images
import GoogleImg from '../../assets/google-icon.svg';
import GitHubImg from '../../assets/github-icon.svg';
// Other
import { ErrorType } from './Container';
import { useGoogleLogin } from '../../hooks/useGoogleLogin';
import { useGitHubLogin } from '../../hooks/useGitHubLogin';
import { words } from './words';

export interface SignupProps {
  onClickEmail: () => void;
  errorType: ErrorType | null;
}

export const Signup = ({ onClickEmail, errorType }: SignupProps): React.ReactElement => (
  <FormCard heading="Create your account">
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
  </FormCard>
);
