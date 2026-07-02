"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { categories } from "@/lib/categories";
import { filterProducts } from "@/lib/search";
import type { Product } from "@/lib/types";

export default function SearchExperience({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => filterProducts(products, query), [products, query]);

  return (
    <div className="mt-8">
      <label htmlFor="search-input" className="sr-only">
        Buscar productos
      </label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ej: masaje, cabeza, sueño, piel..."
        className="w-full rounded-full border border-sage-light bg-white px-6 py-4 text-base text-ink shadow-sm focus-visible:outline-2 focus-visible:outline-clay"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setQuery(category.name)}
            className="rounded-full border border-sage-light px-3 py-1.5 text-xs font-semibold text-ink/70 transition-colors hover:border-forest hover:text-forest-dark"
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="mt-8" aria-live="polite">
        {query.trim() === "" ? (
          <p className="text-ink/70">
            Empieza a escribir para ver resultados, o elige una categoría
            sugerida arriba.
          </p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-ink/70">
            No encontramos resultados para &ldquo;{query}&rdquo;. Intenta con
            otra palabra o revisa el{" "}
            <Link href="/catalogo" className="font-semibold text-clay-dark hover:underline">
              catálogo completo
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
