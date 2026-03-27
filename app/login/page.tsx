'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyLogin } from '@/app/actions';
import { Lock, User, ArrowRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await verifyLogin(formData);

    if (result.success) {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin');
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden font-sans">
      
      {}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {}
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            
            {}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">Admin</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Username</label>
                    <div className="relative group/input">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-blue-400 transition-colors" size={18} />
                        <input 
                            name="username"
                            type="text" 
                            required
                            placeholder="Enter username"
                            className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                {}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                    <div className="relative group/input">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-purple-400 transition-colors" size={18} />
                        <input 
                            name="password"
                            type="password" 
                            required
                            placeholder="••••••••"
                            className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                    </div>
                </div>

                {}
                {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-shake">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                {}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <>Access Dashboard <ArrowRight size={18} /></>}
                </button>
            </form>

            <div className="mt-8 text-center">
                <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                    ← Back to Website
                </Link>
            </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
}