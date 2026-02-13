import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Music } from 'lucide-react';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';

export function Login() {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigateTo('account');
    } catch {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="max-w-md mx-auto">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-basque-red flex items-center justify-center mb-4">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h1 className="font-serif text-2xl font-semibold">
                  Bienvenido de nuevo
                </h1>
                <p className="text-muted-foreground mt-2">
                  Inicia sesión para acceder a tu cuenta
                </p>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl border border-border p-8 shadow-soft">
                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, rememberMe: checked as boolean })
                        }
                      />
                      <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                        Recordarme
                      </Label>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateTo('contact')}
                      className="text-sm text-basque-red hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-basque-red hover:bg-basque-red/90 py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Iniciando sesión...'
                    ) : (
                      <>
                        Iniciar Sesión
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    ¿No tienes cuenta?{' '}
                    <button
                      onClick={() => navigateTo('register')}
                      className="text-basque-red hover:underline font-medium"
                    >
                      Regístrate
                    </button>
                  </p>
                </div>
              </div>

              {/* Demo hint */}
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Demo: cualquier email y contraseña funcionan
                </p>
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
