import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/auth/LoginPage';
import { SignupPage } from '../pages/auth/SignupPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';
import { VerifyEmailPage } from '../pages/auth/VerifyEmailPage';
import { ProductsPage } from '../pages/products/ProductsPage';
import { ProductDetailPage } from '../pages/products/ProductDetailPage';
import { CartPage } from '../pages/cart/CartPage';
import { CheckoutPage } from '../pages/cart/CheckoutPage';
import { OrdersPage } from '../pages/orders/OrdersPage';

export interface Route {
  path: string;
  component: React.ComponentType;
  pattern?: RegExp;
}

export const routes: Route[] = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/forgot-password', component: ForgotPasswordPage },
  { path: '/reset-password', component: ResetPasswordPage },
  { path: '/verify-email', component: VerifyEmailPage },
  { path: '/products', component: ProductsPage },
  { path: '/products/:slug', component: ProductDetailPage, pattern: /^\/products\/[^/]+$/ },
  { path: '/cart', component: CartPage },
  { path: '/checkout', component: CheckoutPage },
  { path: '/orders', component: OrdersPage },
];

export function matchRoute(pathname: string): Route | undefined {
  return routes.find((route) => {
    if (route.pattern) {
      return route.pattern.test(pathname);
    }
    return route.path === pathname;
  });
}
