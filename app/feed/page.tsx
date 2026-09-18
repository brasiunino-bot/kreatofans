'use client';

import { useState } from 'react';

export default function FeedPage() {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'JuanKreator',
      content: '¡Nuevo contenido exclusivo disponible para suscriptores!',
      isLocked: false,
      likes: 12,
    },
    {
      id: 2,
      author: 'JuanKreator',
      content: 'Contenido VIP bloqueado. Suscríbete para desbloquear.',
      isLocked: true,
      likes: 45,
    },
  ]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    setPosts([
      {
        id: Date.now(),
        author: 'JuanKreator',
        content: postText,
        isLocked: false,
        likes: 0,
      },
      ...posts,
    ]);
    setPostText('');
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-2xl mx-auto pb-20">
      <h1 className="text-2xl font-bold mb-6 text-yellow-500">Feed de Contenido</h1>

      {/* Creador de Publicaciones */}
      <form onSubmit={handleCreatePost} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 shadow-md">
        <textarea
          rows={3}
          placeholder="¿Qué quieres compartir con tus fans hoy?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
        />
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold rounded-lg hover:brightness-110 transition"
          >
            Publicar
          </button>
        </div>
      </form>

      {/* Lista de Publicaciones */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-500 font-bold flex items-center justify-center">
                {post.author[0]}
              </div>
              <div>
                <p className="font-bold text-sm">{post.author}</p>
                <p className="text-xs text-zinc-500">Hace un momento</p>
              </div>
            </div>

            {post.isLocked ? (
              <div className="bg-zinc-800/80 border border-zinc-700 rounded-lg p-6 text-center">
                <p className="text-zinc-400 mb-3">{post.content}</p>
                <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg text-sm">
                  Suscribirse para ver
                </button>
              </div>
            ) : (
              <p className="text-zinc-200 text-sm mb-3">{post.content}</p>
            )}

            <div className="flex items-center gap-2 text-xs text-zinc-400 mt-2">
              <span>❤️ {post.likes} Me gusta</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
