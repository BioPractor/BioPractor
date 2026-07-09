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
      className="group flex flex-col overflow-hidden rounded-3xl border border-sage-light/60 bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-sky/40 hover:shadow-xl hover:shadow-sky/10"
    >
      <div className="relative">
        <ProductImage
          product={product}
          zoom
          className="aspect-[4/3] w-full"
        />
        <span className="absolute right-3 top-3 z-10 rounded-full bg-white/85 px-3 py-1 text-sm font-extrabold text-forest-dark shadow-sm backdrop-blur">
          {currency.format(product.price)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg font-semibold text-forest-dark transition-colors group-hover:text-sky-dark">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-ink/65">
          {product.shortDescription}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-sky-dark">
          Más información
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
