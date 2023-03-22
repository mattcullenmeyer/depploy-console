import { RequestTypes, ResponseBody, useAxios } from '../useAxios';

export interface SignupParameters {
  email: string;
}

export interface SignupResponse {
  email: string;
}

export const userSignup = async ({
  email,
}: SignupParameters): Promise<ResponseBody<SignupResponse>> => {
  const response = await useAxios<SignupResponse>({
    path: 'auth/register',
    method: RequestTypes.Post,
    data: {
      email,
    },
  });

  return response;
};
