import { Music, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigateTo } from '@/hooks/useRouter';
import { getFeaturedComposers, getScoresByComposer } from '@/data/mockData';

export function FeaturedComposers() {
  const featuredComposers = getFeaturedComposers();

  return (
    <section className="py-20 bg-basque-slate text-white">
      <div className="section-padding">
        <div className="container-wide mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
                <Music className="w-4 h-4" />
                Maestros
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
                Compositores Destacados
              </h2>
              <p className="text-white/70 mt-2 max-w-lg">
                Conoce a los maestros que han dado forma a la música coral vasca. 
                Desde los pioneros del siglo XX hasta los compositores contemporáneos.
              </p>
            </div>
            <Button
              variant="outline"
              className="self-start sm:self-auto border-white/20 text-white hover:bg-white/10 hover:text-white"
              onClick={() => navigateTo('composers')}
            >
              Ver Todos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Composers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredComposers.map((composer) => {
              const scoresCount = getScoresByComposer(composer.id).length;
              
              return (
                <button
                  key={composer.id}
                  onClick={() => navigateTo('composers')}
                  className="group block text-center"
                >
                  <div className="relative mb-4">
                    {/* Avatar */}
                    <div className="w-32 h-32 mx-auto rounded-full border-4 border-white/10 group-hover:border-basque-red transition-colors duration-300 overflow-hidden">
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
                    
                    {/* Scores Count Badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-basque-red text-white text-sm font-medium">
                      {scoresCount} obras
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-lg font-semibold group-hover:text-basque-red transition-colors">
                    {composer.name}
                  </h3>
                  
                  {composer.birthYear && (
                    <p className="text-sm text-white/60 mt-1">
                      {composer.birthYear}
                      {composer.deathYear ? ` - ${composer.deathYear}` : ''}
                    </p>
                  )}
                  
                  {composer.birthplace && (
                    <p className="flex items-center justify-center gap-1 text-xs text-white/40 mt-1">
                      <MapPin className="w-3 h-3" />
                      {composer.birthplace}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quote */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <blockquote className="font-serif text-xl sm:text-2xl italic text-white/80">
              "La música coral vasca es el alma de nuestro pueblo, expresada en armonía y unión."
            </blockquote>
            <cite className="block mt-4 text-white/60 not-italic">
              — Jesús Guridi
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
