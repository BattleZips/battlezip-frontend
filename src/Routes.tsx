import { GameLocation, RootLocation } from 'Locations';
import { useRoutes } from 'react-router-dom';
import Game from 'views/Game';
import Home from 'views/Home';

const routeList = [
  {
    path: RootLocation,
    element: <Home />
  },
  {
    path: GameLocation,
    element: <Game />
  }
];

export default function Routes(): JSX.Element {
  const routes = useRoutes(routeList);
  return <div>{routes}</div>;
}
