import Link from "next/link";
import { categories } from "@/lib/categories";
import Reveal from "./Reveal";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-dark">
          Explora por necesidad
        </span>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-forest-dark sm:text-4xl lg:text-5xl">
          ¿Qué necesita hoy tu cuerpo?
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink/70">
          Busca por lo que quieres cuidar, no por nombres de producto. Elige
          una categoría y encuentra todo lo relacionado en un solo lugar.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => (
          <Reveal key={category.slug} delay={(i % 3) * 90}>
            <Link
              href={`/catalogo?categoria=${category.slug}`}
              className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-sage-light/60 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky/40 hover:shadow-xl hover:shadow-sky/10"
            >
              {/* Acento superior en gradiente */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-forest to-sky transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="flex items-start justify-between">
                <span className="font-display text-4xl font-semibold text-sage-light transition-colors group-hover:text-sky/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-light/40 text-forest-dark transition-all group-hover:bg-sky group-hover:text-white">
                  →
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-forest-dark">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {category.description}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
