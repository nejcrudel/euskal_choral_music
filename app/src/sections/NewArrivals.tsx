import { useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScoreCard } from '@/components/ScoreCard';
import { PreviewModal } from '@/components/PreviewModal';
import { navigateTo } from '@/hooks/useRouter';
import { getNewestScores } from '@/data/mockData';
import type { Score } from '@/types';

export function NewArrivals() {
  const newestScores = getNewestScores(4);
  const [previewScore, setPreviewScore] = useState<Score | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (score: Score) => {
    setPreviewScore(score);
    setIsPreviewOpen(true);
  };

  return (
    <section className="py-20 bg-basque-cream/50">
      <div className="section-padding">
        <div className="container-wide mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-basque-green/10 text-basque-green text-sm font-medium mb-4">
                <Clock className="w-4 h-4" />
                Novedades
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-basque-slate">
                Últimas Partituras Añadidas
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Las obras más recientes de nuestros compositores. Actualizamos el catálogo regularmente.
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
            {newestScores.map((score) => (
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
