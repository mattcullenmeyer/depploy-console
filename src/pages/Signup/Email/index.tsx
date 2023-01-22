import React from 'react';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Box } from '@twilio-paste/core/box';
import { Separator } from '@twilio-paste/core/separator';
import { Stack } from '@twilio-paste/core/stack';
import { Button } from '@twilio-paste/core/button';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { FormValues } from './Container';
import {
  EmailAddressInput,
  PasswordInput,
  UsernameInput,
} from '../../../components/Signup';

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

export const EmailSignup: React.FC<EmailSignupProps> = (props) => {
  return (
    <Box display="flex" justifyContent="center">
      <Box width="480px" marginY="space200">
        <Card padding="space90">
          <Heading as="h1" variant="heading30">
            Sign up with email
          </Heading>
          <Stack orientation="vertical" spacing="space70">
            <Separator orientation="horizontal" />
            <Paragraph>
              Sign up up with <Button variant="link">Google</Button> or{' '}
              <Button variant="link">GitHub</Button> instead
            </Paragraph>
            <UsernameInput
              value={props.formValues.username}
              onChange={props.onUsernameChange}
              onBlur={props.onUsernameBlur}
              errorMessage={props.formValues.usernameErrorMessage}
            />
            <EmailAddressInput
              value={props.formValues.email}
              onChange={props.onEmailChange}
              onBlur={props.onEmailBlur}
              errorMessage={props.formValues.emailErrorMessage}
            />
            <PasswordInput
              value={props.formValues.password}
              onChange={props.onPasswordChange}
              onBlur={props.onPasswordBlur}
              errorMessage={props.formValues.passwordErrorMessage}
            />
            <Button
              variant="primary"
              onClick={props.onFormSubmit}
              fullWidth
              loading={props.isLoading}
            >
              Sign up
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};
