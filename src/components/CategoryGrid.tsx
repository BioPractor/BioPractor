import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-extrabold text-forest-dark sm:text-3xl">
        ¿Qué necesita hoy tu cuerpo?
      </h2>
      <p className="mt-2 max-w-2xl text-ink/70">
        Busca por lo que quieres cuidar, no por nombres de producto. Elige una
        categoría y encuentra todo lo relacionado en un solo lugar.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/catalogo?categoria=${category.slug}`}
            className="group flex flex-col justify-between gap-3 rounded-2xl border border-sage-light/60 bg-white/60 p-5 transition-shadow hover:shadow-lg hover:shadow-forest/10"
          >
            <span className="text-base font-bold text-forest-dark group-hover:text-sky-dark">
              {category.name}
            </span>
            <span className="text-sm text-ink/70">{category.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
