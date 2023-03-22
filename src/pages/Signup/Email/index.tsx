import React, { useEffect } from 'react';
import { Separator } from '@twilio-paste/core/separator';
import { Stack } from '@twilio-paste/core/stack';
import { Button } from '@twilio-paste/core/button';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Toaster, useToaster } from '@twilio-paste/core/toast';
import { Anchor } from '@twilio-paste/core/anchor';
import { Text } from '@twilio-paste/core/text';
import { BasicErrorAlert, GenericErrorAlert } from '../../../components/BasicErrorAlert';
import { FormCard } from '../../../components/FormCard';
import { CodeInput, EmailAddressInput, PasswordInput } from '../components/FormInputs';
import { SignupFormValues, SignupErrors } from './Container';
import { useGoogleLogin } from '../../../hooks/useGoogleLogin';
import { useGitHubLogin } from '../../../hooks/useGitHubLogin';
import { paths } from '../../../constants/paths';
import { words } from '../words';

export interface EmailSignupProps {
  formValues: SignupFormValues;
  errors: SignupErrors;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailBlur: () => void;
  onEmailSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResendCode: () => void;
  onVerifyEmailSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordBlur: () => void;
  onPasswordSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isAccountCreated: boolean;
  isEmailVerified: boolean;
  isLoading: boolean;
  isResendSuccess: boolean;
}

export const EmailSignup: React.FC<EmailSignupProps> = ({
  formValues,
  errors,
  onEmailChange,
  onEmailBlur,
  onEmailSubmit,
  onCodeChange,
  onResendCode,
  onVerifyEmailSubmit,
  onPasswordChange,
  onPasswordBlur,
  onPasswordSubmit,
  isAccountCreated,
  isEmailVerified,
  isLoading,
  isResendSuccess,
}) => {
  const toaster = useToaster();

  useEffect(() => {
    if (isResendSuccess) {
      toaster.push({
        message: words.resendCodeSuccessToaster,
        variant: 'success',
        dismissAfter: 6000, // 500 milliseconds per word
      });
    }
  }, [isResendSuccess]);

  useEffect(() => {
    if (isEmailVerified) {
      toaster.push({
        message: words.verifyEmailSuccessToaster,
        variant: 'success',
        dismissAfter: 3000, // 500 milliseconds per word
      });
    }
  }, [isEmailVerified]);

  if (!isAccountCreated) {
    const isSignupDisabled = formValues.email === '' || errors.emailHelpText !== '';

    return (
      <FormCard heading="Sign up with email">
        <Stack orientation="vertical" spacing="space70">
          <Separator orientation="horizontal" />
          {errors.emailAlert && <GenericErrorAlert />}
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
            helpText={errors.emailHelpText}
          />
          <Button
            variant="primary"
            onClick={onEmailSubmit}
            fullWidth
            loading={isLoading}
            disabled={isSignupDisabled}
          >
            Continue
          </Button>
          <Text as="p" color="colorTextWeak">
            Already signed up? <Anchor href={paths.login}>Log in</Anchor>
          </Text>
        </Stack>
      </FormCard>
    );
  }

  const isVerifyEmailDisabled = formValues.code === '';

  if (!isEmailVerified) {
    return (
      <>
        <Toaster {...toaster} />
        <FormCard heading="Verify email address">
          <Stack orientation="vertical" spacing="space70">
            <Separator orientation="horizontal" />
            {errors.resendCodeAlert && (
              <BasicErrorAlert>{words.resendCodeErrorMessage}</BasicErrorAlert>
            )}
            {errors.verifyEmailAlert && (
              <BasicErrorAlert>{errors.verifyEmailAlert}</BasicErrorAlert>
            )}
            <Paragraph>
              We sent a one-time verification code to <strong>{formValues.email}</strong>. Enter the
              code here to continue.
            </Paragraph>
            <CodeInput value={formValues.code} onChange={onCodeChange} />
            <Button
              variant="primary"
              onClick={onVerifyEmailSubmit}
              fullWidth
              loading={isLoading}
              disabled={isVerifyEmailDisabled}
            >
              Verify email
            </Button>
            <Text as="p" color="colorTextWeak">
              {`Didn't`} get it?{' '}
              <Button variant="link" onClick={onResendCode}>
                Resend code
              </Button>
            </Text>
          </Stack>
        </FormCard>
      </>
    );
  }

  const isCreatePasswordDisabled = formValues.password === '' || errors.passwordHelpText !== '';

  return (
    <>
      <Toaster {...toaster} />
      <FormCard heading="Create password">
        <Stack orientation="vertical" spacing="space70">
          <Separator orientation="horizontal" />
          {errors.passwordAlert && <GenericErrorAlert />}
          <EmailAddressInput
            value={formValues.email}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            readonly
          />
          <PasswordInput
            value={formValues.password}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            helpText={errors.passwordHelpText}
          />
          <Button
            variant="primary"
            onClick={onPasswordSubmit}
            fullWidth
            loading={isLoading}
            disabled={isCreatePasswordDisabled}
          >
            Complete signup
          </Button>
        </Stack>
      </FormCard>
    </>
  );
};
