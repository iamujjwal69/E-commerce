"use client"
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import StarRating from './StarRating';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const router = useRouter();
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  return (
    <div className="product-card bg-white p-3 flex flex-col h-full">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square mb-2 overflow-hidden bg-white">
        <img
          src={product.main_image_url || 'https://via.placeholder.com/300?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 p-2"
        />
        {/* Wishlist Heart */}
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:scale-110 transition-transform border border-gray-100"
        >
          <Heart className={`w-5 h-5 transition-colors ${isWishlisted(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-300 hover:text-red-500'}`} />
        </button>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm text-gray-800 line-clamp-2 hover:underline cursor-pointer leading-snug mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-1">
          <StarRating rating={parseFloat(product.rating)} reviewCount={product.review_count} />
        </div>

        {/* Prime */}
        {product.is_prime && (
          <div className="flex items-center gap-1 mb-1">
            <span className="prime-badge">prime</span>
            <span className="text-xs text-gray-500">FREE Delivery</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-lg font-bold text-gray-900">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
            {discount && (
              <span className="text-xs text-gray-500 line-through">
                ₹{Number(product.original_price).toLocaleString('en-IN')}
              </span>
            )}
            {discount && (
              <span className="text-xs font-medium" style={{ color: '#B12704' }}>-{discount}%</span>
            )}
          </div>
          <p className="text-xs text-gray-500">Incl. all taxes</p>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addItem(product.id, 1)}
          className="btn-amazon mt-2 w-full text-sm py-1.5 px-3 rounded-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
