import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { EmailSignup } from './index';
import { userSignup } from '../../../services/users/userSignup';
import { checkEmailAvailability } from '../helpers/emailHelpers';
import { verifyEmail } from '../../../services/users/verifyEmail';
import { resendVerificationCode } from '../../../services/users/resendVerificationCode';
import { setAuthCookies } from '../../../utils/authCookies';
import { updatePassword } from '../../../services/users/updatePassword';
import { words } from '../words';

export interface SignupFormValues {
  email: string;
  code: string;
  password: string;
}

export interface SignupErrors {
  emailHelpText: string;
  codeHelpText: string;
  passwordHelpText: string;
  emailAlert: boolean;
  verifyEmailAlert: React.ReactNode;
  resendCodeAlert: boolean;
  passwordAlert: boolean;
}

const defaultSignupFormValues: SignupFormValues = {
  email: '',
  code: '',
  password: '',
};

const defaultSignupErrors: SignupErrors = {
  emailHelpText: '',
  codeHelpText: '',
  passwordHelpText: '',
  emailAlert: false,
  verifyEmailAlert: '',
  resendCodeAlert: false,
  passwordAlert: false,
};

const EmailSignupContainer: React.FC = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<SignupFormValues>(defaultSignupFormValues);
  const [errors, setErrors] = useState<SignupErrors>(defaultSignupErrors);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendSuccess, setIsResendSuccess] = useState(false);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    setFormValues({ ...formValues, email });
    setErrors({ ...errors, emailHelpText: '' });
  };

  const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.target.value;
    setFormValues({ ...formValues, code });
    setErrors({ ...errors, codeHelpText: '' });
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setFormValues({ ...formValues, password });
    setErrors({ ...errors, passwordHelpText: '' });
  };

  const onEmailBlur = async () => {
    const email = formValues.email;

    if (email === '') {
      setErrors({
        ...errors,
        emailHelpText: words.emailRequired,
      });
      return;
    }

    if (!validator.isEmail(email)) {
      setErrors({ ...errors, emailHelpText: words.invalidEmail });
      return;
    }

    // Returns empty string if available
    const emailHelpText = await checkEmailAvailability(email);

    setErrors({
      ...errors,
      emailHelpText,
    });
  };

  const onCodeBlur = () => {
    const code = formValues.code;

    if (code === '') {
      setErrors({
        ...errors,
        codeHelpText: words.verificationCodeRequired,
      });
      return;
    }
  };

  const onPasswordBlur = () => {
    const password = formValues.password;

    if (password === '') {
      setErrors({
        ...errors,
        passwordHelpText: words.passwordRequired,
      });
      return;
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 10,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      setErrors({
        ...errors,
        passwordHelpText: words.invalidPassword,
      });
    }
  };

  const onResendCode = async () => {
    setIsLoading(true);
    setIsResendSuccess(false);
    setErrors({ ...errors, resendCodeAlert: false, verifyEmailAlert: '' });

    const response = await resendVerificationCode({
      email: formValues.email,
    });

    if (response.status === 204) {
      setIsLoading(false);
      setIsResendSuccess(true);
    } else {
      setIsLoading(false);
      setErrors({
        ...errors,
        resendCodeAlert: true,
      });
    }
  };

  const onEmailSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onEmailBlur();

    const isDisabled = formValues.email === '' || errors.emailHelpText !== '';

    if (isDisabled) {
      return;
    }

    setErrors({ ...errors, emailAlert: false });
    setIsLoading(true);

    const response = await userSignup({
      email: formValues.email,
    });

    if (response.status === 201 && response.data) {
      setIsLoading(false);
      setIsAccountCreated(true);
    } else {
      setIsLoading(false);
      setErrors({
        ...errors,
        emailAlert: true,
      });
    }
  };

  const onVerifyEmailSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const isDisabled = formValues.code === '' || errors.codeHelpText !== '';

    if (isDisabled) {
      return;
    }

    setIsLoading(true);
    setErrors({ ...errors, verifyEmailAlert: '', resendCodeAlert: false });

    const response = await verifyEmail({
      code: formValues.code,
    });

    if (response.status === 200 && response.data) {
      setIsLoading(false);
      setIsEmailVerified(true);
      setAuthCookies(response.data);
    } else if (response.status === 404) {
      setIsLoading(false);
      setErrors({
        ...errors,
        verifyEmailAlert: words.verifyEmail404ErrorMessage,
      });
    } else {
      setIsLoading(false);
      setErrors({
        ...errors,
        verifyEmailAlert: words.verifyEmailGenericErrorMessage,
      });
    }
  };

  const onPasswordSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onPasswordBlur();

    const isDisabled = formValues.password === '' || errors.passwordHelpText !== '';

    if (isDisabled) {
      return;
    }

    setErrors({ ...errors, passwordAlert: false });
    setIsLoading(true);

    const response = await updatePassword({
      password: formValues.password,
    });

    if (response.status === 200 && response.data) {
      setIsLoading(false);
      navigate('/');
    } else {
      setIsLoading(false);
      setErrors({ ...errors, passwordAlert: true });
    }
  };

  return (
    <EmailSignup
      formValues={formValues}
      errors={errors}
      onEmailChange={onEmailChange}
      onEmailBlur={onEmailBlur}
      onEmailSubmit={onEmailSubmit}
      onCodeChange={onCodeChange}
      onCodeBlur={onCodeBlur}
      onResendCode={onResendCode}
      onVerifyEmailSubmit={onVerifyEmailSubmit}
      onPasswordChange={onPasswordChange}
      onPasswordBlur={onPasswordBlur}
      onPasswordSubmit={onPasswordSubmit}
      isAccountCreated={isAccountCreated}
      isEmailVerified={isEmailVerified}
      isLoading={isLoading}
      isResendSuccess={isResendSuccess}
    />
  );
};

export default EmailSignupContainer;
