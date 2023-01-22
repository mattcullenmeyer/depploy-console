import React from 'react';
import { useHistory } from 'react-router-dom';
import { Signup } from '.';

function SignupContainer(): React.ReactElement {
  const history = useHistory();

  const onClickGoogle = () => {};
  const onClickGitHub = () => {};
  const onClickEmail = () => history.push('/signup/email');

  return (
    <Signup
      onClickGoogle={onClickGoogle}
      onClickGitHub={onClickGitHub}
      onClickEmail={onClickEmail}
    />
  );
}

export default SignupContainer;
