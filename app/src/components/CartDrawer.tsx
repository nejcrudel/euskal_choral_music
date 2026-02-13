import { ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    setIsCartOpen(false);
    if (isAuthenticated) {
      navigateTo('checkout');
    } else {
      navigateTo('login');
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="px-1">
          <SheetTitle className="font-serif text-2xl flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Tu Carrito
            {totalItems > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-muted-foreground mb-6">
              Explora nuestro catálogo y encuentra las partituras perfectas para tu coro.
            </p>
            <Button
              className="bg-basque-red hover:bg-basque-red/90"
              onClick={() => {
                setIsCartOpen(false);
                navigateTo('catalog');
              }}
            >
              Explorar Catálogo
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={item.score.id}
                    className="flex gap-4 p-4 bg-muted/50 rounded-xl"
                  >
                    {/* Cover */}
                    <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      {item.score.coverImageUrl ? (
                        <img
                          src={item.score.coverImageUrl}
                          alt={item.score.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-basque-red/10">
                          <span className="font-serif text-lg font-bold text-basque-red">
                            {item.score.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <button
                            onClick={() => {
                              setIsCartOpen(false);
                              navigateTo('score', { slug: item.score.slug });
                            }}
                            className="font-medium text-basque-slate hover:text-basque-red transition-colors line-clamp-1 text-left"
                          >
                            {item.score.title}
                          </button>
                          <p className="text-sm text-muted-foreground">
                            {item.score.composer?.name}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.score.id)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-background">
                          {item.score.choirType}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.score.id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.score.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-semibold">
                          {(item.score.price * item.quantity).toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="flex-col gap-4 border-t border-border pt-4">
              {/* Summary */}
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">IVA (21%)</span>
                  <span>{(totalPrice * 0.21).toFixed(2)} €</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-serif text-2xl font-semibold text-basque-red">
                    {(totalPrice * 1.21).toFixed(2)} €
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="w-full space-y-2">
                <Button
                  className="w-full bg-basque-red hover:bg-basque-red/90 py-6 text-lg"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('catalog');
                    }}
                  >
                    Seguir Comprando
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={clearCart}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
