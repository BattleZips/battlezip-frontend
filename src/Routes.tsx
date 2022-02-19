import { useWallet } from 'contexts/WalletContext';
import { GameLocation, RootLocation } from 'Locations';
import { Navigate, useRoutes } from 'react-router-dom';
import Game from 'views/Game';
import Home from 'views/Home';

const routeList = (isConnected: boolean) => [
  {
    path: RootLocation,
    element: <Home />
  },
  {
    path: GameLocation,
    element: isConnected ? <Game /> : <Navigate to={RootLocation} />
  }
];

export default function Routes(): JSX.Element {
  const { isConnected } = useWallet();
  const routes = useRoutes(routeList(isConnected));
  return <div>{routes}</div>;
}
