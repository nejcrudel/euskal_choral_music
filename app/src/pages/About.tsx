import { Music, BookOpen, Users, Award, Globe, Heart } from 'lucide-react';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { CartDrawer } from '@/components/CartDrawer';

const values = [
  {
    icon: Music,
    title: 'Preservación',
    description: 'Trabajamos para preservar y difundir el patrimonio musical coral vasco para las futuras generaciones.',
  },
  {
    icon: BookOpen,
    title: 'Calidad',
    description: 'Todas nuestras partituras son revisadas y preparadas por profesionales para garantizar la máxima calidad.',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Conectamos coros de todo el mundo con la música vasca, creando una comunidad global de amantes del canto coral.',
  },
  {
    icon: Award,
    title: 'Excelencia',
    description: 'Seleccionamos cuidadosamente cada obra de nuestro catálogo, priorizando la excelencia musical.',
  },
  {
    icon: Globe,
    title: 'Accesibilidad',
    description: 'Hacemos que la música coral vasca sea accesible a cualquier coro, independientemente de su ubicación.',
  },
  {
    icon: Heart,
    title: 'Pasión',
    description: 'Nuestro trabajo nace de la pasión por la música coral y el deseo de compartirla con el mundo.',
  },
];

const stats = [
  { value: '500+', label: 'Partituras' },
  { value: '50+', label: 'Compositores' },
  { value: '10k+', label: 'Descargas' },
  { value: '100+', label: 'Coros' },
];

export function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <div className="section-padding mb-16">
          <div className="container-narrow mx-auto text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-basque-slate mb-6">
              Sobre Basque Choral Music
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Somos la plataforma líder en partituras corales vascas, dedicada a preservar 
              y difundir la rica tradición musical del País Vasco.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="section-padding mb-20">
          <div className="container-wide mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-semibold mb-6">
                  Nuestra Misión
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
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-basque-red/20 to-basque-green/20 flex items-center justify-center">
                  <Music className="w-32 h-32 text-basque-red/30" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl bg-basque-gold/20 -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="section-padding mb-20">
          <div className="container-wide mx-auto">
            <div className="bg-basque-slate rounded-2xl p-8 sm:p-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center text-white">
                    <div className="font-serif text-4xl sm:text-5xl font-semibold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="section-padding mb-20">
          <div className="container-wide mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-semibold mb-4">
                Nuestros Valores
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Los principios que guían nuestro trabajo día a día
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl border border-border hover:border-basque-red/30 hover:shadow-soft transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-basque-red/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-basque-red" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="section-padding">
          <div className="container-wide mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-semibold mb-4">
                Nuestro Equipo
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un grupo de apasionados por la música coral vasca
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { name: 'Ane Martínez', role: 'Directora Fundadora' },
                { name: 'Iñaki López', role: 'Director Musical' },
                { name: 'Miren García', role: 'Relaciones con Compositores' },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-muted mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
