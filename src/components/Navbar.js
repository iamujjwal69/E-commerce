"use client"
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, MapPin, Search, ChevronDown, Menu, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const NAV_LINKS = [
  { label: 'All', href: '/#all' },
  { label: "Today's Deals", href: '/?category=deals' },
  { label: 'Electronics', href: '/?category=Electronics' },
  { label: 'Clothing & Fashion', href: '/?category=Clothing+%26+Fashion' },
  { label: 'Books', href: '/?category=Books' },
  { label: 'Home & Kitchen', href: '/?category=Home+%26+Kitchen' },
  { label: 'Best Sellers', href: '/' },
  { label: 'New Releases', href: '/' },
  { label: 'Prime', href: '/?prime=true' },
];

export default function Navbar() {
  const { cart } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const router = useRouter();
  const itemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/');
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Row 1 */}
      <div style={{ backgroundColor: '#131921' }} className="flex items-center gap-2 px-3 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center border-2 border-transparent hover:border-white rounded px-1 py-1 shrink-0">
          <span className="text-white text-2xl font-bold leading-none tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            amazon<span style={{ color: '#ff9900' }}>.in</span>
          </span>
        </Link>

        {/* Delivery */}
        <div className="hidden md:flex flex-col border-2 border-transparent hover:border-white rounded px-1 py-1 cursor-pointer shrink-0">
          <span className="text-gray-400 text-xs">Deliver to</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">India</span>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex flex-1 min-w-0 mx-2">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Amazon.in"
            className="flex-1 px-3 py-2 text-sm text-black bg-white rounded-l-md outline-none w-full"
          />
          <button
            type="submit"
            className="amazon-search-btn px-4 py-2 rounded-r-md flex items-center"
          >
            <Search className="w-5 h-5 text-gray-800" />
          </button>
        </form>

        {/* Account */}
        <div className="hidden md:flex relative group border-2 border-transparent hover:border-white rounded px-2 py-1 cursor-pointer shrink-0">
          <div onClick={() => !user && openAuthModal()} className="flex flex-col">
            <span className="text-gray-300 text-xs">Hello, {user ? user.first_name : 'sign in'}</span>
            <div className="flex items-center gap-1">
              <span className="text-white font-bold text-sm">Account & Lists</span>
              <ChevronDown className="w-3 h-3 text-white" />
            </div>
          </div>
          
          {/* Simple Dropdown for logged in user */}
          {user && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block z-50">
              <div className="p-3 border-b border-gray-100 flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700 mb-2">
                  {user.first_name[0]}
                </div>
                <p className="text-sm font-bold text-gray-900">{user.first_name} {user.last_name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="py-1">
                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600">
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Returns */}
        <Link href="/orders" className="hidden md:flex flex-col border-2 border-transparent hover:border-white rounded px-2 py-1 shrink-0">
          <span className="text-gray-300 text-xs">Returns</span>
          <span className="text-white font-bold text-sm">& Orders</span>
        </Link>

        {/* Wishlist */}
        <Link href="/wishlist" className="hidden md:flex items-center gap-1 border-2 border-transparent hover:border-white rounded px-2 py-1 shrink-0 group">
          <Heart className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
          <span className="text-white font-bold text-sm">Wishlist</span>
        </Link>

        {/* Cart */}
        <Link href="/cart" className="relative flex items-end gap-1 border-2 border-transparent hover:border-white rounded px-2 py-1 shrink-0">
          <div className="relative">
            <ShoppingCart className="w-8 h-8 text-white" />
            {itemCount > 0 && (
              <span
                className="absolute -top-1 left-4 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#f3a847', color: '#111' }}
              >
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </div>
          <span className="text-white font-bold text-sm hidden sm:block">Cart</span>
        </Link>
      </div>

      {/* Row 2 — Category bar */}
      <div style={{ backgroundColor: '#232f3e' }} className="flex items-center gap-1 px-3 py-1 overflow-x-auto">
        <Link
          href="/"
          className="flex items-center gap-1 text-white text-sm px-2 py-1 rounded border-2 border-transparent hover:border-white whitespace-nowrap"
        >
          <Menu className="w-4 h-4" /> All
        </Link>
        {NAV_LINKS.slice(1).map(link => (
          <Link
            key={link.label}
            href={link.href}
            className="text-white text-sm px-2 py-1 rounded border-2 border-transparent hover:border-white whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
