import { useState } from 'react';
import { User, ShoppingBag, Heart, Download, Settings, LogOut, ChevronRight, Music, Calendar, Check } from 'lucide-react';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import { scores } from '@/data/mockData';

// Mock purchase history
const mockPurchases = [
  {
    id: '1',
    orderNumber: 'BCM-2024-001',
    date: '2024-01-15',
    total: 35.00,
    items: [scores[0], scores[2]],
    status: 'completed',
  },
  {
    id: '2',
    orderNumber: 'BCM-2024-002',
    date: '2024-02-01',
    total: 18.00,
    items: [scores[1]],
    status: 'completed',
  },
];

export function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) {
    navigateTo('login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="section-padding">
          <div className="container-wide mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="font-serif text-3xl font-semibold">
                  Mi Cuenta
                </h1>
                <p className="text-muted-foreground">
                  Gestiona tus compras, descargas y preferencias
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-border p-6">
                  {/* User Info */}
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-basque-red/10 flex items-center justify-center mb-4">
                      <User className="w-10 h-10 text-basque-red" />
                    </div>
                    <h2 className="font-semibold">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === 'overview'
                          ? 'bg-basque-red/10 text-basque-red'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <User className="w-5 h-5" />
                      Resumen
                    </button>
                    <button
                      onClick={() => setActiveTab('purchases')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === 'purchases'
                          ? 'bg-basque-red/10 text-basque-red'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Mis Compras
                    </button>
                    <button
                      onClick={() => setActiveTab('downloads')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === 'downloads'
                          ? 'bg-basque-red/10 text-basque-red'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Download className="w-5 h-5" />
                      Descargas
                    </button>
                    <button
                      onClick={() => setActiveTab('favorites')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === 'favorites'
                          ? 'bg-basque-red/10 text-basque-red'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Heart className="w-5 h-5" />
                      Favoritos
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === 'settings'
                          ? 'bg-basque-red/10 text-basque-red'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Settings className="w-5 h-5" />
                      Configuración
                    </button>
                  </nav>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                {/* Overview */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Stats */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="bg-white rounded-xl border border-border p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-basque-red/10 flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-basque-red" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold">{mockPurchases.length}</p>
                            <p className="text-sm text-muted-foreground">Compras</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-border p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-basque-green/10 flex items-center justify-center">
                            <Download className="w-6 h-6 text-basque-green" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold">5</p>
                            <p className="text-sm text-muted-foreground">Descargas</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-border p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-basque-gold/10 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-basque-gold" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold">3</p>
                            <p className="text-sm text-muted-foreground">Favoritos</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Purchases */}
                    <div className="bg-white rounded-xl border border-border p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold">Compras Recientes</h3>
                        <button
                          onClick={() => setActiveTab('purchases')}
                          className="text-sm text-basque-red hover:underline"
                        >
                          Ver todas →
                        </button>
                      </div>
                      <div className="space-y-4">
                        {mockPurchases.slice(0, 2).map((purchase) => (
                          <div
                            key={purchase.id}
                            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{purchase.orderNumber}</p>
                              <p className="text-sm text-muted-foreground">
                                {purchase.items.length} {purchase.items.length === 1 ? 'artículo' : 'artículos'}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{purchase.total.toFixed(2)} €</p>
                              <p className="text-sm text-muted-foreground">{purchase.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Purchases */}
                {activeTab === 'purchases' && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h3 className="font-semibold mb-6">Historial de Compras</h3>
                    <div className="space-y-4">
                      {mockPurchases.map((purchase) => (
                        <div
                          key={purchase.id}
                          className="border border-border rounded-lg overflow-hidden"
                        >
                          <div className="flex items-center justify-between p-4 bg-muted/30">
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="font-medium">{purchase.orderNumber}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {purchase.date}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{purchase.total.toFixed(2)} €</p>
                              <Badge variant="secondary" className="text-xs">
                                Completado
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="space-y-3">
                              {purchase.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                                      <Music className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">{item.title}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {item.composer?.name}
                                      </p>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="outline">
                                    <Download className="w-4 h-4 mr-1" />
                                    Descargar
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Downloads */}
                {activeTab === 'downloads' && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h3 className="font-semibold mb-6">Mis Descargas</h3>
                    <div className="space-y-4">
                      {scores.slice(0, 5).map((score) => (
                        <div
                          key={score.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-16 rounded bg-muted flex items-center justify-center">
                              <Music className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{score.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {score.composer?.name}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Descargar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Favorites */}
                {activeTab === 'favorites' && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h3 className="font-semibold mb-6">Mis Favoritos</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {scores.slice(0, 4).map((score) => (
                        <button
                          key={score.id}
                          onClick={() => navigateTo('score', { slug: score.slug })}
                          className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-basque-red/30 transition-colors text-left"
                        >
                          <div className="w-12 h-16 rounded bg-muted flex items-center justify-center flex-shrink-0">
                            <Music className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{score.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {score.composer?.name}
                            </p>
                            <p className="text-sm text-basque-red mt-1">
                              {score.isFree ? 'Gratis' : `${score.price.toFixed(2)} €`}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Settings */}
                {activeTab === 'settings' && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h3 className="font-semibold mb-6">Configuración de Cuenta</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-4">Información Personal</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-muted-foreground">Nombre</label>
                            <p className="font-medium">{user?.firstName}</p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">Apellidos</label>
                            <p className="font-medium">{user?.lastName}</p>
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">Email</label>
                            <p className="font-medium">{user?.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border">
                        <h4 className="text-sm font-medium mb-4">Preferencias</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Newsletter</p>
                              <p className="text-sm text-muted-foreground">
                                Recibir novedades y ofertas por email
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="w-5 h-5 text-basque-green" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border">
                        <h4 className="text-sm font-medium mb-4 text-destructive">Zona de Peligro</h4>
                        <Button variant="destructive" size="sm">
                          Eliminar Cuenta
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
