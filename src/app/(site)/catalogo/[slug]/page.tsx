import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import WhatsAppCTAButton from "@/components/WhatsAppCTAButton";
import { getCategoryBySlug } from "@/lib/categories";
import { getActiveProductBySlug, incrementProductView } from "@/lib/db/products";
import { productWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getActiveProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getActiveProductBySlug(slug);
  if (!product) notFound();

  await incrementProductView(slug).catch(() => {});

  const productCategories = product.categorySlugs
    .map((s) => getCategoryBySlug(s))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Link href="/catalogo" className="text-sm font-semibold text-sky-dark hover:underline">
        ← Volver al catálogo
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <ProductImage
          product={product}
          className="aspect-square w-full rounded-[2rem] border border-sage-light/50 shadow-xl shadow-forest-dark/5"
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {productCategories.map((category) => (
              <Link
                key={category!.slug}
                href={`/catalogo?categoria=${category!.slug}`}
                className="rounded-full bg-sage-light px-3 py-1 text-xs font-semibold text-forest-dark hover:bg-sage-light/70"
              >
                {category!.name}
              </Link>
            ))}
          </div>

          <h1 className="font-display text-3xl font-semibold text-forest-dark sm:text-4xl">
            {product.name}
          </h1>
          <p className="text-sm font-semibold text-ink/60">
            Referencia {product.reference}
          </p>
          <p className="font-display text-3xl font-semibold text-gradient">
            {currency.format(product.price)}
          </p>
          <p className="leading-relaxed text-ink/80">{product.description}</p>

          <WhatsAppCTAButton
            href={productWhatsAppLink(product.name, product.reference)}
            slug={product.slug}
            className="mt-2 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-forest to-sky-dark px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-dark/20 transition-transform hover:scale-105"
          >
            Más información
          </WhatsAppCTAButton>
          <p className="text-xs text-ink/70">
            Te llevará a WhatsApp con un mensaje ya listo sobre este producto.
            BioPractor se encarga del pedido, el pago y de resolver tus dudas.
          </p>
        </div>
      </div>
    </div>
  );
}
