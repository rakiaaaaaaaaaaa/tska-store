import Hero from '@/app/components/home/Hero';
import CategoryRow from '@/app/components/home/CategoryRow';
import FeaturedProducts from '@/app/components/home/FeaturedProducts';
import InstagramFeed from '@/app/components/home/InstagramFeed';
import Newsletter from '@/app/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryRow />
      <FeaturedProducts />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
