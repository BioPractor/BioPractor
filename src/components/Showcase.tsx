import Reveal from "./Reveal";

// Video temático de la sección. Archivo en public/showcase.mp4 (gotas de
// agua sobre hojas verdes, banco gratuito Pexels, uso comercial sin
// atribución). Vacío = escena de gradiente animada de reemplazo.
const SHOWCASE_VIDEO_SRC = "/showcase.mp4";

export default function Showcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-dark">
            Naturaleza en movimiento
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest-dark sm:text-4xl lg:text-5xl">
            Bienestar que se{" "}
            <span className="text-gradient italic">siente vivo</span>
          </h2>
          <p className="mt-4 max-w-md text-lg text-ink/70">
            Ingredientes de origen natural, seleccionados para acompañarte en
            cada etapa. Un ritual diario para tu energía, tu descanso y tu
            equilibrio.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Fórmulas de origen natural",
              "Elige por necesidad, no por marca",
              "Acompañamiento personalizado por WhatsApp",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-ink/80">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-forest to-sky-dark text-xs text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="grain relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-sage-light/50 bg-ink-deep shadow-2xl shadow-forest-dark/20 sm:aspect-video lg:aspect-[4/5]">
            {SHOWCASE_VIDEO_SRC ? (
              <>
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  src={SHOWCASE_VIDEO_SRC}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-deep/70 via-transparent to-ink-deep/20"
                />
              </>
            ) : (
              <div aria-hidden="true" className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-dark via-ink-deep to-sky-dark" />
                <div className="animate-aurora absolute -left-20 top-10 h-72 w-72 rounded-full bg-forest/50 blur-3xl" />
                <div className="animate-aurora-slow absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-sky/50 blur-3xl" />
                <div className="animate-float absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              </div>
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-cream">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-transform hover:scale-105">
                <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="font-display text-lg italic text-cream/90">
                BioPractors
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
