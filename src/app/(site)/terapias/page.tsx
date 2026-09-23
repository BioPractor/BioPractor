import type { Metadata } from "next";
import Link from "next/link";
import { therapies } from "@/lib/therapies";
import TherapyIcon from "@/components/TherapyIcon";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terapias a domicilio",
  description:
    "Terapias de medicina natural alternativa a domicilio: fitoterapia, hidroterapia, geoterapia, quiropraxia, helioterapia, fototerapia y más.",
};

export default function TerapiasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-dark">
        Atención a domicilio
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-forest-dark sm:text-5xl">
        Nuestras terapias
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Con un especialista en medicina natural alternativa. Elige la terapia
        que necesitas y agenda tu sesión a domicilio — te orientamos para que
        autogestiones tu bienestar en casa.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {therapies.map((therapy, i) => (
          <Reveal key={therapy.slug} delay={(i % 3) * 90}>
            <Link
              href={`/terapias/${therapy.slug}`}
              className="group flex h-full flex-col gap-4 rounded-3xl border border-sage-light/60 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sky/40 hover:shadow-xl hover:shadow-sky/10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-forest to-sky-dark text-cream shadow-md transition-transform duration-300 group-hover:scale-110">
                <TherapyIcon icon={therapy.icon} className="h-7 w-7" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold text-forest-dark">
                  {therapy.name}
                </h2>
                <p className="mt-1 text-sm font-semibold text-sky-dark">
                  {therapy.tagline}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-ink/65">
                {therapy.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-sky-dark">
                Reservar a domicilio
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
