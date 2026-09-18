'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const [bio, setBio] = useState('¡Bienvenidos a mi canal exclusivo en KREATOFANS!');
  const [price, setPrice] = useState('9.99');
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Perfil actualizado con éxito');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-2xl mx-auto pb-20">
      <div className="relative mb-16">
        <div className="h-32 w-full bg-gradient-to-r from-yellow-600 to-amber-700 rounded-b-2xl" />
        <div className="absolute -bottom-10 left-6 w-24 h-24 rounded-full border-4 border-black bg-zinc-800 flex items-center justify-center font-bold text-xl text-yellow-500">
          Foto
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Biografía del Creador</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1">Precio de Suscripción Mensual ($USD)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold rounded-lg hover:brightness-110 transition disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}
