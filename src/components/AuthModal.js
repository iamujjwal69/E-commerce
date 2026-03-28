"use client"
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, AlertCircle } from 'lucide-react';

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setError('');
    };
    window.addEventListener('auth:open', handleOpen);
    return () => window.removeEventListener('auth:open', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password, firstName, lastName);
      }
      setIsOpen(false);
      
      // Reset form
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    } catch (err) {
      setError(err?.response?.data?.error || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded w-full max-w-[400px] border border-gray-300 shadow-xl relative animate-fade-in relative pt-4 pb-6 px-6">
        
        {/* Header / Logo */}
        <div className="flex justify-center mb-4">
          <span className="text-black text-2xl font-bold leading-none tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            amazon<span style={{ color: '#ff9900' }}>.in</span>
          </span>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h1 className="text-[28px] font-medium leading-[1.2] pb-4 text-gray-900 border-b border-gray-200 mb-4">
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </h1>

        {error && (
          <div className="mb-4 border border-red-500 rounded p-4 flex gap-3 text-[#c40000]">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div className="text-[13px] font-medium leading-tight">
              <h4 className="font-bold text-sm mb-1">There was a problem</h4>
              {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {mode === 'register' && (
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-900">First name</label>
                <input 
                  type="text" required value={firstName} onChange={e => setFirstName(e.target.value)}
                  className="w-full h-8 px-2 border border-[#a6a6a6] rounded focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] focus:outline-none text-[13px]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-900">Last name</label>
                <input 
                  type="text" required value={lastName} onChange={e => setLastName(e.target.value)}
                  className="w-full h-8 px-2 border border-[#a6a6a6] rounded focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] focus:outline-none text-[13px]"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold text-gray-900">Email or mobile phone number</label>
            <input 
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full h-8 px-2 border border-[#a6a6a6] rounded focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] focus:outline-none text-[13px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-[13px] font-bold text-gray-900">Password</label>
              {mode === 'login' && <span className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Forgot Password</span>}
            </div>
            <input 
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder={mode === 'register' ? 'At least 6 characters' : ''}
              className="w-full h-8 px-2 border border-[#a6a6a6] rounded focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] focus:outline-none text-[13px]"
            />
            {mode === 'register' && <p className="text-[11px] text-gray-600">Passwords must be at least 6 characters.</p>}
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full h-[30px] rounded text-[13px] text-[#111] font-normal transition-all hover:bg-[#f3d078] active:bg-[#f0c14b]"
            style={{ 
              background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)', 
              borderColor: '#a88734 #9c7e31 #846a29', 
              borderWidth: 1, 
              borderStyle: 'solid',
              boxShadow: '0 1px 0 rgba(255,255,255,.4) inset' 
            }}
          >
            {loading ? 'Wait...' : 'Continue'}
          </button>
        </form>

        <p className="text-[12px] text-gray-900 mt-4 leading-tight">
          By continuing, you agree to Amazon's <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Privacy Notice</span>.
        </p>

        {mode === 'login' ? (
          <div className="mt-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="h-[1px] bg-gray-300 flex-1"></div>
              <span className="text-[12px] text-gray-600 px-2 leading-none">New to Amazon?</span>
              <div className="h-[1px] bg-gray-300 flex-1"></div>
            </div>
            <button 
              onClick={() => setMode('register')}
              className="w-full h-[30px] rounded text-[13px] text-[#111] font-normal transition-all bg-[#e7e9ec] hover:bg-[#d9dce1] active:bg-[#edfdff]"
              style={{
                borderColor: '#adb1b8 #a2a6ac #8d9096',
                borderStyle: 'solid',
                borderWidth: 1,
                boxShadow: '0 1px 0 rgba(255,255,255,.6) inset'
              }}
            >
              Create your Amazon account
            </button>
          </div>
        ) : (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-[13px] text-gray-900">
              Already have an account? <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer" onClick={() => setMode('login')}>Sign in</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
