import { ArrowRight, BookOpen, Globe, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigateTo } from '@/hooks/useRouter';

const features = [
  {
    icon: BookOpen,
    title: 'Preservación',
    description: 'Trabajamos para preservar y difundir el patrimonio musical coral vasco para las futuras generaciones.',
  },
  {
    icon: Globe,
    title: 'Acceso Global',
    description: 'Descarga tus partituras desde cualquier lugar del mundo, instantáneamente.',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: 'Pagos protegidos y PDFs personalizados con tu información de licencia.',
  },
  {
    icon: Headphones,
    title: 'Soporte Personal',
    description: 'Equipo especializado para ayudarte a encontrar las obras perfectas.',
  },
];

export function AboutSection() {
  return (
    <section className="py-20 bg-basque-cream/50">
      <div className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-basque-red/10 text-basque-red text-sm font-medium mb-4">
                Sobre Nosotros
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-basque-slate mb-6">
                Preservando y Difundiendo la Música Coral Vasca
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Basque Choral Music nace de la pasión por la música coral y el deseo de 
                  hacer accesible el extraordinario patrimonio musical vasco a coros de todo 
                  el mundo.
                </p>
                <p>
                  Trabajamos directamente con compositores, herederos y editores para ofrecer 
                  partituras digitales de la más alta calidad, respetando siempre los derechos 
                  de propiedad intelectual.
                </p>
                <p>
                  Nuestro objetivo es convertirnos en la referencia mundial para la música 
                  coral vasca, conectando la tradición con la innovación y facilitando el 
                  acceso a estas obras maestras.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  className="bg-basque-red hover:bg-basque-red/90"
                  onClick={() => navigateTo('about')}
                >
                  Conoce Más
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-basque-slate/20 hover:border-basque-red hover:text-basque-red"
                  onClick={() => navigateTo('contact')}
                >
                  Contactar
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-2xl border border-border hover:border-basque-red/30 hover:shadow-soft transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-basque-red/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-basque-red" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-basque-slate mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
