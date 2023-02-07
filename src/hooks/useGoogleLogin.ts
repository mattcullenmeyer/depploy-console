import { useLocation } from 'react-router-dom';
import { getGoogleUrl } from '../utils/getGoogleUrl';

export const useGoogleLogin = () => {
  const location = useLocation();
  const from = ((location.state as any)?.from?.pathname as string) || '/';
  const googleLogin = () => (window.location.href = getGoogleUrl(from));
  return googleLogin;
};
