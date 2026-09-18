import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KreatoFans",
  description: "La plataforma donde los creadores conectan con sus fans",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
