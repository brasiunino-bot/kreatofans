import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-kf-gradient px-6 text-center">
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-3">KREATOFANS</h1>
      <p className="text-white/90 max-w-md mb-10">
        La plataforma donde los creadores comparten, venden y conectan con sus fans en todo el mundo.
      </p>
      <div className="flex gap-4">
        <Link href="/register" className="bg-white text-kfPurple font-bold px-6 py-3 rounded-xl shadow-lg">Crear cuenta</Link>
        <Link href="/login" className="bg-black/30 text-white font-bold px-6 py-3 rounded-xl border border-white/40">Iniciar sesión</Link>
      </div>
    </main>
  );
}
