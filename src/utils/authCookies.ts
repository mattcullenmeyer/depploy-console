import Cookies from 'js-cookie';
import { AUTH_TOKEN, REFRESH_TOKEN } from '../constants/cookies';

interface AuthTokens {
  auth_token: string;
  refresh_token: string;
}

export const setAuthCookies = (data: AuthTokens) => {
  const authToken = data.auth_token;
  const refreshToken = data.refresh_token;

  const in15Minutes = 1 / 96;
  const in24Hours = 1;

  let domain = '*.depploy.io';
  if (window.location.hostname === '127.0.0.1') {
    domain = '127.0.0.1';
  }

  // Cookie expirations must align with JWT expirations
  Cookies.set(AUTH_TOKEN, authToken, {
    domain,
    expires: in15Minutes,
    secure: true,
  });
  Cookies.set(REFRESH_TOKEN, refreshToken, {
    domain,
    expires: in24Hours,
    secure: true,
  });
};

export const removeAuthCookies = () => {
  Cookies.remove(AUTH_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
};
