export const getGitHubUrl = (from: string) => {
  const rootURl = 'https://github.com/login/oauth/authorize';

  const options = {
    redirect_uri: process.env.REACT_APP_GITHUB_OAUTH_REDIRECT as string,
    client_id: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID as string,
    scope: 'user:email,read:user',
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootURl}?${qs.toString()}`;
};
