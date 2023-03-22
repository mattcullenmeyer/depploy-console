import { useAuthAxios } from '../useAuthAxios';
import { RequestTypes } from '../useAxios';

interface UpdatePasswordParams {
  password: string;
}

export const updatePassword = async ({ password }: UpdatePasswordParams) => {
  const response = await useAuthAxios({
    path: 'user/password',
    method: RequestTypes.Patch,
    data: { password },
  });

  return response;
};
