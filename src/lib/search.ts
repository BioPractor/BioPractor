import type { Product } from "./types";
import { getCategoryBySlug } from "./categories";

export function filterProducts(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const categoryNames = p.categorySlugs
      .map((slug) => getCategoryBySlug(slug)?.name ?? "")
      .join(" ")
      .toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      categoryNames.includes(q)
    );
  });
}
