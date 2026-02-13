import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import type { Score } from '@/types';

interface PreviewModalProps {
  score: Score | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewModal({ score, isOpen, onClose }: PreviewModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const { addToCart } = useCart();

  if (!score) return null;

  const totalPages = score.previewPages || 3;
  const maxZoom = 150;
  const minZoom = 75;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleZoomIn = () => {
    if (zoom < maxZoom) setZoom(zoom + 25);
  };

  const handleZoomOut = () => {
    if (zoom > minZoom) setZoom(zoom - 25);
  };

  const handleAddToCart = () => {
    addToCart(score);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="font-serif text-xl">
                {score.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {score.composer?.name} • Vista previa ({totalPages} páginas)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-yellow-600 bg-yellow-100">
                <Lock className="w-3 h-3 mr-1" />
                Preview
              </Badge>
              <Button
                size="sm"
                className="bg-basque-red hover:bg-basque-red/90"
                onClick={handleAddToCart}
              >
                <Download className="w-4 h-4 mr-1" />
                {score.isFree ? 'Descargar Gratis' : `Comprar ${score.price.toFixed(2)} €`}
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-muted/30 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium px-3">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom === minZoom}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium w-16 text-center">
              {zoom}%
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom === maxZoom}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto bg-muted/50 p-8 flex items-center justify-center">
          <div
            className="relative bg-white shadow-2xl transition-transform duration-300"
            style={{
              width: `${zoom}%`,
              maxWidth: '800px',
              aspectRatio: '210/297',
            }}
          >
            {/* Mock Sheet Music */}
            <div className="absolute inset-0 p-8 flex flex-col">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-6xl font-bold text-gray-200 rotate-[-30deg] select-none">
                  PREVIEW
                </span>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl font-bold">{score.title}</h2>
                <p className="text-lg text-muted-foreground mt-1">{score.composer?.name}</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {score.choirType} • {score.year}
                </p>
              </div>

              {/* Mock Staff Lines */}
              <div className="space-y-8 flex-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    {/* Staff */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-6">{i + 1}</span>
                      <div className="flex-1 space-y-2">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="h-px bg-black/20" />
                        ))}
                      </div>
                    </div>
                    {/* Mock Notes */}
                    <div className="flex items-center gap-1 pl-8">
                      {[...Array(12)].map((_, k) => (
                        <div
                          key={k}
                          className="w-3 h-2 rounded-full bg-black/60"
                          style={{
                            transform: `translateY(${Math.sin(k * 0.8) * 8}px)`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-black/10 text-center text-xs text-muted-foreground">
                <p>Basque Choral Music • Vista previa • Página {currentPage}</p>
                <p className="mt-1">
                  Esta es una vista previa. Adquiere la partitura para obtener la versión completa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="px-6 py-4 border-t border-border bg-muted/30 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm">
              <span>
                <strong>Duración:</strong> {score.durationMinutes}:{score.durationSeconds?.toString().padStart(2, '0') || '00'}
              </span>
              <span>
                <strong>Dificultad:</strong> {'★'.repeat(score.difficulty)}{'☆'.repeat(5 - score.difficulty)}
              </span>
              <span>
                <strong>Idioma:</strong> {score.language}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              <X className="w-4 h-4 mr-1" />
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
