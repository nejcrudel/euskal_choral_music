import { useState, useEffect } from 'react';
import { Menu, ShoppingCart, User, Search, Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { page: 'home' as const, label: 'Inicio' },
    { page: 'catalog' as const, label: 'Catálogo' },
    { page: 'composers' as const, label: 'Compositores' },
    { page: 'about' as const, label: 'Sobre Nosotros' },
    { page: 'contact' as const, label: 'Contacto' },
  ];

  const handleNavigate = (page: string) => {
    navigateTo(page as any);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-padding">
        <div className="container-wide mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button 
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-basque-red flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-white font-serif text-lg lg:text-xl font-bold">B</span>
              </div>
              <div className="hidden sm:block text-left">
                <span className="font-serif text-lg lg:text-xl font-semibold text-basque-slate">
                  Basque Choral
                </span>
                <span className="block text-xs text-muted-foreground -mt-1">
                  Music
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavigate(link.page)}
                  className="relative text-sm font-medium text-basque-slate hover:text-basque-red transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex text-basque-slate hover:text-basque-red hover:bg-basque-red/5"
                onClick={() => handleNavigate('catalog')}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Favorites */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex text-basque-slate hover:text-basque-red hover:bg-basque-red/5"
                onClick={() => handleNavigate('account')}
              >
                <Heart className="w-5 h-5" />
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-basque-slate hover:text-basque-red hover:bg-basque-red/5"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-basque-red text-white border-0">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* User */}
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex items-center gap-2 text-basque-slate hover:text-basque-red hover:bg-basque-red/5"
                  onClick={() => handleNavigate('account')}
                >
                  <User className="w-5 h-5" />
                  <span className="max-w-[100px] truncate">{user?.firstName}</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex items-center gap-2 text-basque-slate hover:text-basque-red hover:bg-basque-red/5"
                  onClick={() => handleNavigate('login')}
                >
                  <User className="w-5 h-5" />
                  <span>Entrar</span>
                </Button>
              )}

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-basque-slate"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-80 bg-white">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-serif text-xl font-semibold">
                        Menú
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <button
                          key={link.page}
                          onClick={() => handleNavigate(link.page)}
                          className="text-lg font-medium py-2 border-b border-border text-left text-basque-slate"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-auto pt-8 border-t border-border">
                      {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-basque-red/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-basque-red" />
                          </div>
                          <div>
                            <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          className="w-full bg-basque-red hover:bg-basque-red/90"
                          onClick={() => handleNavigate('login')}
                        >
                          Iniciar Sesión
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
