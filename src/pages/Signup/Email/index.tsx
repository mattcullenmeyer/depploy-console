import React, { useEffect } from 'react';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Box } from '@twilio-paste/core/box';
import { Separator } from '@twilio-paste/core/separator';
import { Stack } from '@twilio-paste/core/stack';
import { Button } from '@twilio-paste/core/button';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { FormValues } from './Container';
import { EmailAddressInput, PasswordInput, UsernameInput } from '../../../components/Signup';
import { Toaster, useToaster } from '@twilio-paste/core/toast';
import { useGoogleLogin } from '../../../hooks/useGoogleLogin';
import { words } from '../words';
import { useGitHubLogin } from '../../../hooks/useGitHubLogin';

export interface EmailSignupProps {
  formValues: FormValues;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  onUsernameBlur: () => void;
  onFormSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  isSignupSuccess: boolean;
}

export const EmailSignup: React.FC<EmailSignupProps> = ({
  formValues,
  onEmailChange,
  onPasswordChange,
  onUsernameChange,
  onEmailBlur,
  onPasswordBlur,
  onUsernameBlur,
  onFormSubmit,
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

  return (
    <>
      <Toaster {...toaster} />
      <Box display="flex" justifyContent="center">
        <Box width="480px" marginY="space200">
          <Card padding="space90">
            <Heading as="h1" variant="heading30">
              Sign up with email
            </Heading>
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
              <UsernameInput
                value={formValues.username}
                onChange={onUsernameChange}
                onBlur={onUsernameBlur}
                errorMessage={formValues.usernameErrorMessage}
              />
              <PasswordInput
                value={formValues.password}
                onChange={onPasswordChange}
                onBlur={onPasswordBlur}
                errorMessage={formValues.passwordErrorMessage}
              />
              <Button variant="primary" onClick={onFormSubmit} fullWidth loading={isLoading}>
                Sign up
              </Button>
            </Stack>
          </Card>
        </Box>
      </Box>
    </>
  );
};
