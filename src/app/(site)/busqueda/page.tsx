import type { Metadata } from "next";
import SearchExperience from "@/components/SearchExperience";
import { listActiveProducts } from "@/lib/db/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Búsqueda",
  description:
    "Busca en el catálogo de BioPractors por lo que necesitas: cabeza, masajes, piel, sueño y más.",
};

export default async function BusquedaPage() {
  const products = await listActiveProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-dark">
        Búsqueda
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-forest-dark sm:text-5xl">
        ¿Qué estás buscando?
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Escribe una necesidad, un ingrediente o una categoría — por ejemplo
        &ldquo;energía&rdquo;, &ldquo;sueño&rdquo; o &ldquo;colágeno&rdquo;.
      </p>

      <SearchExperience products={products} />
    </div>
  );
}
