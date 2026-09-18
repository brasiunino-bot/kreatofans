"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Profile = { id: string; username: string; display_name: string; bio: string | null; avatar_url: string | null; cover_url: string | null; external_link: string | null; country: string | null; };

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) { router.push("/login"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single();
      setProfile(data);
    }
    load();
  }, [router]);

  async function save() {
    if (!profile) return;
    setSaving(true);
    await supabase.from("profiles").update({ display_name: profile.display_name, bio: profile.bio, external_link: profile.external_link, country: profile.country }).eq("id", profile.id);
    setSaving(false);
  }

  async function logout() { await supabase.auth.signOut(); router.push("/"); }

  if (!profile) return (<main className="min-h-screen bg-[#0f0a1a] flex items-center justify-center"><p className="text-white/60">Cargando perfil...</p></main>);

  return (
    <main className="min-h-screen bg-[#0f0a1a] pb-10">
      <div className="h-40 bg-kf-gradient" />
      <div className="max-w-xl mx-auto px-4 -mt-12">
        <div className="w-24 h-24 rounded-full bg-white/10 border-4 border-[#0f0a1a] mb-3" />
        <div className="kf-card p-4">
          <label className="text-white/60 text-sm">Nombre visible</label>
          <input value={profile.display_name ?? ""} onChange={(e) => setProfile({ ...profile, display_name: e.target.value })} className="w-full mb-3 px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
          <label className="text-white/60 text-sm">Bio</label>
          <textarea value={profile.bio ?? ""} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="w-full mb-3 px-3 py-2 rounded-lg bg-white/10 text-white outline-none resize-none" rows={3} />
          <label className="text-white/60 text-sm">Link externo (Instagram, TikTok...)</label>
          <input value={profile.external_link ?? ""} onChange={(e) => setProfile({ ...profile, external_link: e.target.value })} className="w-full mb-3 px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
          <label className="text-white/60 text-sm">País</label>
          <input value={profile.country ?? ""} onChange={(e) => setProfile({ ...profile, country: e.target.value })} className="w-full mb-4 px-3 py-2 rounded-lg bg-white/10 text-white outline-none" />
          <button onClick={save} disabled={saving} className="kf-btn w-full mb-2">{saving ? "Guardando..." : "Guardar cambios"}</button>
          <button onClick={logout} className="w-full text-red-300 text-sm py-2">Cerrar sesión</button>
        </div>
      </div>
    </main>
  );
}
