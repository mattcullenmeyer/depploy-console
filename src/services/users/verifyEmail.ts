import { RequestTypes, ResponseBody, useAxios } from '../useAxios';

export interface VerifyParams {
  code: string;
}

export interface VerifyResponse {
  auth_token: string;
  refresh_token: string;
}

export const verifyEmail = async ({
  code,
}: VerifyParams): Promise<ResponseBody<VerifyResponse>> => {
  const response = await useAxios<VerifyResponse>({
    path: 'auth/email/verify',
    method: RequestTypes.Patch,
    data: {
      code,
    },
  });

  return response;
};
