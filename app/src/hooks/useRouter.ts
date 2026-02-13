import { useState, useEffect, useCallback } from 'react';
import type { Page } from '@/App';

interface RouterState {
  page: Page;
  slug?: string;
  redirect?: string;
}

export function useRouter() {
  const [state, setState] = useState<RouterState>({ page: 'home' });

  useEffect(() => {
    // Sync with global navigate function
    const checkNavigation = () => {
      const navState = (window as any).__routerState;
      if (navState && navState.page !== state.page) {
        setState(navState);
      }
    };
    
    const interval = setInterval(checkNavigation, 100);
    return () => clearInterval(interval);
  }, [state.page]);

  const navigate = useCallback((page: Page, params?: { slug?: string; redirect?: string }) => {
    const newState = { page, ...params };
    setState(newState);
    (window as any).__routerState = newState;
    window.scrollTo(0, 0);
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  return {
    page: state.page,
    slug: state.slug,
    redirect: state.redirect,
    navigate,
    goBack,
  };
}

// Simple link component replacement
export function navigateTo(page: Page, params?: { slug?: string; redirect?: string }) {
  const appNavigate = (window as any).appNavigate;
  if (appNavigate) {
    appNavigate(page, params);
  }
}
