import useAxios, { RequestTypes } from '../../../services/useAxios';
import { words } from '../words';

export const checkUsernameAvailability = async (
  username: string
): Promise<string> => {
  // Maybe only contain alphanumeric characters
  // This is case insensitive (ie matt is the same username as MATT)
  const usernameRegex = /^[a-z0-9]+$/i;

  if (username === '') {
    return words.usernameRequired;
  }

  if (!username.match(usernameRegex)) {
    return words.invalidUsername;
  }

  const response = await useAxios({
    path: `user/username/${username}`,
    method: RequestTypes.Get,
  });

  // Returns with status code 204 if username is available
  if (response.status === 204) {
    return '';
  }

  // Returns with status code 200 if username is unavailable
  return words.usernameUnavailable;
};
