import Hero from '@/components/home/Hero';
import CategoriesPreview from '@/components/home/CategoriesPreview';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TrustSection from '@/components/home/TrustSection';
import BestSellers from '@/components/home/BestSellers';
import NewArrivals from '@/components/home/NewArrivals';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesPreview />
      <FeaturedProducts />
      <TrustSection />
      <BestSellers />
      <NewArrivals />
    </>
  );
}
