import Link from "next/link";
import { generalWhatsAppLink } from "@/lib/whatsapp";

// Gancho visual "estilo video": como aún no hay un video real del cliente,
// se simula movimiento con formas orgánicas animadas en CSS (sin depender de
// un archivo .mp4 que no existe). Para usar un video real, agrega
// public/hero.mp4 y reemplaza el <div aria-hidden> de abajo por un <video>.
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-dark text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-drift absolute -left-24 -top-24 h-80 w-80 rounded-full bg-sage/40 blur-3xl" />
        <div className="animate-drift-slow absolute -right-16 top-10 h-96 w-96 rounded-full bg-clay/30 blur-3xl" />
        <div className="animate-drift absolute bottom-[-6rem] left-1/3 h-72 w-72 rounded-full bg-forest/50 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6 sm:py-28">
        <span className="animate-float rounded-full border border-sage-light/40 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sage-light">
          Un camino, no una compra
        </span>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
          Gestiona tu autocuidado a partir de productos naturales
        </h1>
        <p className="max-w-xl text-lg text-sage-light">
          BioPractor no vende productos, abre oportunidades de autoayuda: un
          camino sencillo para encontrar exactamente lo que tu cuerpo y tu
          mente necesitan hoy.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={generalWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-clay-dark px-6 py-3 text-center text-sm font-bold text-white transition-transform hover:scale-105"
          >
            Más información
          </a>
          <Link
            href="/catalogo"
            className="rounded-full border border-cream/40 px-6 py-3 text-center text-sm font-bold text-cream transition-colors hover:bg-cream/10"
          >
            Explorar el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
