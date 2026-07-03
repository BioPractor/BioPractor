import Link from "next/link";
import type { Product } from "@/lib/types";
import ProductImage from "./ProductImage";

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/catalogo/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sage-light/60 bg-white/60 transition-shadow hover:shadow-lg hover:shadow-forest/10"
    >
      <ProductImage product={product} className="h-40 w-full" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-bold text-forest-dark group-hover:text-sky-dark">
          {product.name}
        </h3>
        <p className="text-sm text-ink/70">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-extrabold text-forest-dark">
            {currency.format(product.price)}
          </span>
          <span className="text-sm font-semibold text-sky-dark">
            Más información →
          </span>
        </div>
      </div>
    </Link>
  );
}
