import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

// Calibri no está disponible como fuente web con licencia abierta, así que se
// usa como preferencia del sistema (muchos equipos Windows la tienen instalada)
// y Mulish -una humanista redondeada muy cercana en espíritu- como respaldo web.
const mulish = Mulish({
  variable: "--font-body-fallback",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "BioPractor | Autocuidado natural",
    template: "%s | BioPractor",
  },
  description:
    "BioPractor te acompaña a gestionar tu autocuidado con productos naturales: encuentra soluciones por necesidad, desde masajes hasta bienestar emocional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${mulish.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
