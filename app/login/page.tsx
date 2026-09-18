"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) { setError(loginError.message); setLoading(false); return; }
    router.push("/feed");
  }

  return (
    <main className="min-h-screen bg-kf-gradient flex items-center justify-center px-6">
      <form onSubmit={handleLogin} className="kf-card p-6 w-full max-w-sm backdrop-blur bg-black/40">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">Iniciar sesión</h1>
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full mb-3 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none" />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none" />
        {error && <p className="text-red-300 text-sm mb-3">{error}</p>}
        <button type="submit" disabled={loading} className="kf-btn w-full mb-3">{loading ? "Entrando..." : "Entrar"}</button>
        <p className="text-white/70 text-sm text-center">¿No tienes cuenta? <Link href="/register" className="text-kfOrange font-semibold">Regístrate</Link></p>
      </form>
    </main>
  );
}
