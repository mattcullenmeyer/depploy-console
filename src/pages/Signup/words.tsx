import { ContactSupportLink } from '../../components/BasicErrorAlert';

export const words = {
  emailRequired: 'Email address is required.',
  invalidEmail: 'The email address you entered is not valid.',
  emailUnavailable: 'That email address is already used by another account.',
  verificationCodeRequired: 'One-time verification code is required.',
  passwordRequired: 'Password is required.',
  invalidPassword: 'Password must be at least 10 characters.',
  signupDescription: `
    Spend more time developing your web application and less
    time figuring out how to deploy it.`,
  verifyEmail404ErrorMessage: (
    <>
      <strong>Failed to verify email.</strong> The entered code is invalid or expired. Please resend
      a new code and try again or <ContactSupportLink /> if the problem continues.
    </>
  ),
  verifyEmailGenericErrorMessage: (
    <>
      <strong>An unknown error has occurred.</strong> Please resend a new code and try again or{' '}
      <ContactSupportLink /> if the problem continues.
    </>
  ),
  resendCodeErrorMessage: (
    <>
      <strong>Failed to resend code.</strong> Please try again or <ContactSupportLink /> if the
      problem continues.
    </>
  ),
  resendCodeSuccessToaster: 'A new one-time verification code has been sent to your inbox.',
  verifyEmailSuccessToaster: 'Your email address was successfully verified.',
};
