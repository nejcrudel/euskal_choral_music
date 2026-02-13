import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, X } from 'lucide-react';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { ScoreCard } from '@/components/ScoreCard';
import { PreviewModal } from '@/components/PreviewModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { scores, composers, categories } from '@/data/mockData';
import type { Score, ChoirType, DifficultyLevel } from '@/types';

const sortOptions = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'popular', label: 'Más populares' },
  { value: 'name', label: 'Nombre A-Z' },
];

const choirTypes: { value: ChoirType; label: string }[] = [
  { value: 'SATB', label: 'SATB (Mixto)' },
  { value: 'SSA', label: 'SSA (Femenino)' },
  { value: 'TTBB', label: 'TTBB (Masculino)' },
  { value: 'SSAA', label: 'SSAA' },
  { value: 'SAB', label: 'SAB' },
  { value: 'SA', label: 'SA' },
  { value: 'TB', label: 'TB' },
  { value: 'Unison', label: 'Unísono' },
  { value: 'Other', label: 'Otro' },
];

const difficultyLevels: { value: DifficultyLevel; label: string }[] = [
  { value: 1, label: 'Muy Fácil' },
  { value: 2, label: 'Fácil' },
  { value: 3, label: 'Medio' },
  { value: 4, label: 'Difícil' },
  { value: 5, label: 'Muy Difícil' },
];

export function Catalog() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewScore, setPreviewScore] = useState<Score | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Local state for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComposer, setSelectedComposer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChoirType, setSelectedChoirType] = useState<ChoirType | ''>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | ''>('');
  const [selectedSort, setSelectedSort] = useState('newest');

  // Filter and sort scores
  const filteredScores = useMemo(() => {
    let result = [...scores];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (score) =>
          score.title.toLowerCase().includes(query) ||
          score.composer?.name.toLowerCase().includes(query) ||
          score.description?.toLowerCase().includes(query)
      );
    }

    // Composer filter
    if (selectedComposer) {
      result = result.filter((score) => score.composerId === selectedComposer);
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((score) => score.categoryId === selectedCategory);
    }

    // Choir type filter
    if (selectedChoirType) {
      result = result.filter((score) => score.choirType === selectedChoirType);
    }

    // Difficulty filter
    if (selectedDifficulty) {
      result = result.filter((score) => score.difficulty === selectedDifficulty);
    }

    // Sort
    switch (selectedSort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [searchQuery, selectedComposer, selectedCategory, selectedChoirType, selectedDifficulty, selectedSort]);

  const handlePreview = (score: Score) => {
    setPreviewScore(score);
    setIsPreviewOpen(true);
  };

  const activeFiltersCount = [
    selectedComposer,
    selectedCategory,
    selectedChoirType,
    selectedDifficulty,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedComposer('');
    setSelectedCategory('');
    setSelectedChoirType('');
    setSelectedDifficulty('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="section-padding mb-8">
          <div className="container-wide mx-auto">
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-basque-slate mb-4">
              Catálogo de Partituras
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Explora nuestra colección de partituras corales vascas. 
              Encuentra obras para todo tipo de coro y nivel de dificultad.
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="section-padding mb-8 sticky top-20 z-30 bg-background/95 backdrop-blur-sm py-4 border-y border-border">
          <div className="container-wide mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar partituras..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="relative">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filtros
                      {activeFiltersCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 bg-basque-red text-white border-0">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-96">
                    <SheetHeader>
                      <SheetTitle className="font-serif text-2xl">Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="mt-8 space-y-6">
                      {/* Composer */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Compositor</label>
                        <Select
                          value={selectedComposer}
                          onValueChange={setSelectedComposer}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Todos</SelectItem>
                            {composers.map((c) => (
                              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Category */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Categoría</label>
                        <Select
                          value={selectedCategory}
                          onValueChange={setSelectedCategory}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Todas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Todas</SelectItem>
                            {categories.map((c) => (
                              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Choir Type */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tipo de Coro</label>
                        <Select
                          value={selectedChoirType}
                          onValueChange={(v) => setSelectedChoirType(v as ChoirType)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Todos</SelectItem>
                            {choirTypes.map((t) => (
                              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Difficulty */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Dificultad</label>
                        <Select
                          value={selectedDifficulty?.toString()}
                          onValueChange={(v) => setSelectedDifficulty(v ? parseInt(v) as DifficultyLevel : '')}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Todas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Todas</SelectItem>
                            {difficultyLevels.map((d) => (
                              <SelectItem key={d.value} value={d.value.toString()}>{d.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 space-y-3">
                        <Button
                          className="w-full bg-basque-red hover:bg-basque-red/90"
                          onClick={() => setIsFiltersOpen(false)}
                        >
                          Aplicar Filtros
                        </Button>
                        {activeFiltersCount > 0 && (
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={clearAllFilters}
                          >
                            Limpiar Filtros
                          </Button>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-basque-red text-white' : 'hover:bg-muted'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-basque-red text-white' : 'hover:bg-muted'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-sm text-muted-foreground">Filtros activos:</span>
                {selectedComposer && (
                  <Badge variant="secondary" className="gap-1">
                    {composers.find((c) => c.id === selectedComposer)?.name}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedComposer('')} />
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="gap-1">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('')} />
                  </Badge>
                )}
                {selectedChoirType && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedChoirType}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedChoirType('')} />
                  </Badge>
                )}
                {selectedDifficulty && (
                  <Badge variant="secondary" className="gap-1">
                    Dif. {selectedDifficulty}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDifficulty('')} />
                  </Badge>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-basque-red hover:underline"
                >
                  Limpiar todo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="section-padding">
          <div className="container-wide mx-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredScores.length} {filteredScores.length === 1 ? 'resultado' : 'resultados'}
              </p>
            </div>

            {filteredScores.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-muted-foreground mb-6">
                  Intenta con otros términos de búsqueda o filtros diferentes.
                </p>
                <Button onClick={clearAllFilters} variant="outline">
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {filteredScores.map((score) => (
                  <ScoreCard
                    key={score.id}
                    score={score}
                    variant={viewMode === 'list' ? 'horizontal' : 'default'}
                    onPreview={handlePreview}
                  />
                ))}
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
