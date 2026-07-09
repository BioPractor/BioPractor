import type { Metadata } from "next";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { listActiveProducts, listProductsByCategory } from "@/lib/db/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora el catálogo de BioPractor organizado por necesidad: cabeza, masajes, piel, cuerpo, sueño y aromaterapia.",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const activeCategory = categories.some((c) => c.slug === categoria)
    ? categoria
    : undefined;

  const list = activeCategory
    ? await listProductsByCategory(activeCategory)
    : await listActiveProducts();
  const categoryInfo = activeCategory ? getCategoryBySlug(activeCategory) : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-dark">
        {categoryInfo ? "Categoría" : "Todo el catálogo"}
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-forest-dark sm:text-5xl">
        {categoryInfo ? categoryInfo.name : "Catálogo"}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        {categoryInfo
          ? categoryInfo.description
          : "Todos nuestros productos, organizados para que encuentres justo lo que necesitas."}
      </p>

      <div className="mt-8">
        <CategoryFilter activeCategory={activeCategory} />
      </div>

      {list.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-ink/70">
          Aún no hay productos en esta categoría.
        </p>
      )}
    </div>
  );
}
