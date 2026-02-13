import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Score, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (score: Score) => void;
  removeFromCart: (scoreId: string) => void;
  updateQuantity: (scoreId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((score: Score) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.score.id === score.id);
      if (existingItem) {
        return prev.map((item) =>
          item.score.id === score.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { score, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((scoreId: string) => {
    setItems((prev) => prev.filter((item) => item.score.id !== scoreId));
  }, []);

  const updateQuantity = useCallback((scoreId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(scoreId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.score.id === scoreId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.score.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
