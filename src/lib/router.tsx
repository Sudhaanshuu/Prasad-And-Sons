import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/auth/LoginPage';
import { SignupPage } from '../pages/auth/SignupPage';

export interface Route {
  path: string;
  component: React.ComponentType;
}

export const routes: Route[] = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
];

export function matchRoute(pathname: string): Route | undefined {
  return routes.find((route) => route.path === pathname);
}
