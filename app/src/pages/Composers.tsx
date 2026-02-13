import { Music, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { navigateTo } from '@/hooks/useRouter';
import { composers, getScoresByComposer } from '@/data/mockData';

export function Composers() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="section-padding mb-12">
          <div className="container-wide mx-auto">
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-basque-slate mb-4">
              Compositores Vascos
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Descubre a los maestros que han dado forma a la música coral vasca. 
              Desde los pioneros del siglo XX hasta los compositores contemporáneos.
            </p>
          </div>
        </div>

        {/* Composers Grid */}
        <div className="section-padding">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {composers.map((composer) => {
                const scoresCount = getScoresByComposer(composer.id).length;
                
                return (
                  <button
                    key={composer.id}
                    onClick={() => navigateTo('catalog')}
                    className="group block text-left bg-white rounded-2xl border border-border overflow-hidden hover:border-basque-red/30 hover:shadow-soft-lg transition-all duration-500"
                  >
                    {/* Header with Photo */}
                    <div className="relative h-48 bg-gradient-to-br from-basque-red/10 to-basque-green/10">
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                          {composer.photoUrl ? (
                            <img
                              src={composer.photoUrl}
                              alt={composer.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <Music className="w-12 h-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-20 pb-8 px-6 text-center">
                      <h2 className="font-serif text-2xl font-semibold text-basque-slate group-hover:text-basque-red transition-colors">
                        {composer.name}
                      </h2>

                      <div className="flex items-center justify-center gap-4 mt-3 text-sm text-muted-foreground">
                        {composer.birthYear && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {composer.birthYear}
                            {composer.deathYear ? ` - ${composer.deathYear}` : ''}
                          </span>
                        )}
                      </div>

                      {composer.birthplace && (
                        <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4" />
                          {composer.birthplace}
                        </p>
                      )}

                      {composer.biography && (
                        <p className="text-muted-foreground mt-4 line-clamp-3">
                          {composer.biography}
                        </p>
                      )}

                      <div className="mt-6 flex items-center justify-center gap-4">
                        <span className="px-4 py-2 rounded-full bg-basque-red/10 text-basque-red text-sm font-medium">
                          {scoresCount} {scoresCount === 1 ? 'obra' : 'obras'}
                        </span>
                        <span className="text-basque-red text-sm font-medium group-hover:underline">
                          Ver obras →
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="section-padding mt-16">
          <div className="container-wide mx-auto">
            <div className="bg-basque-slate rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-4">
                ¿Eres compositor?
              </h2>
              <p className="text-white/70 max-w-xl mx-auto mb-6">
                Si eres compositor vasco y quieres formar parte de nuestra plataforma, 
                nos encantaría conocerte y colaborar contigo.
              </p>
              <Button
                className="bg-basque-red hover:bg-basque-red/90"
                onClick={() => navigateTo('contact')}
              >
                Contactar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
