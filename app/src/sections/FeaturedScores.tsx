import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScoreCard } from '@/components/ScoreCard';
import { PreviewModal } from '@/components/PreviewModal';
import { navigateTo } from '@/hooks/useRouter';
import { getFeaturedScores } from '@/data/mockData';
import type { Score } from '@/types';

export function FeaturedScores() {
  const featuredScores = getFeaturedScores();
  const [previewScore, setPreviewScore] = useState<Score | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (score: Score) => {
    setPreviewScore(score);
    setIsPreviewOpen(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="section-padding">
        <div className="container-wide mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-basque-gold/10 text-basque-gold text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Destacadas
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-basque-slate">
                Partituras Destacadas
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Nuestra selección de obras maestras de la música coral vasca, elegidas por su calidad y popularidad.
              </p>
            </div>
            <Button
              variant="outline"
              className="self-start sm:self-auto border-basque-slate/20 hover:border-basque-red hover:text-basque-red"
              onClick={() => navigateTo('catalog')}
            >
              Ver Todas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredScores.slice(0, 4).map((score) => (
              <ScoreCard
                key={score.id}
                score={score}
                onPreview={handlePreview}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        score={previewScore}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </section>
  );
}
