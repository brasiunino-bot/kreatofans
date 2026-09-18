'use client';

import { useState } from 'react';
import FloatingSticker from '@/components/FloatingSticker';

export default function ProfilePage() {
  const [level] = useState('🔥 Popular (Próximo nivel: Famoso)');
  const [isWinner] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-2xl mx-auto pb-20">
      <div className="relative mb-6">
        <div className="h-32 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-t-xl" />
        <div className="absolute -bottom-10 left-4 w-20 h-20 rounded-full border-4 border-black bg-zinc-800 flex items-center justify-center text-2xl">
          👑
        </div>
      </div>

      <div className="mt-12 mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">@tu_usuario</h1>
          {isWinner && (
            <span className="bg-yellow-500 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full">
              🏆 GANADOR DEL MES
            </span>
          )}
        </div>
        <p className="text-xs text-yellow-400 font-semibold mt-1">Nivel: {level}</p>
      </div>

      <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold rounded-xl mb-4 text-sm">
        ⭐ Unirse a mi Club VIP ($9.99/mes)
      </button>

      <FloatingSticker stickerUrl="☁️✨" mode="flying" targetProfile="@muro_popular" />
      <FloatingSticker stickerUrl="🚶‍♂️🔥" mode="walking" targetProfile="@amigo_vip" />
    </div>
  );
}
