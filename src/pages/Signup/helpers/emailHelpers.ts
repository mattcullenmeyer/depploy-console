import useAxios, { RequestTypes } from '../../../services/useAxios';
import { words } from '../words';

export const checkEmailAvailability = async (email: string): Promise<string> => {
  const response = await useAxios({
    path: `user/email/${email}`,
    method: RequestTypes.Get,
  });

  // Returns with status code 204 if email is available
  if (response.status === 204) {
    return '';
  }

  // Returns with status code 200 if email is unavailable
  return words.emailUnavailable;
};
