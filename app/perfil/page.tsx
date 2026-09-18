'use client';

import { useState } from 'react';
import FloatingSticker from '@/components/FloatingSticker';

export default function ProfilePage() {
  const [bio, setBio] = useState('Creador de contenido exclusivo 🔥 | Fotos y videos cada semana');
  const [price, setPrice] = useState('9.99');

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-2xl mx-auto pb-20">
      <div className="relative mb-6">
        <div className="h-32 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-t-xl" />
        <div className="absolute -bottom-10 left-4 w-20 h-20 rounded-full border-4 border-black bg-zinc-800 flex items-center justify-center text-2xl">
          👑
        </div>
      </div>

      <div className="mt-12 mb-6">
        <h1 className="text-xl font-bold">@tu_usuario</h1>
        <p className="text-xs text-zinc-400 mt-1">Suscripción activa • USD ${price}/mes</p>
      </div>

      <FloatingSticker stickerUrl="☁️✨" mode="flying" targetProfile="@muro_popular" />
      <FloatingSticker stickerUrl="🚶‍♂️🔥" mode="walking" targetProfile="@amigo_vip" />

      <div className="space-y-4 bg-zinc-900 border border-zinc-800 p-4 rounded-xl mt-4">
        <h2 className="text-sm font-bold text-yellow-500">Configuración de Perfil</h2>
        <div>
          <label className="text-xs text-zinc-400 block mb-1">Biografía</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-xs text-white"
            rows={3}
          />
        </div>
        <div>
          <label className="text-xs text-zinc-400 block mb-1">Precio de Suscripción (USD)</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-xs text-white"
          />
        </div>
      </div>
    </div>
  );
}
