import { RequestTypes, ResponseBody, useAxios } from '../useAxios';

export interface SignupParameters {
  email: string;
  username: string;
  password: string;
}

export interface SignupResponse {
  username: string;
  email: string;
}

export const userSignup = async ({
  email,
  username,
  password,
}: SignupParameters): Promise<ResponseBody<SignupResponse>> => {
  const response = await useAxios<SignupResponse>({
    path: 'auth/register',
    method: RequestTypes.Post,
    data: {
      email,
      username,
      password,
    },
  });

  return response;
};
