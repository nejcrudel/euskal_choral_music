import { Heart, ShoppingCart, Eye, Music, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import type { Score } from '@/types';

interface ScoreCardProps {
  score: Score;
  variant?: 'default' | 'compact' | 'horizontal';
  onPreview?: (score: Score) => void;
}

export function ScoreCard({ score, variant = 'default', onPreview }: ScoreCardProps) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(score);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(score.id);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPreview?.(score);
  };

  const handleNavigate = () => {
    navigateTo('score', { slug: score.slug });
  };

  const difficultyLabels: Record<number, string> = {
    1: 'Muy Fácil',
    2: 'Fácil',
    3: 'Medio',
    4: 'Difícil',
    5: 'Muy Difícil',
  };

  const difficultyColors: Record<number, string> = {
    1: 'bg-green-100 text-green-700',
    2: 'bg-emerald-100 text-emerald-700',
    3: 'bg-yellow-100 text-yellow-700',
    4: 'bg-orange-100 text-orange-700',
    5: 'bg-red-100 text-red-700',
  };

  if (variant === 'horizontal') {
    return (
      <div
        onClick={handleNavigate}
        className="group flex gap-4 p-4 bg-white rounded-xl border border-border hover:border-basque-red/30 hover:shadow-soft transition-all duration-300 cursor-pointer"
      >
        {/* Cover */}
        <div className="relative w-24 h-32 sm:w-32 sm:h-40 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          {score.coverImageUrl ? (
            <img
              src={score.coverImageUrl}
              alt={score.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-basque-red/5">
              <Music className="w-8 h-8 text-basque-red/30" />
            </div>
          )}
          {score.isFree && (
            <Badge className="absolute top-2 left-2 bg-basque-green text-white border-0 text-xs">
              Gratis
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg font-semibold text-basque-slate group-hover:text-basque-red transition-colors line-clamp-1">
                {score.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {score.composer?.name}
              </p>
            </div>
            <button
              onClick={handleFavorite}
              className="flex-shrink-0 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite(score.id)
                    ? 'fill-basque-red text-basque-red'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              {score.choirType}
            </Badge>
            <Badge className={`text-xs ${difficultyColors[score.difficulty]}`}>
              {difficultyLabels[score.difficulty]}
            </Badge>
            {score.language && (
              <Badge variant="outline" className="text-xs">
                {score.language}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            {score.durationMinutes && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {score.durationMinutes}:{score.durationSeconds?.toString().padStart(2, '0') || '00'}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {score.downloadCount} descargas
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="font-serif text-xl font-semibold text-basque-slate">
              {score.isFree ? 'Gratis' : `${score.price.toFixed(2)} €`}
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handlePreview}
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button
                size="sm"
                className="bg-basque-red hover:bg-basque-red/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Añadir
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        onClick={handleNavigate}
        className="group block p-4 bg-white rounded-xl border border-border hover:border-basque-red/30 hover:shadow-soft transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-basque-red/10 flex items-center justify-center flex-shrink-0">
            <Music className="w-6 h-6 text-basque-red" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-basque-slate group-hover:text-basque-red transition-colors truncate">
              {score.title}
            </h4>
            <p className="text-sm text-muted-foreground truncate">
              {score.composer?.name}
            </p>
          </div>
          <span className="font-semibold text-basque-slate">
            {score.isFree ? 'Gratis' : `${score.price.toFixed(2)} €`}
          </span>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      onClick={handleNavigate}
      className="group block bg-white rounded-2xl border border-border overflow-hidden hover:border-basque-red/30 hover:shadow-soft-lg transition-all duration-500 card-hover cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {score.coverImageUrl ? (
          <img
            src={score.coverImageUrl}
            alt={score.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-basque-red/5 to-basque-green/5">
            <Music className="w-16 h-16 text-basque-red/20" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {score.isFree && (
            <Badge className="bg-basque-green text-white border-0">
              Gratis
            </Badge>
          )}
          {score.isFeatured && (
            <Badge className="bg-basque-gold text-basque-slate border-0">
              Destacado
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        {isAuthenticated && (
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite(score.id)
                  ? 'fill-basque-red text-basque-red'
                  : 'text-basque-slate'
              }`}
            />
          </button>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1 bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={handlePreview}
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-basque-red hover:bg-basque-red/90"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Añadir
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg font-semibold text-basque-slate group-hover:text-basque-red transition-colors line-clamp-1">
              {score.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {score.composer?.name}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <Badge variant="secondary" className="text-xs font-normal">
            {score.choirType}
          </Badge>
          <Badge className={`text-xs font-normal ${difficultyColors[score.difficulty]}`}>
            {difficultyLabels[score.difficulty]}
          </Badge>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {score.durationMinutes && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {score.durationMinutes}:{score.durationSeconds?.toString().padStart(2, '0') || '00'}
              </span>
            )}
          </div>
          <span className="font-serif text-xl font-semibold text-basque-red">
            {score.isFree ? 'Gratis' : `${score.price.toFixed(2)} €`}
          </span>
        </div>
      </div>
    </div>
  );
}
