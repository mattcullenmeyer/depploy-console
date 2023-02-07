import { useParams } from 'react-router-dom';

export const Home = () => {
  interface Params {
    account: string;
  }
  const { account } = useParams<Params>();

  return <>{account}</>;
};
