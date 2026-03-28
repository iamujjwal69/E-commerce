"use client"
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full py-3 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        style={{ backgroundColor: '#37475a' }}
      >
        Back to top
      </button>

      {/* Main footer */}
      <div style={{ backgroundColor: '#232f3e' }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/" className="hover:text-white hover:underline">About Amazon</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Careers</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Press Releases</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Amazon Science</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Connect with Us</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/" className="hover:text-white hover:underline">Facebook</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Twitter</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Instagram</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/" className="hover:text-white hover:underline">Sell on Amazon</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Sell under Amazon Accelerator</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Become an Affiliate</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Advertise Your Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/" className="hover:text-white hover:underline">COVID-19 and Amazon</Link></li>
              <li><Link href="/orders" className="hover:text-white hover:underline">Your Account</Link></li>
              <li><Link href="/orders" className="hover:text-white hover:underline">Your Orders</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Shipping Rates & Policies</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Returns & Replacements</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: '#131921' }} className="py-6 px-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="text-white text-xl font-bold tracking-tight">
            amazon<span style={{ color: '#ff9900' }}>.in</span>
          </span>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            <Link href="/" className="hover:text-white hover:underline">Conditions of Use & Sale</Link>
            <Link href="/" className="hover:text-white hover:underline">Privacy Notice</Link>
            <Link href="/" className="hover:text-white hover:underline">Interest-Based Ads Notice</Link>
          </div>
          <p className="text-xs text-gray-500">© 1996-2024, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
}
