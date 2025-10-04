import { useEffect, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { matchRoute } from './lib/router';

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => matchRoute(window.location.pathname));

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentRoute(matchRoute(window.location.pathname));
    };

    window.addEventListener('popstate', handleNavigation);

    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handleNavigation();
    };

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.history.pushState = originalPushState;
    };
  }, []);

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const path = anchor.href.replace(window.location.origin, '');
        window.history.pushState({}, '', path);
        setCurrentRoute(matchRoute(path));
      }
    });
  }, []);

  const Component = currentRoute?.component || (() => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-4">Page not found</p>
        <a href="/" className="text-blue-600 hover:text-blue-700">
          Go back home
        </a>
      </div>
    </div>
  ));

  return (
    <AuthProvider>
      <CartProvider>
        <Component />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
