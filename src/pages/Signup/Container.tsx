import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Signup } from '.';

export enum ErrorType {
  Generic = 'GENERIC',
  Google = 'GOOGLE',
  GitHub = 'GITHUB',
}

function SignupContainer(): React.ReactElement {
  const [errorType, setErrorType] = useState<ErrorType | null>(null);

  const history = useHistory();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const error = query.get('error');

  const onClickEmail = () => history.push('/signup/email');

  useEffect(() => {
    if (error) {
      if (error === 'internal') {
        setErrorType(ErrorType.Generic);
      } else if (error === 'google') {
        setErrorType(ErrorType.Google);
      } else if (error === 'github') {
        setErrorType(ErrorType.GitHub);
      }
    }
  }, [error]);

  return <Signup onClickEmail={onClickEmail} errorType={errorType} />;
}

export default SignupContainer;
