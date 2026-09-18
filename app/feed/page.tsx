'use client';

import { useState } from 'react';
import FloatingSticker from '@/components/FloatingSticker';

export default function FeedPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: '@sofi_kreator',
      badge: '👑 Famoso (Ganador del Mes)',
      content: '¡Nuevo set fotográfico disponible para suscriptores VIP! 🔥',
      isLocked: false,
      likes: 142,
      comments: ['¡Increíble fotos!', '¡El mejor contenido!'],
    },
    {
      id: 2,
      author: '@carlos_fit',
      badge: '🔥 Popular',
      content: 'Rutina exclusiva de piernas de esta semana 🏋️‍♂️',
      isLocked: true,
      likes: 88,
      comments: ['¿A qué hora subes la dieta?'],
    },
  ]);

  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});

  const handleAddComment = (postId: number) => {
    const text = newComment[postId];
    if (!text?.trim()) return;

    setPosts(
      posts.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, text] } : p
      )
    );
    setNewComment({ ...newComment, [postId]: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-2xl mx-auto pb-20">
      <h1 className="text-2xl font-bold mb-6 text-yellow-500">Feed Principal</h1>

      <FloatingSticker stickerUrl="🚀⭐" mode="flying" targetProfile="@creador_top" />

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold text-sm text-yellow-500">{post.author}</p>
              <span className="text-[10px] px-2 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 rounded-full">
                {post.badge}
              </span>
            </div>

            {post.isLocked ? (
              <div className="bg-zinc-800/80 border border-dashed border-yellow-500/50 rounded-lg p-6 text-center">
                <p className="text-sm font-semibold text-yellow-400 mb-2">🔒 Contenido Exclusivo VIP</p>
                <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg text-xs hover:brightness-110">
                  Unirse al Club para Desbloquear
                </button>
              </div>
            ) : (
              <p className="text-sm text-zinc-200 mb-3">{post.content}</p>
            )}

            {/* Comentarios */}
            <div className="mt-4 pt-3 border-t border-zinc-800">
              <p className="text-xs font-bold text-zinc-400 mb-2">Comentarios ({post.comments.length})</p>
              <div className="space-y-1 mb-3">
                {post.comments.map((c, i) => (
                  <p key={i} className="text-xs bg-zinc-800/50 p-2 rounded text-zinc-300">
                    {c}
                  </p>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escribe un comentario..."
                  value={newComment[post.id] || ''}
                  onChange={(e) =>
                    setNewComment({ ...newComment, [post.id]: e.target.value })
                  }
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 text-xs text-white focus:outline-none"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="px-3 py-1 bg-yellow-500 text-black font-bold text-xs rounded-lg"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
