import { useLocation } from 'react-router-dom';
import { getGitHubUrl } from '../utils/getGitHubUrl';

export const useGitHubLogin = () => {
  const location = useLocation();
  const from = ((location.state as any)?.from?.pathname as string) || '/';
  const gitHubLogin = () => (window.location.href = getGitHubUrl(from));
  return gitHubLogin;
};
