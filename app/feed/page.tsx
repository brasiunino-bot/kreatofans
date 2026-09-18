'use client';

import { useState } from 'react';
import FloatingSticker from '@/components/FloatingSticker';

export default function FeedPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: '@sofi_kreator',
      content: '¡Nuevo set fotográfico disponible para suscriptores VIP! 🔥',
      isLocked: false,
      likes: 42,
    },
    {
      id: 2,
      author: '@carlos_fit',
      content: 'Rutina exclusiva de piernas + plan alimenticio de esta semana 🏋️‍♂️',
      isLocked: true,
      likes: 128,
    },
  ]);

  const toggleLike = (id: number) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-2xl mx-auto pb-20">
      <h1 className="text-2xl font-bold mb-6 text-yellow-500">Feed Principal</h1>

      <FloatingSticker stickerUrl="🚀⭐" mode="flying" targetProfile="@creador_top" />

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="font-bold text-sm text-yellow-500 mb-2">{post.author}</p>
            {post.isLocked ? (
              <div className="bg-zinc-800/80 border border-dashed border-yellow-500/50 rounded-lg p-6 text-center">
                <p className="text-sm font-semibold text-yellow-400 mb-2">🔒 Contenido Exclusivo VIP</p>
                <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg text-xs hover:brightness-110">
                  Desbloquear con Suscripción
                </button>
              </div>
            ) : (
              <p className="text-sm text-zinc-200 mb-3">{post.content}</p>
            )}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-800 text-xs text-zinc-400">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-1 hover:text-yellow-500"
              >
                ❤️ {post.likes} Me gusta
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
