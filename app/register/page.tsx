'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              username,
              email,
              role: 'creator',
              created_at: new Date(),
            },
          ]);

        if (profileError) console.warn('Nota perfil:', profileError.message);

        setMessage({
          type: 'success',
          text: '¡Cuenta creada con éxito! Ya puedes iniciar sesión.',
        });
      }
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'Ocurrió un error al registrar el usuario.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-500">Únete a KREATOFANS</h2>
        
        {message && (
          <div className={`p-3 rounded-lg mb-4 text-sm ${message.type === 'error' ? 'bg-red-900/50 text-red-200 border border-red-800' : 'bg-green-900/50 text-green-200 border border-green-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Nombre de usuario</label>
            <input
              type="text"
              required
              placeholder="ej. JuanKreator"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">Correo electrónico</label>
            <input
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">Contraseña</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black font-bold rounded-lg hover:brightness-110 transition disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
}
