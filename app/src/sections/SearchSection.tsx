import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Badge } from '@/components/ui/badge';
import { navigateTo } from '@/hooks/useRouter';
import { composers, categories } from '@/data/mockData';
import type { ChoirType, DifficultyLevel } from '@/types';

const choirTypes: { value: ChoirType; label: string }[] = [
  { value: 'SATB', label: 'SATB (Mixto)' },
  { value: 'SSA', label: 'SSA (Femenino)' },
  { value: 'TTBB', label: 'TTBB (Masculino)' },
  { value: 'SSAA', label: 'SSAA' },
  { value: 'SAB', label: 'SAB' },
  { value: 'SA', label: 'SA' },
  { value: 'TB', label: 'TB' },
  { value: 'Unison', label: 'Unísono' },
];

const difficultyLevels: { value: DifficultyLevel; label: string }[] = [
  { value: 1, label: 'Muy Fácil' },
  { value: 2, label: 'Fácil' },
  { value: 3, label: 'Medio' },
  { value: 4, label: 'Difícil' },
  { value: 5, label: 'Muy Difícil' },
];

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{
    composer?: string;
    category?: string;
    choirType?: ChoirType;
    difficulty?: DifficultyLevel;
  }>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleSearch = () => {
    navigateTo('catalog');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const activeFiltersCount = Object.values(selectedFilters).filter(Boolean).length;

  return (
    <section className="py-12 bg-white">
      <div className="section-padding">
        <div className="container-wide mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Main Search */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar partituras, compositores, obras..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-border focus:border-basque-red focus:ring-basque-red/20"
                />
              </div>
              <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="relative px-4 lg:px-6 border-2 border-border hover:border-basque-red hover:text-basque-red"
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    <span className="hidden lg:inline ml-2">Filtros</span>
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
                    {/* Composer Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Compositor
                      </label>
                      <Select
                        value={selectedFilters.composer}
                        onValueChange={(value) =>
                          setSelectedFilters((prev) => ({ ...prev, composer: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todos los compositores" />
                        </SelectTrigger>
                        <SelectContent>
                          {composers.map((composer) => (
                            <SelectItem key={composer.id} value={composer.id}>
                              {composer.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Categoría
                      </label>
                      <Select
                        value={selectedFilters.category}
                        onValueChange={(value) =>
                          setSelectedFilters((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todas las categorías" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Choir Type Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Tipo de Coro
                      </label>
                      <Select
                        value={selectedFilters.choirType}
                        onValueChange={(value) =>
                          setSelectedFilters((prev) => ({ ...prev, choirType: value as ChoirType }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todos los tipos" />
                        </SelectTrigger>
                        <SelectContent>
                          {choirTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Dificultad
                      </label>
                      <Select
                        value={selectedFilters.difficulty?.toString()}
                        onValueChange={(value) =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            difficulty: parseInt(value) as DifficultyLevel,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todas las dificultades" />
                        </SelectTrigger>
                        <SelectContent>
                          {difficultyLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value.toString()}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 space-y-3">
                      <Button
                        className="w-full bg-basque-red hover:bg-basque-red/90"
                        onClick={() => {
                          handleSearch();
                          setIsFiltersOpen(false);
                        }}
                      >
                        Aplicar Filtros
                      </Button>
                      {activeFiltersCount > 0 && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={clearFilters}
                        >
                          Limpiar Filtros
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button
                size="lg"
                className="bg-basque-red hover:bg-basque-red/90 px-6 lg:px-8"
                onClick={handleSearch}
              >
                <span className="hidden lg:inline">Buscar</span>
                <Search className="w-5 h-5 lg:hidden" />
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-muted-foreground py-1">Popular:</span>
              {['SATB', 'Euskera', 'Navidad', 'Fácil'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    handleSearch();
                  }}
                  className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-basque-red/10 hover:text-basque-red transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
