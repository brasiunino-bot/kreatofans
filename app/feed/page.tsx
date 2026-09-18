"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PostCard from "@/components/PostCard";
import Link from "next/link";

type Post = { id: string; content: string; media_url: string | null; is_locked: boolean; price: number | null; author_username: string; created_at: string; };

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      setUserId(userData.user?.id ?? null);
      const { data } = await supabase.from("posts").select("id, content, media_url, is_locked, price, created_at, profiles(username)").order("created_at", { ascending: false }).limit(50);
      const mapped = (data ?? []).map((p: any) => ({ id: p.id, content: p.content, media_url: p.media_url, is_locked: p.is_locked, price: p.price, created_at: p.created_at, author_username: p.profiles?.username ?? "usuario" }));
      setPosts(mapped);
      setLoading(false);
    }
    load();
  }, []);

  async function publish() {
    if (!userId || !newPost.trim()) return;
    const { error } = await supabase.from("posts").insert({ author_id: userId, content: newPost.trim(), is_locked: false });
    if (!error) { setNewPost(""); location.reload(); }
  }

  return (
    <main className="min-h-screen bg-[#0f0a1a] pb-10">
      <header className="bg-kf-gradient px-4 py-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-white font-extrabold text-xl">KREATOFANS</h1>
        <Link href="/perfil" className="text-white text-sm bg-black/30 px-3 py-1.5 rounded-full">Mi perfil</Link>
      </header>
      <div className="max-w-xl mx-auto px-4 pt-4">
        {userId && (
          <div className="kf-card p-3 mb-4">
            <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="¿Qué quieres compartir con tus fans?" className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg p-3 outline-none resize-none" rows={3} />
            <button onClick={publish} className="kf-btn mt-2">Publicar</button>
          </div>
        )}
        {loading && <p className="text-white/60 text-center">Cargando muro...</p>}
        {!loading && posts.length === 0 && <p className="text-white/60 text-center">Aún no hay publicaciones. ¡Sé el primero!</p>}
        {posts.map((post) => (<PostCard key={post.id} post={post} userId={userId} />))}
      </div>
    </main>
  );
}
