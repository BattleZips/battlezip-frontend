import { useWallet } from 'contexts/WalletContext';
import {
  ActiveGameLocationTemplate,
  JoinGameLocationTemplate,
  NewGameLocation,
  ResourcesLocation,
  RootLocation
} from 'Locations';
import { Navigate, useRoutes } from 'react-router-dom';
import BuildBoard from 'views/BuildBoardView';
import Game from 'views/Game';
import Home from 'views/Home';
import Resources from 'views/Resources';

const routeList = (isConnected: boolean) => [
  {
    path: RootLocation,
    element: <Home />
  },
  {
    path: ActiveGameLocationTemplate,
    element: isConnected ? <Game /> : <Navigate to={RootLocation} />
  },
  {
    path: JoinGameLocationTemplate,
    element: isConnected ? <BuildBoard /> : <Navigate to={RootLocation} />
  },
  {
    path: NewGameLocation,
    element: isConnected ? <BuildBoard /> : <Navigate to={RootLocation} />
  },
  {
    path: ResourcesLocation,
    element: <Resources />
  }
];

export default function Routes(): JSX.Element {
  const { isConnected, isConnecting } = useWallet();
  const routes = useRoutes(routeList(isConnected || isConnecting));
  return <div>{routes}</div>;
}
