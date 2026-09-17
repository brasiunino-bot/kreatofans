import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-sm text-center flex flex-col items-center">
                    
                            {/* Logo de KreatoFans */}
                                    <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.25)]">
                                              <Image
                                                          src="/images/kreatofans_logo.png"
                                                                      alt="KreatoFans Logo"
                                                                                  fill
                                                                                              className="object-cover"
                                                                                                          priority
                                                                                                                    />
                                                                                                                            </div>

                                                                                                                                    {/* Título */}
                                                                                                                                            <h1 className="text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-md mb-2">
                                                                                                                                                      KREATOFANS
                                                                                                                                                              </h1>

                                                                                                                                                                      <p className="text-purple-200/80 text-sm font-medium max-w-xs mb-8">
                                                                                                                                                                                La plataforma exclusiva para creadores y sus verdaderos fans.
                                                                                                                                                                                        </p>

                                                                                                                                                                                                {/* Botones de acción principal */}
                                                                                                                                                                                                        <div className="w-full space-y-3">
                                                                                                                                                                                                                  <Link
                                                                                                                                                                                                                              href="/register"
                                                                                                                                                                                                                                          className="block w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold text-center shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all"
                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                Crear una Cuenta
                                                                                                                                                                                                                                                                          </Link>

                                                                                                                                                                                                                                                                                    <Link
                                                                                                                                                                                                                                                                                                href="/login"
                                                                                                                                                                                                                                                                                                            className="block w-full py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-center backdrop-blur-sm active:scale-[0.98] transition-all"
                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                                  Iniciar Sesión
                                                                                                                                                                                                                                                                                                                                            </Link>
                                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                              </main>
                                                                                                                                                                                                                                                                                                                                                                )
                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                