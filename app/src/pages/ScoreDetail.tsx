import { useState } from 'react';
import { ArrowLeft, Heart, Share2, ShoppingCart, Eye, Clock, Users, BarChart3, Check, Music, Calendar, Globe, FileText } from 'lucide-react';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { PreviewModal } from '@/components/PreviewModal';
import { ScoreCard } from '@/components/ScoreCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { navigateTo } from '@/hooks/useRouter';
import { getScoreBySlug, getRelatedScores } from '@/data/mockData';
import type { Score } from '@/types';

export function ScoreDetail() {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [previewScore, setPreviewScore] = useState<Score | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // For demo, show the first score
  const score = getScoreBySlug('aurresku-guridi') || getScoreBySlug('asi-cantan-los-chicos');
  const relatedScores = score ? getRelatedScores(score.id, 4) : [];

  if (!score) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20 section-padding">
          <div className="container-wide mx-auto text-center">
            <h1 className="font-serif text-3xl font-semibold mb-4">
              Partitura no encontrada
            </h1>
            <p className="text-muted-foreground mb-6">
              La partitura que buscas no existe o ha sido eliminada.
            </p>
            <Button onClick={() => navigateTo('catalog')}>
              Volver al catálogo
            </Button>
          </div>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(score);
  };

  const handlePreview = () => {
    setPreviewScore(score);
    setIsPreviewOpen(true);
  };

  const handlePreviewRelated = (relatedScore: Score) => {
    setPreviewScore(relatedScore);
    setIsPreviewOpen(true);
  };

  const difficultyLabels: Record<number, string> = {
    1: 'Muy Fácil',
    2: 'Fácil',
    3: 'Medio',
    4: 'Difícil',
    5: 'Muy Difícil',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="section-padding mb-6">
          <div className="container-wide mx-auto">
            <button
              onClick={() => navigateTo('catalog')}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-basque-red transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="section-padding">
          <div className="container-wide mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Image */}
              <div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-soft-lg">
                  {score.coverImageUrl ? (
                    <img
                      src={score.coverImageUrl}
                      alt={score.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-basque-red/10 to-basque-green/10">
                      <Music className="w-32 h-32 text-basque-red/20" />
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {score.isFree && (
                      <Badge className="bg-basque-green text-white border-0 text-sm px-3 py-1">
                        Gratis
                      </Badge>
                    )}
                    {score.isFeatured && (
                      <Badge className="bg-basque-gold text-basque-slate border-0 text-sm px-3 py-1">
                        Destacado
                      </Badge>
                    )}
                  </div>

                  {/* Preview Button */}
                  <button
                    onClick={handlePreview}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full text-basque-slate font-medium">
                      <Eye className="w-5 h-5" />
                      Ver Preview
                    </div>
                  </button>
                </div>
              </div>

              {/* Right Column - Details */}
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-basque-slate">
                      {score.title}
                    </h1>
                    <button
                      onClick={() => navigateTo('composers')}
                      className="text-lg text-basque-red hover:underline mt-2 inline-block"
                    >
                      {score.composer?.name}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFavorite(score.id)}
                      className="p-3 rounded-full border border-border hover:border-basque-red hover:bg-basque-red/5 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite(score.id)
                            ? 'fill-basque-red text-basque-red'
                            : 'text-basque-slate'
                        }`}
                      />
                    </button>
                    <button className="p-3 rounded-full border border-border hover:border-basque-red hover:bg-basque-red/5 transition-colors">
                      <Share2 className="w-5 h-5 text-basque-slate" />
                    </button>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant="secondary">{score.choirType}</Badge>
                  <Badge className={
                    score.difficulty <= 2
                      ? 'bg-green-100 text-green-700'
                      : score.difficulty === 3
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }>
                    {difficultyLabels[score.difficulty]}
                  </Badge>
                  {score.language && (
                    <Badge variant="outline">{score.language}</Badge>
                  )}
                  {score.year && (
                    <Badge variant="outline">{score.year}</Badge>
                  )}
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-semibold text-basque-red">
                      {score.isFree ? 'Gratis' : `${score.price.toFixed(2)} €`}
                    </span>
                    {!score.isFree && (
                      <span className="text-muted-foreground">+ IVA</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {score.isFree 
                      ? 'Descarga gratuita con registro' 
                      : 'PDF con licencia personal incluida'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    size="lg"
                    className="flex-1 bg-basque-red hover:bg-basque-red/90 py-6 text-lg"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {score.isFree ? 'Añadir al Carrito' : 'Comprar Ahora'}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 py-6 text-lg"
                    onClick={handlePreview}
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Vista Previa
                  </Button>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-basque-green" />
                    <span>PDF de alta calidad listo para imprimir</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-basque-green" />
                    <span>Licencia personal con tu nombre</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-basque-green" />
                    <span>Descarga inmediata tras la compra</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-basque-green" />
                    <span>Re-descargas ilimitadas</span>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {score.durationMinutes && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Duración</p>
                        <p className="font-medium">
                          {score.durationMinutes}:{score.durationSeconds?.toString().padStart(2, '0') || '00'}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Users className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Descargas</p>
                      <p className="font-medium">{score.downloadCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Dificultad</p>
                      <p className="font-medium">{'★'.repeat(score.difficulty)}</p>
                    </div>
                  </div>
                  {score.year && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Año</p>
                        <p className="font-medium">{score.year}</p>
                      </div>
                    </div>
                  )}
                  {score.language && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Idioma</p>
                        <p className="font-medium">{score.language}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Páginas</p>
                      <p className="font-medium">{score.previewPages}+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-16">
              <Tabs defaultValue="description">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-basque-red data-[state=active]:bg-transparent py-3"
                  >
                    Descripción
                  </TabsTrigger>
                  <TabsTrigger
                    value="composer"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-basque-red data-[state=active]:bg-transparent py-3"
                  >
                    Sobre el Compositor
                  </TabsTrigger>
                  <TabsTrigger
                    value="license"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-basque-red data-[state=active]:bg-transparent py-3"
                  >
                    Licencia
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <div className="max-w-3xl">
                    <p className="text-lg leading-relaxed">
                      {score.description || 'No hay descripción disponible para esta obra.'}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="composer" className="mt-6">
                  <div className="max-w-3xl">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        {score.composer?.photoUrl ? (
                          <img
                            src={score.composer.photoUrl}
                            alt={score.composer.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Music className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold mb-2">
                          {score.composer?.name}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {score.composer?.biography || 'No hay biografía disponible.'}
                        </p>
                        <Button variant="link" className="mt-4 p-0" onClick={() => navigateTo('composers')}>
                          Ver todas sus obras →
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="license" className="mt-6">
                  <div className="max-w-3xl">
                    <h3 className="font-serif text-xl font-semibold mb-4">
                      Términos de Licencia
                    </h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Al adquirir esta partitura, obtienes una licencia personal de uso que incluye:
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Uso ilimitado para tu coro o institución</li>
                        <li>Derecho a interpretación pública</li>
                        <li>Posibilidad de grabación para uso interno</li>
                        <li>Adaptaciones para las necesidades de tu coro</li>
                      </ul>
                      <p className="font-medium text-basque-slate mt-4">Restricciones:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>No se permite la redistribución o venta</li>
                        <li>No se permite el uso comercial sin autorización</li>
                        <li>No se permite la publicación en internet</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Related Scores */}
            {relatedScores.length > 0 && (
              <div className="mt-20">
                <h2 className="font-serif text-2xl font-semibold mb-8">
                  Obras Relacionadas
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedScores.map((relatedScore) => (
                    <ScoreCard
                      key={relatedScore.id}
                      score={relatedScore}
                      onPreview={handlePreviewRelated}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <PreviewModal
        score={previewScore}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
