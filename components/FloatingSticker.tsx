'use client';

import { useState } from 'react';

interface FloatingStickerProps {
  stickerUrl?: string;
  mode?: 'flying' | 'walking';
  targetProfile?: string;
}

export default function FloatingSticker({
  stickerUrl = '⭐',
  mode = 'flying',
  targetProfile = '@creador_vip',
}: FloatingStickerProps) {
  const [active, setActive] = useState(false);

  const triggerAnimation = () => {
    setActive(true);
    setTimeout(() => setActive(false), 4000);
  };

  return (
    <div className="my-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-zinc-400">Etiquetar sticker en otro muro</span>
        <button
          onClick={triggerAnimation}
          className="px-3 py-1 bg-yellow-500 text-black font-bold rounded-md text-xs hover:brightness-110"
        >
          Enviar Sticker a {targetProfile}
        </button>
      </div>

      {active && (
        <div
          className={`absolute top-2 left-0 text-3xl pointer-events-none ${
            mode === 'flying' ? 'animate-fly' : 'animate-walk'
          }`}
        >
          {stickerUrl}
        </div>
      )}

      <style jsx>{`
        @keyframes fly {
          0% {
            transform: translateX(0px) translateY(0px) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translateX(150px) translateY(-20px) scale(1.3);
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(0px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes walk {
          0% {
            transform: translateX(0px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateX(280px);
            opacity: 0;
          }
        }

        .animate-fly {
          animation: fly 3.5s ease-in-out forwards;
        }

        .animate-walk {
          animation: walk 3.5s steps(10, end) forwards;
        }
      `}</style>
    </div>
  );
}
