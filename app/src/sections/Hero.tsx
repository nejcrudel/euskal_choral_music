import { useEffect, useRef } from 'react';
import { ArrowRight, Music, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigateTo } from '@/hooks/useRouter';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      const elements = heroRef.current.querySelectorAll('.parallax');
      elements.forEach((el) => {
        (el as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-basque-cream via-white to-basque-cream"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-basque-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-basque-green/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-basque-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative Elements */}
      <div className="parallax absolute top-32 left-[10%] text-basque-red/10">
        <Music className="w-16 h-16 lg:w-24 lg:h-24" />
      </div>
      <div className="parallax absolute bottom-32 right-[15%] text-basque-green/10">
        <Users className="w-20 h-20 lg:w-32 lg:h-32" />
      </div>
      <div className="parallax absolute top-1/3 right-[20%] text-basque-gold/20">
        <BookOpen className="w-12 h-12 lg:w-16 lg:h-16" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding pt-32 pb-20">
        <div className="container-narrow mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-basque-red/10 text-basque-red text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-basque-red animate-pulse" />
            La mayor colección de partituras corales vascas
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-basque-slate leading-tight mb-6 animate-slide-up">
            Descubre la{' '}
            <span className="text-gradient">Música Coral</span>
            <br />
            del País Vasco
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Partituras digitales de los grandes compositores vascos. 
            Desde Guridi hasta Javier Busto, encuentra obras para todo tipo de coro.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              size="lg"
              className="bg-basque-red hover:bg-basque-red/90 text-white px-8 py-6 text-lg rounded-xl shadow-glow-red transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              onClick={() => navigateTo('catalog')}
            >
              Explorar Catálogo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-basque-slate/20 text-basque-slate hover:border-basque-red hover:text-basque-red px-8 py-6 text-lg rounded-xl transition-all duration-300"
              onClick={() => navigateTo('composers')}
            >
              Conocer Compositores
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="font-serif text-3xl lg:text-4xl font-semibold text-basque-red">
                500+
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Partituras
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl lg:text-4xl font-semibold text-basque-green">
                50+
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Compositores
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl lg:text-4xl font-semibold text-basque-gold">
                10k+
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Descargas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
