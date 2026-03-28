// Server Component — awaits params, then renders Client Component
import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetail({ params }) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
