"use client";
import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle, User, Mail, MessageSquare } from 'lucide-react';
import { createMessage } from '@/app/actions';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const res = await createMessage(form);

    if (res.success) {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
      setError(res.error || 'เกิดข้อผิดพลาด ลองใหม่อีกครั้ง');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white/5 border border-green-500/30 rounded-3xl p-10 flex flex-col items-center text-center gap-4">
        <div className="p-4 bg-green-500/15 rounded-full text-green-400">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold text-white">ส่งข้อความเรียบร้อย</h3>
        <p className="text-gray-400 max-w-xs">ขอบคุณที่ติดต่อมา เดี๋ยวจะรีบตอบกลับโดยเร็วที่สุด</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
          ส่งอีกข้อความ
        </button>
      </div>
    );
  }

  const inputBase =
    'w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/40 transition-all';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-4"
    >
      <h3 className="text-xl font-bold text-white mb-2">ส่งข้อความถึงผม</h3>

      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input
          name="name"
          type="text"
          required
          placeholder="ชื่อของคุณ"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputBase}
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input
          name="email"
          type="email"
          required
          placeholder="อีเมล"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputBase}
        />
      </div>

      <div className="relative">
        <MessageSquare className="absolute left-4 top-4 text-gray-500" size={18} />
        <textarea
          name="message"
          required
          rows={4}
          placeholder="เล่าให้ฟังหน่อยว่าอยากทำอะไร..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputBase} resize-y min-h-[120px]`}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="animate-spin" size={18} /> กำลังส่ง...
          </>
        ) : (
          <>
            Send Message <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}
