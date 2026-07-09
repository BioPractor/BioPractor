import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
      {/* Acentos de gradiente suaves */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-sky/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-forest/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-dark">
            Nuestra filosofía
          </span>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 font-display text-3xl font-medium leading-[1.25] text-forest-dark sm:text-4xl lg:text-5xl">
            No vendemos productos,{" "}
            <span className="text-gradient italic">abrimos caminos</span>. Cada
            fórmula es una oportunidad de escuchar a tu cuerpo, cuidar tu mente
            y construir hábitos de bienestar que duran.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-sky to-transparent" />
        </Reveal>
      </div>
    </section>
  );
}
