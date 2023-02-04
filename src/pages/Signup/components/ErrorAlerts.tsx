import { Text } from '@twilio-paste/core/text';
import { Alert } from '@twilio-paste/core/alert';
import { Anchor } from '@twilio-paste/core/anchor';

export interface SignupErrorAlertProps {
  title?: string;
}

export const SignupErrorAlert = ({
  title = 'An unknown error has occurred.',
}: SignupErrorAlertProps) => (
  <Alert variant="error">
    <Text as="span">
      <strong>{title}</strong> Please try again or{' '}
      <Anchor href="/support/contact">contact support</Anchor> if the problem
      continues.
    </Text>
  </Alert>
);
