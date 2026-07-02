import type { Metadata } from "next";
import SearchExperience from "@/components/SearchExperience";
import { listActiveProducts } from "@/lib/db/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Búsqueda",
  description:
    "Busca en el catálogo de BioPractor por lo que necesitas: cabeza, masajes, piel, sueño y más.",
};

export default async function BusquedaPage() {
  const products = await listActiveProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-forest-dark">
        ¿Qué estás buscando?
      </h1>
      <p className="mt-2 max-w-2xl text-ink/70">
        Escribe una necesidad, un ingrediente o una categoría — por ejemplo
        &ldquo;cabeza&rdquo;, &ldquo;masaje&rdquo; o &ldquo;sueño&rdquo;.
      </p>

      <SearchExperience products={products} />
    </div>
  );
}
