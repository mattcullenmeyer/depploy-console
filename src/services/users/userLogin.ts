import { RequestTypes, ResponseBody, useAxios } from '../useAxios';

export interface LoginParameters {
  email: string;
  password: string;
}

export interface LoginResponse {
  auth_token: string;
  refresh_token: string;
}

export const userLogin = async ({
  email,
  password,
}: LoginParameters): Promise<ResponseBody<LoginResponse>> => {
  const response = await useAxios<LoginResponse>({
    path: 'auth/login',
    method: RequestTypes.Post,
    data: {
      email,
      password,
    },
  });

  return response;
};
