import type { Metadata } from "next";
import Link from "next/link";
import { therapies } from "@/lib/therapies";
import TherapyVideo from "@/components/TherapyVideo";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terapias a domicilio",
  description:
    "Terapias de medicina natural alternativa a domicilio: fitoterapia, hidroterapia, geoterapia, quiropraxia, helioterapia, fototerapia, talasoterapia y más.",
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

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {therapies.map((therapy, i) => (
          <Reveal key={therapy.slug} delay={(i % 3) * 90}>
            <Link
              href={`/terapias/${therapy.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sage-light/60 bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-sky/40 hover:shadow-xl hover:shadow-sky/10"
            >
              <div className="relative aspect-video overflow-hidden [&_video]:transition-transform [&_video]:duration-700 group-hover:[&_video]:scale-110">
                <TherapyVideo
                  src={`/therapies/${therapy.slug}.mp4`}
                  className="h-full w-full"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-deep/70 via-transparent to-transparent"
                />
                <h2 className="absolute inset-x-4 bottom-3 font-display text-2xl font-semibold text-cream drop-shadow-lg">
                  {therapy.name}
                </h2>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-sm font-semibold text-sky-dark">
                  {therapy.tagline}
                </p>
                <p className="text-sm leading-relaxed text-ink/65">
                  {therapy.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-sky-dark">
                  Reservar a domicilio
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
