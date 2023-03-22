import { BasicErrorAlert, ContactSupportLink } from '../../../components/BasicErrorAlert';

export interface SignupErrorAlertProps {
  title?: string;
}

export const SignupErrorAlert = ({
  title = 'An unknown error has occurred.',
}: SignupErrorAlertProps) => (
  <BasicErrorAlert>
    <strong>{title}</strong> Please try again or <ContactSupportLink /> if the problem continues.
  </BasicErrorAlert>
);
