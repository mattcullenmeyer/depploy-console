import Cookies from 'js-cookie';
import { REFRESH_TOKEN } from '../constants/cookies';
import { AuthTokensDto } from '../utils/authCookies';
import { useAxios, RequestTypes, ResponseBody } from './useAxios';

export const authTokenRefresh = async (): Promise<
  ResponseBody<AuthTokensDto>
> => {
  const refreshToken = Cookies.get(REFRESH_TOKEN);

  const response = await useAxios<AuthTokensDto>({
    path: 'auth/token/refresh',
    method: RequestTypes.Post,
    data: {
      refresh_token: refreshToken,
    },
  });

  return response;
};
