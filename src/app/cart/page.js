"use client"
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingBag, ChevronRight } from 'lucide-react';

export default function Cart() {
  const { cart, updateItem, removeItem } = useCart();

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded p-8 text-center">
          <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Your Amazon Cart is empty</h2>
          <p className="text-gray-500 mb-4">Your shopping cart is waiting. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.</p>
          <Link href="/" className="btn-amazon px-6 py-2 inline-block">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Cart items */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded p-4">
            <h1 className="text-2xl font-medium text-gray-800 mb-2 pb-3 border-b border-gray-200">Shopping Cart</h1>
            <p className="text-right text-sm text-gray-500 mb-4">Price</p>

            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
                {/* Image */}
                <div className="w-28 h-28 shrink-0 bg-white border border-gray-100 rounded flex items-center justify-center">
                  <img
                    src={item.main_image_url || 'https://via.placeholder.com/150'}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.product_id}`} className="text-base amazon-link font-medium line-clamp-2">
                    {item.name}
                  </Link>
                  <p className="text-sm font-medium mt-1" style={{ color: '#007600' }}>In Stock</p>
                  <p className="text-xs text-gray-500 mt-1">prime FREE Delivery</p>

                  {/* Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 text-sm hover:bg-gray-100 border-r border-gray-300"
                      >-</button>
                      <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateItem(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-sm hover:bg-gray-100 border-l border-gray-300"
                      >+</button>
                    </div>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm hover:underline flex items-center gap-1"
                      style={{ color: '#007185' }}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                    <span className="text-gray-300">|</span>
                    <button className="text-sm hover:underline" style={{ color: '#007185' }}>Save for later</button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  <p className="font-bold text-base">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}

            <div className="text-right mt-4 text-base">
              Subtotal ({cart.items.reduce((a, b) => a + b.quantity, 0)} items):
              <span className="font-bold ml-1">₹{Number(cart.total).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Checkout panel */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded p-4 sticky top-20">
            <p className="text-sm font-medium text-green-700 mb-2">Your order is eligible for FREE Delivery.</p>
            <p className="text-base mb-4">
              Subtotal ({cart.items.reduce((a, b) => a + b.quantity, 0)} items):
              <span className="font-bold ml-1">₹{Number(cart.total).toLocaleString('en-IN')}</span>
            </p>
            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 rounded-full font-bold text-base py-3 px-6 w-full transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(to bottom, #f7ca55, #f0a500)',
                border: '1px solid #a07000',
                color: '#111',
                boxShadow: '0 4px 14px rgba(240,165,0,0.5), 0 1px 2px rgba(0,0,0,0.15)'
              }}
            >
              🛒 Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
