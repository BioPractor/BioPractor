import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategoryFilter({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  return (
    <nav
      aria-label="Filtrar por categoría"
      className="flex flex-wrap gap-2 overflow-x-auto pb-1"
    >
      <Link
        href="/catalogo"
        aria-current={!activeCategory ? "true" : undefined}
        className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
          !activeCategory
            ? "border-sky-dark bg-sky-dark text-cream"
            : "border-sage-light text-ink hover:border-forest"
        }`}
      >
        Todos
      </Link>
      {categories.map((category) => {
        const isActive = category.slug === activeCategory;
        return (
          <Link
            key={category.slug}
            href={`/catalogo?categoria=${category.slug}`}
            aria-current={isActive ? "true" : undefined}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? "border-sky-dark bg-sky-dark text-cream"
                : "border-sage-light text-ink hover:border-forest"
            }`}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}
