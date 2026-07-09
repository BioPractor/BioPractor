import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import Philosophy from "@/components/Philosophy";
import Showcase from "@/components/Showcase";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import { listFeaturedProducts } from "@/lib/db/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await listFeaturedProducts(3);

  return (
    <>
      <Hero />

      <Marquee />

      <CategoryGrid />

      <section className="bg-cream-soft py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-dark">
                  Selección
                </span>
                <h2 className="mt-3 font-display text-3xl font-semibold text-forest-dark sm:text-4xl lg:text-5xl">
                  Productos destacados
                </h2>
                <p className="mt-4 max-w-xl text-lg text-ink/70">
                  Una selección para empezar tu camino de autocuidado.
                </p>
              </div>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 rounded-full border border-forest-dark/20 px-5 py-2.5 text-sm font-bold text-forest-dark transition-colors hover:border-sky hover:text-sky-dark"
              >
                Ver catálogo completo →
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 90}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Philosophy />

      <Showcase />

      <CtaBanner />
    </>
  );
}
