import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Check, ShoppingBag, User } from 'lucide-react';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState<'information' | 'payment' | 'success'>('information');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isAuthenticated) {
    navigateTo('login');
    return null;
  }

  if (items.length === 0 && step !== 'success') {
    navigateTo('catalog');
    return null;
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('success');
    clearCart();
  };

  const totalWithTax = totalPrice * 1.21;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="section-padding">
          <div className="container-wide mx-auto">
            {/* Header */}
            <div className="mb-8">
              <button
                onClick={() => navigateTo('catalog')}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-basque-red transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Seguir comprando
              </button>
            </div>

            {step === 'success' ? (
              <div className="max-w-lg mx-auto text-center py-12">
                <div className="w-20 h-20 mx-auto rounded-full bg-basque-green/10 flex items-center justify-center mb-6">
                  <Check className="w-10 h-10 text-basque-green" />
                </div>
                <h1 className="font-serif text-3xl font-semibold mb-4">
                  ¡Compra completada!
                </h1>
                <p className="text-muted-foreground mb-8">
                  Gracias por tu compra. Recibirás un email con los enlaces de descarga 
                  y tu factura. También puedes acceder a tus partituras desde tu área de usuario.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-basque-red hover:bg-basque-red/90" onClick={() => navigateTo('account')}>
                    Ir a mi cuenta
                  </Button>
                  <Button variant="outline" onClick={() => navigateTo('catalog')}>
                    Seguir comprando
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Steps */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`flex items-center gap-2 ${step === 'information' ? 'text-basque-red' : 'text-muted-foreground'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'information' ? 'bg-basque-red text-white' : 'bg-muted'}`}>
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">Información</span>
                    </div>
                    <div className="flex-1 h-px bg-border" />
                    <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-basque-red' : 'text-muted-foreground'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-basque-red text-white' : 'bg-muted'}`}>
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">Pago</span>
                    </div>
                  </div>

                  {step === 'information' ? (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <h2 className="font-serif text-xl font-semibold mb-6">
                        Información de Contacto
                      </h2>
                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Nombre</Label>
                            <Input defaultValue={user?.firstName} />
                          </div>
                          <div className="space-y-2">
                            <Label>Apellidos</Label>
                            <Input defaultValue={user?.lastName} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" defaultValue={user?.email} />
                        </div>
                        <div className="space-y-2">
                          <Label>Teléfono</Label>
                          <Input type="tel" placeholder="+34 600 000 000" />
                        </div>
                      </div>

                      <div className="mt-8">
                        <h2 className="font-serif text-xl font-semibold mb-6">
                          Dirección de Facturación
                        </h2>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Dirección</Label>
                            <Input placeholder="Calle, número, piso..." />
                          </div>
                          <div className="grid sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Código Postal</Label>
                              <Input placeholder="48001" />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                              <Label>Ciudad</Label>
                              <Input placeholder="Bilbao" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>País</Label>
                            <Input defaultValue="España" />
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-8 bg-basque-red hover:bg-basque-red/90 py-6"
                        onClick={() => setStep('payment')}
                      >
                        Continuar al Pago
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <h2 className="font-serif text-xl font-semibold mb-6">
                        Método de Pago
                      </h2>

                      <div className="space-y-4">
                        <div className="p-4 border-2 border-basque-red rounded-lg bg-basque-red/5">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-basque-red" />
                            <span className="font-medium">Tarjeta de crédito/débito</span>
                          </div>
                        </div>

                        <div className="space-y-4 mt-6">
                          <div className="space-y-2">
                            <Label>Número de tarjeta</Label>
                            <Input placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Fecha de caducidad</Label>
                              <Input placeholder="MM/AA" />
                            </div>
                            <div className="space-y-2">
                              <Label>CVC</Label>
                              <Input placeholder="123" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Titular de la tarjeta</Label>
                            <Input placeholder="Nombre como aparece en la tarjeta" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                        <Lock className="w-4 h-4" />
                        <span>Pago seguro con encriptación SSL</span>
                      </div>

                      <div className="flex gap-4 mt-8">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setStep('information')}
                        >
                          Atrás
                        </Button>
                        <Button
                          className="flex-1 bg-basque-red hover:bg-basque-red/90 py-6"
                          onClick={handlePayment}
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Procesando...' : `Pagar ${totalWithTax.toFixed(2)} €`}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
                    <h2 className="font-serif text-xl font-semibold mb-6">
                      Resumen del Pedido
                    </h2>

                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.score.id} className="flex gap-4">
                          <div className="w-16 h-20 rounded bg-muted flex items-center justify-center flex-shrink-0">
                            <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.score.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.score.composer?.name}
                            </p>
                            <p className="text-sm text-basque-red mt-1">
                              {item.quantity} x {item.score.price.toFixed(2)} €
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{totalPrice.toFixed(2)} €</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">IVA (21%)</span>
                        <span>{(totalPrice * 0.21).toFixed(2)} €</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold text-lg pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-basque-red">{totalWithTax.toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
