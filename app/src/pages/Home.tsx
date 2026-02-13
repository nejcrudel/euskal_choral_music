import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { SearchSection } from '@/sections/SearchSection';
import { FeaturedScores } from '@/sections/FeaturedScores';
import { NewArrivals } from '@/sections/NewArrivals';
import { PopularScores } from '@/sections/PopularScores';
import { FeaturedComposers } from '@/sections/FeaturedComposers';
import { AboutSection } from '@/sections/AboutSection';
import { Footer } from '@/sections/Footer';
import { CartDrawer } from '@/components/CartDrawer';

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <SearchSection />
        <FeaturedScores />
        <NewArrivals />
        <PopularScores />
        <FeaturedComposers />
        <AboutSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
