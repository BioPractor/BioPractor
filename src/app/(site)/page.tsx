import Link from "next/link";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import { listFeaturedProducts } from "@/lib/db/products";
import { generalWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await listFeaturedProducts(3);

  return (
    <>
      <Hero />

      <CategoryGrid />

      <section className="bg-cream-soft py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-extrabold text-forest-dark sm:text-3xl">
                Productos destacados
              </h2>
              <p className="mt-2 max-w-xl text-ink/70">
                Una selección para empezar tu camino de autocuidado.
              </p>
            </div>
            <Link
              href="/catalogo"
              className="text-sm font-bold text-clay-dark hover:underline"
            >
              Ver catálogo completo →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-extrabold text-forest-dark sm:text-3xl">
          No vendemos productos, abrimos caminos
        </h2>
        <p className="mt-4 text-lg text-ink/70">
          Cada producto de BioPractor es una oportunidad de autoayuda: una
          forma sencilla y natural de escuchar a tu cuerpo, cuidar tu mente y
          construir hábitos de bienestar que duran.
        </p>
      </section>

      <section className="bg-forest-dark py-16 text-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            ¿Prefieres que te asesoremos?
          </h2>
          <p className="max-w-xl text-sage-light">
            Agenda una cita o escríbenos directamente y te ayudamos a
            encontrar el producto ideal para lo que necesitas.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contacto"
              className="rounded-full bg-clay-dark px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              Agendar cita
            </Link>
            <a
              href={generalWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-cream/40 px-6 py-3 text-sm font-bold text-cream transition-colors hover:bg-cream/10"
            >
              Más información
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
