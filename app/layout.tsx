import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Kreatofans',
  description: 'Plataforma para creadores de contenido',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-black text-white min-h-screen">
        <main className="pb-16">{children}</main>
        <Navbar />
      </body>
    </html>
  );
}
