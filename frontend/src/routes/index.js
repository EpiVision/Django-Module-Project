import { useRoutes } from 'react-router-dom';

// routes
import { MainRoutes, HomePageRoute } from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([HomePageRoute, MainRoutes, AuthenticationRoutes]);
}
