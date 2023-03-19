import React, { useEffect } from 'react';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Box } from '@twilio-paste/core/box';
import { Separator } from '@twilio-paste/core/separator';
import { Stack } from '@twilio-paste/core/stack';
import { Button } from '@twilio-paste/core/button';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { FormValues } from './Container';
import {
  CodeInput,
  EmailAddressInput,
  PasswordInput,
  // UsernameInput,
} from '../../../components/Signup';
import { Toaster, useToaster } from '@twilio-paste/core/toast';
import { useGoogleLogin } from '../../../hooks/useGoogleLogin';
import { words } from '../words';
import { useGitHubLogin } from '../../../hooks/useGitHubLogin';
import { Anchor, HelpText } from '@twilio-paste/core';

export interface EmailSignupProps {
  formValues: FormValues;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  onUsernameBlur: () => void;
  onFormSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  accountCreated: boolean;
  emailVerified: boolean;
  isLoading: boolean;
  isSignupSuccess: boolean;
}

export const EmailSignup: React.FC<EmailSignupProps> = ({
  formValues,
  onEmailChange,
  onCodeChange,
  onPasswordChange,
  // onUsernameChange,
  onEmailBlur,
  onPasswordBlur,
  // onUsernameBlur,
  onFormSubmit,
  accountCreated,
  emailVerified,
  isLoading,
  isSignupSuccess,
}) => {
  const toaster = useToaster();

  useEffect(() => {
    // TODO: This doesn't work because users are redirected to
    // a different page before they see the toaster
    if (isSignupSuccess) {
      toaster.push({
        message: words.EmailSignup.successMessage,
        variant: 'success',
        dismissAfter: 4000,
      });
    }
  }, [isSignupSuccess]);

  if (!accountCreated) {
    const isDisabled = formValues.email === '' || formValues.emailErrorMessage !== '';

    return (
      <SignupCard heading="Sign up with email">
        <>
          <Stack orientation="vertical" spacing="space70">
            <Separator orientation="horizontal" />
            <Paragraph>
              Sign up up with{' '}
              <Button variant="link" onClick={useGoogleLogin()}>
                Google
              </Button>{' '}
              or{' '}
              <Button variant="link" onClick={useGitHubLogin()}>
                GitHub
              </Button>{' '}
              instead
            </Paragraph>
            <EmailAddressInput
              value={formValues.email}
              onChange={onEmailChange}
              onBlur={onEmailBlur}
              errorMessage={formValues.emailErrorMessage}
            />
            <HelpText variant="default" id="login_help_text">
              <>
                Already signed up? <Anchor href="/login">Log in</Anchor>
              </>
            </HelpText>
            <Button
              variant="primary"
              onClick={onFormSubmit}
              fullWidth
              loading={isLoading}
              disabled={isDisabled}
            >
              Continue
            </Button>
          </Stack>
        </>
      </SignupCard>
    );
  }

  if (!emailVerified) {
    return (
      <SignupCard heading="Enter verification code">
        <>
          <Stack orientation="vertical" spacing="space70">
            <Separator orientation="horizontal" />
            <Paragraph>
              We sent a code to <strong>{formValues.email}</strong>. Enter the code here to
              continue.
            </Paragraph>
            <CodeInput value={formValues.code} onChange={onCodeChange} />
            <HelpText variant="default" id="code_help_text">
              <>
                {`Didn't`} get it?{' '}
                <Button variant="link" onClick={() => {}}>
                  Resend code
                </Button>
              </>
            </HelpText>
            {/* TODO: add is disabled */}
            <Button variant="primary" onClick={onFormSubmit} fullWidth loading={isLoading}>
              Verify email
            </Button>
          </Stack>
        </>
      </SignupCard>
    );
  }

  const isDisabled = formValues.password === '' || formValues.passwordErrorMessage !== '';

  return (
    <>
      <Toaster {...toaster} />
      <SignupCard heading="Create password">
        <Stack orientation="vertical" spacing="space70">
          <Separator orientation="horizontal" />
          <EmailAddressInput
            value={formValues.email}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            errorMessage={formValues.emailErrorMessage}
            readonly
          />
          <PasswordInput
            value={formValues.password}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            errorMessage={formValues.passwordErrorMessage}
          />
          <Button
            variant="primary"
            onClick={onFormSubmit}
            fullWidth
            loading={isLoading}
            disabled={isDisabled}
          >
            Complete signup
          </Button>
        </Stack>
      </SignupCard>
    </>
  );
};

const SignupCard = ({ heading, children }: { heading: string; children: React.ReactElement }) => (
  <Box display="flex" justifyContent="center">
    <Box width="480px" marginY="space200" boxShadow="shadow">
      <Card padding="space90">
        <Heading as="h1" variant="heading30">
          {heading}
        </Heading>
        {children}
      </Card>
    </Box>
  </Box>
);
