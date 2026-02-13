import { useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScoreCard } from '@/components/ScoreCard';
import { PreviewModal } from '@/components/PreviewModal';
import { navigateTo } from '@/hooks/useRouter';
import { getMostPopularScores } from '@/data/mockData';
import type { Score } from '@/types';

export function PopularScores() {
  const popularScores = getMostPopularScores(4);
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-basque-red/10 text-basque-red text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4" />
                Más Vendidas
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-basque-slate">
                Partituras Más Populares
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Las obras más descargadas por directores de coro de todo el mundo. Éxitos garantizados.
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
            {popularScores.map((score) => (
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
