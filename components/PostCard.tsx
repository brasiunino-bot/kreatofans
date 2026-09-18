"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const REACTIONS = [
  { key: "me_gusta", emoji: "👍", label: "Me gusta" },
  { key: "me_interesa", emoji: "👀", label: "Me interesa" },
  { key: "soy_fan", emoji: "⭐", label: "Soy fan" },
  { key: "me_molesta", emoji: "😠", label: "Me molesta" },
  { key: "no_me_gusta", emoji: "👎", label: "No me gusta" },
];

type Post = { id: string; content: string; media_url: string | null; is_locked: boolean; price: number | null; author_username: string; created_at: string; };

export default function PostCard({ post, userId }: { post: Post; userId: string | null }) {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  async function react(reactionKey: string) {
    if (!userId) return;
    setSelectedReaction(reactionKey);
    setShowReactions(false);
    await supabase.from("reactions").upsert({ post_id: post.id, user_id: userId, reaction_type: reactionKey }, { onConflict: "post_id,user_id" });
  }

  async function sendComment() {
    if (!userId || !comment.trim()) return;
    await supabase.from("comments").insert({ post_id: post.id, user_id: userId, content: comment.trim() });
    setComment("");
  }

  return (
    <div className="kf-card p-4 mb-4">
      <p className="text-white/60 text-sm mb-2">@{post.author_username}</p>
      {post.is_locked ? (
        <div className="bg-black/50 rounded-lg p-6 text-center mb-3">
          <p className="text-white mb-2">🔒 Contenido bloqueado</p>
          <p className="text-white/60 text-sm mb-3">Desbloquéalo por {post.price ? `$${post.price}` : "un pago único"}</p>
          <button className="kf-btn">Desbloquear</button>
        </div>
      ) : (
        <>
          {post.media_url && <img src={post.media_url} alt="contenido" className="rounded-lg mb-3 w-full object-cover max-h-96" />}
          <p className="text-white mb-3">{post.content}</p>
        </>
      )}
      <div className="flex items-center gap-3 relative">
        <button onClick={() => setShowReactions((s) => !s)} className="bg-white/10 text-white px-3 py-1.5 rounded-full text-sm">
          {selectedReaction ? REACTIONS.find((r) => r.key === selectedReaction)?.emoji : "＋ Reaccionar"}
        </button>
        <button onClick={() => setShowComments((s) => !s)} className="bg-white/10 text-white px-3 py-1.5 rounded-full text-sm">💬 Comentar</button>
        {showReactions && (
          <div className="absolute bottom-10 left-0 kf-card p-2 flex gap-2 bg-black/80 z-10">
            {REACTIONS.map((r) => (
              <button key={r.key} onClick={() => react(r.key)} title={r.label} className="text-2xl hover:scale-125 transition">{r.emoji}</button>
            ))}
          </div>
        )}
      </div>
      {showComments && (
        <div className="mt-3 border-t border-white/10 pt-3">
          <div className="flex gap-2">
            <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Escribe un comentario..." className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none text-sm" />
            <button onClick={sendComment} className="kf-btn text-sm px-4">Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
}
