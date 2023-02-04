import Cookies from 'js-cookie';
// Services
import { authTokenRefresh } from './authTokenRefresh';
import { useAxios, RequestParameters, ResponseBody } from './useAxios';
// Utils
import { setAuthCookies } from '../utils/authCookies';
// Constants
import { AUTH_TOKEN } from '../constants/cookies';

export const useAuthAxios = async <T>({
  path,
  method,
  data = {},
  params = {},
}: Omit<RequestParameters, 'headers'>): Promise<ResponseBody<T>> => {
  let authToken = Cookies.get(AUTH_TOKEN);

  if (!authToken) {
    const tokenRefreshResponse = await authTokenRefresh();

    if (tokenRefreshResponse.status === 200 && tokenRefreshResponse.data) {
      setAuthCookies(tokenRefreshResponse.data);
      authToken = Cookies.get(AUTH_TOKEN);
    } else {
      console.error('Failed to refresh authorization token.');
      // TODO: Redirect to login page?
    }
  }

  const response = await useAxios<T>({
    method,
    path,
    data,
    params,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response;
};
