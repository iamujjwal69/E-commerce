"use client"
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { HeartCrack, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { user, isReady } = useAuth();

  if (!isReady) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded p-8 text-center">
          <HeartCrack className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Sign in to view your Wishlist</h2>
          <p className="text-gray-500 mb-4">You must be logged in to save and view wishlisted items.</p>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded p-8 text-center">
          <HeartCrack className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Your Wishlist is empty</h2>
          <p className="text-gray-500 mb-4">Explore items and click the heart icon to save them here.</p>
          <Link href="/" className="btn-amazon px-6 py-2 inline-block">Explore Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="bg-white border border-gray-200 rounded p-4">
        <h1 className="text-2xl font-medium text-gray-800 mb-2 pb-3 border-b border-gray-200">Your Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {wishlist.map((item) => (
            <div key={item.id} className="flex gap-4 border border-gray-200 rounded p-4">
              <div className="w-24 h-24 shrink-0 bg-white border border-gray-100 rounded flex items-center justify-center">
                <img src={item.main_image_url} alt={item.name} className="w-full h-full object-contain p-1" />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <Link href={`/product/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-[#c45500] hover:underline line-clamp-2 mb-1">
                  {item.name}
                </Link>
                <div className="text-lg font-bold text-gray-900 mb-2">
                  ₹{Number(item.price).toLocaleString('en-IN')}
                </div>
                
                <div className="mt-auto flex flex-col gap-2">
                  <button 
                    onClick={() => addItem(item.id, 1)}
                    className="text-xs bg-[#ffd814] hover:bg-[#f7ca00] text-black border border-[#fcd200] rounded py-1.5 px-3 font-medium text-center w-full shadow-sm"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => toggleWishlist(item.id)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded py-1.5 px-3 font-medium text-gray-700 flex items-center justify-center gap-1 w-full"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
