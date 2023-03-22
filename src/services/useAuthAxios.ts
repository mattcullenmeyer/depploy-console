import Cookies from 'js-cookie';
import { authTokenRefresh } from './authTokenRefresh';
import { useAxios, RequestParameters, ResponseBody } from './useAxios';
import { setAuthCookies } from '../utils/authCookies';
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
      // TODO: Notify user or navigate to login
    }
  }

  const response = await useAxios<T>({
    path,
    method,
    data,
    params,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response;
};
