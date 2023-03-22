import { RequestTypes, useAxios } from '../useAxios';

interface ResendParams {
  email: string;
}

export const resendVerificationCode = async ({ email }: ResendParams) => {
  const response = await useAxios({
    path: 'auth/email/resend',
    method: RequestTypes.Post,
    data: {
      email,
    },
  });

  return response;
};
