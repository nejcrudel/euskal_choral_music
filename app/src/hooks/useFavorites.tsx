import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (scoreId: string) => void;
  removeFromFavorites: (scoreId: string) => void;
  isFavorite: (scoreId: string) => boolean;
  toggleFavorite: (scoreId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addToFavorites = useCallback((scoreId: string) => {
    setFavorites((prev) => [...prev, scoreId]);
  }, []);

  const removeFromFavorites = useCallback((scoreId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== scoreId));
  }, []);

  const isFavorite = useCallback((scoreId: string) => {
    return favorites.includes(scoreId);
  }, [favorites]);

  const toggleFavorite = useCallback((scoreId: string) => {
    if (isFavorite(scoreId)) {
      removeFromFavorites(scoreId);
    } else {
      addToFavorites(scoreId);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
