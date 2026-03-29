"use client"
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { Loader2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-backend-production-ebd6.up.railway.app/api/v1';

const CATEGORIES = ['Electronics', 'Clothing & Fashion', 'Books', 'Home & Kitchen'];
const DEALS = [
  { title: "MacBook Air M2", subtitle: "from ₹1,14,900", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600", cat: "Electronics" },
  { title: "Sony WH-1000XM5", subtitle: "23% off — ₹26,990", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600", cat: "Electronics" },
  { title: "Atomic Habits", subtitle: "₹399 only", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600", cat: "Books" },
  { title: "Air Fryer", subtitle: "31% off today", img: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=600", cat: "Home & Kitchen" },
];

function HomeContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (category && category !== 'deals') params.set('category', category);
        const res = await axios.get(`${API_URL}/products?${params.toString()}`);
        setProducts(res.data.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, category]);

  const title = search
    ? `Results for "${search}"`
    : category
    ? category
    : 'All Products';

  return (
    <div>
      {/* Hero deals banner — only when no filter active */}
      {!search && !category && (
        <>
          {/* Hero image */}
          <div className="relative overflow-hidden" style={{ maxHeight: 350 }}>
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop"
              alt="Amazon deals banner"
              className="w-full object-cover"
              style={{ height: 350 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, #eaeded 100%)' }} />
          </div>

          {/* Deals grid */}
          <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {DEALS.map((deal) => (
                <div
                  key={deal.title}
                  onClick={() => window.location.href = `/?category=${encodeURIComponent(deal.cat)}`}
                  className="bg-white rounded p-3 shadow cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                >
                  <img src={deal.img} alt={deal.title} className="w-full h-28 object-cover rounded mb-2" />
                  <p className="text-sm font-bold text-gray-900 line-clamp-1">{deal.title}</p>
                  <p className="text-xs font-medium" style={{ color: '#B12704' }}>{deal.subtitle}</p>
                  <p className="text-xs mt-1" style={{ color: '#007185' }}>See all offers</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category quick links */}
          <div className="max-w-7xl mx-auto px-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <a
                  key={cat}
                  href={`/?category=${encodeURIComponent(cat)}`}
                  className="amazon-section hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{cat}</h3>
                  <p className="text-xs" style={{ color: '#007185' }}>Shop now →</p>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {(search || category) && (
          <div className="mb-4 py-3 border-b border-gray-300">
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-500">{products.length} results</p>
          </div>
        )}

        {!search && !category && (
          <h2 className="text-xl font-bold text-gray-900 mb-4">Best sellers across all departments</h2>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#f3a847' }} />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found.</p>
            <a href="/" className="amazon-link text-sm mt-2 inline-block">← Back to all products</a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" style={{ color: '#f3a847' }} /></div>}>
      <HomeContent />
    </Suspense>
  );
}
