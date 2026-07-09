import Link from "next/link";
import { generalWhatsAppLink } from "@/lib/whatsapp";

// Video de fondo del hero. Archivo en public/hero.mp4 (luz entre hojas,
// banco gratuito Pexels, uso comercial sin atribución). Para cambiarlo,
// reemplaza el archivo o pon otra ruta aquí. Si se deja vacío, se muestra
// solo la malla de gradiente animada.
const HERO_VIDEO_SRC = "/hero.mp4";

const STATS = [
  { value: "150+", label: "productos naturales" },
  { value: "100%", label: "de origen natural" },
  { value: "1 a 1", label: "asesoría personalizada" },
];

export default function Hero() {
  return (
    <section className="grain relative flex min-h-[92vh] items-center overflow-hidden bg-ink-deep text-cream">
      {/* Malla de gradiente animada (fallback tipo video) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-deep via-forest-dark to-ink-deep" />
        <div className="animate-aurora absolute -left-32 -top-40 h-[38rem] w-[38rem] rounded-full bg-forest/45 blur-[120px]" />
        <div className="animate-aurora-slow absolute -right-24 top-0 h-[34rem] w-[34rem] rounded-full bg-sky/40 blur-[120px]" />
        <div className="animate-aurora absolute bottom-[-12rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-sky-dark/40 blur-[130px]" />
        <div className="animate-aurora-slow absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-forest/35 blur-[110px]" />
      </div>

      {/* Video de fondo opcional */}
      {HERO_VIDEO_SRC && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-luminosity"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
          src={HERO_VIDEO_SRC}
        />
      )}

      {/* Velo para legibilidad del texto (vertical + lado izquierdo) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/40 to-ink-deep/70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink-deep/80 via-ink-deep/20 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
        <span className="animate-float inline-flex items-center gap-2 rounded-full border border-sage-light/30 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sage-light backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-light" />
          Un camino, no una compra
        </span>

        <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Gestiona tu autocuidado con productos{" "}
          <span className="text-gradient italic">naturales</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
          BioPractor no vende productos: abre oportunidades de autoayuda. Un
          camino sencillo para encontrar exactamente lo que tu cuerpo y tu
          mente necesitan hoy.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/catalogo"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-forest to-sky-dark px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-dark/20 transition-transform hover:scale-105"
          >
            Explorar el catálogo
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <a
            href={generalWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-cream/30 bg-white/5 px-7 py-3.5 text-sm font-bold text-cream backdrop-blur transition-colors hover:bg-white/10"
          >
            Más información
          </a>
        </div>

        {/* Chips de datos */}
        <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur"
            >
              <dt className="font-display text-2xl font-semibold text-cream sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs leading-snug text-cream/70">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Indicador de scroll */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/60"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          Descubre
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-cream/30 p-1">
          <span className="animate-bob h-1.5 w-1.5 rounded-full bg-sky-light" />
        </span>
      </div>
    </section>
  );
}
