import { useParams } from 'react-router-dom';

export const Home = () => {
  const { account } = useParams();

  return <>{account}</>;
};
