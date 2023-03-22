import { Text } from '@twilio-paste/core/text';
import { Alert } from '@twilio-paste/core/alert';
import { Anchor } from '@twilio-paste/core/anchor';
import { paths } from '../../constants/paths';

export const ContactSupportLink = () => (
  <Anchor href={paths.contactSupport}>contact support</Anchor>
);

export const BasicErrorAlert = ({ children }: { children: React.ReactNode }) => (
  <Alert variant="error">
    <Text as="span">{children}</Text>
  </Alert>
);

export const GenericErrorAlert = () => (
  <BasicErrorAlert>
    <strong>An unknown error has occurred.</strong> Please try again or <ContactSupportLink /> if
    the problem continues.
  </BasicErrorAlert>
);
