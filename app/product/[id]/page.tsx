import { readStoreFile } from '@/lib/store-db';
import ProductDetail from '@/app/components/product/ProductDetail';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { products } = await readStoreFile();
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
