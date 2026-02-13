import { useState } from 'react';
import { CartProvider } from '@/hooks/useCart';
import { AuthProvider } from '@/hooks/useAuth';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { Home } from '@/pages/Home';
import { Catalog } from '@/pages/Catalog';
import { ScoreDetail } from '@/pages/ScoreDetail';
import { Composers } from '@/pages/Composers';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Account } from '@/pages/Account';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { Checkout } from '@/pages/Checkout';
import './App.css';

export type Page = 
  | 'home' 
  | 'catalog' 
  | 'score' 
  | 'composers' 
  | 'login' 
  | 'register' 
  | 'account' 
  | 'about' 
  | 'contact' 
  | 'checkout';

interface AppState {
  page: Page;
  scoreSlug?: string;
  redirect?: string;
}

// Simple router context
export const RouterContext = {
  state: { page: 'home' as Page },
  navigate: (_page: Page, _params?: { slug?: string; redirect?: string }) => {},
};

function App() {
  const [routerState, setRouterState] = useState<AppState>({ page: 'home' });

  const navigate = (page: Page, params?: { slug?: string; redirect?: string }) => {
    setRouterState({ page, ...params });
    window.scrollTo(0, 0);
  };

  // Make navigate available globally for components
  (window as any).appNavigate = navigate;

  const renderPage = () => {
    switch (routerState.page) {
      case 'home':
        return <Home />;
      case 'catalog':
        return <Catalog />;
      case 'score':
        return <ScoreDetail />;
      case 'composers':
        return <Composers />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'account':
        return <Account />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'checkout':
        return <Checkout />;
      default:
        return <Home />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          {renderPage()}
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
