import Link from "next/link";
import { therapies } from "@/lib/therapies";
import TherapyIcon from "./TherapyIcon";
import Reveal from "./Reveal";

export default function Therapies() {
  return (
    <section
      id="terapias"
      className="grain relative overflow-hidden bg-ink-deep py-24 text-cream sm:py-28"
    >
      {/* Fondo con acentos de gradiente */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-deep via-forest-dark/70 to-ink-deep" />
        <div className="animate-aurora absolute -right-24 -top-24 h-96 w-96 rounded-full bg-sky/25 blur-[120px]" />
        <div className="animate-aurora-slow absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-forest/30 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sage-light/30 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-light backdrop-blur">
              Atención a domicilio
            </span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Terapias con un{" "}
              <span className="text-gradient italic">especialista</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/75">
              Especialista en medicina natural alternativa. Elige la terapia
              que necesitas y agenda una sesión a domicilio: te orientamos para
              que autogestiones tu bienestar en casa.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {therapies.map((therapy, i) => (
            <Reveal key={therapy.slug} delay={(i % 3) * 90}>
              <Link
                href={`/terapias/${therapy.slug}`}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-sky/50 hover:bg-white/[0.08]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-forest to-sky-dark text-cream shadow-lg shadow-sky-dark/20 transition-transform duration-300 group-hover:scale-110">
                  <TherapyIcon icon={therapy.icon} className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-cream">
                    {therapy.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-sky-light">
                    {therapy.tagline}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-cream/70">
                  {therapy.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-cream">
                  Reservar a domicilio
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-center text-sm text-cream/60">
            …entre otras terapias.{" "}
            <Link
              href="/terapias"
              className="font-semibold text-sky-light hover:underline"
            >
              Ver todas las terapias →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
