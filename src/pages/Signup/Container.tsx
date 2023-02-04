import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Signup } from '.';
import { getGoogleUrl } from '../../utils/getGoogleUrl';

export interface ErrorType {
  google: boolean;
  generic: boolean;
}

function SignupContainer(): React.ReactElement {
  const defaultErrorTypes: ErrorType = {
    google: false,
    generic: false,
  };

  const [errorType, setErrorType] = useState<ErrorType>(defaultErrorTypes);

  const history = useHistory();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const error = query.get('error');

  const from = ((location.state as any)?.from?.pathname as string) || '/';

  const onClickGoogle = () => (window.location.href = getGoogleUrl(from));
  const onClickGitHub = () => {};
  const onClickEmail = () => history.push('/signup/email');

  useEffect(() => {
    if (error) {
      if (error === 'internal') {
        setErrorType({ ...defaultErrorTypes, generic: true });
      } else if (error === 'google') {
        setErrorType({ ...defaultErrorTypes, google: true });
      }
    }
  }, [error]);

  return (
    <Signup
      onClickGoogle={onClickGoogle}
      onClickGitHub={onClickGitHub}
      onClickEmail={onClickEmail}
      errorType={errorType}
    />
  );
}

export default SignupContainer;
