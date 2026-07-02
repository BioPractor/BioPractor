import type { Metadata } from "next";
import Link from "next/link";
import { getCategoryBySlug } from "@/lib/categories";
import { listAllProductsAdmin } from "@/lib/db/products";
import { archiveProductAction, toggleFeaturedAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Productos" };

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default async function AdminDashboardPage() {
  const products = (await listAllProductsAdmin()).filter((p) => !p.archived);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-forest-dark">Productos</h1>
          <p className="mt-1 text-sm text-ink/70">
            Destaca, edita o archiva productos. Los cambios se reflejan de
            inmediato en el sitio.
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-full bg-forest-dark px-5 py-2.5 text-sm font-bold text-cream transition-transform hover:scale-105"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-sage-light/60 bg-white/70">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-sage-light/60 text-xs font-semibold uppercase tracking-wide text-ink/60">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categorías</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Vistas</th>
              <th className="px-4 py-3">Clics WhatsApp</th>
              <th className="px-4 py-3">Destacado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-sage-light/30 last:border-0">
                <td className="px-4 py-3 font-semibold text-forest-dark">{product.name}</td>
                <td className="px-4 py-3 text-ink/70">
                  {product.categorySlugs
                    .map((slug) => getCategoryBySlug(slug)?.name ?? slug)
                    .join(", ") || "—"}
                </td>
                <td className="px-4 py-3 text-ink/70">{currency.format(product.price)}</td>
                <td className="px-4 py-3 text-ink/70">{product.views}</td>
                <td className="px-4 py-3 text-ink/70">{product.whatsappClicks}</td>
                <td className="px-4 py-3">
                  <form action={toggleFeaturedAction.bind(null, product.id, !product.featured)}>
                    <button
                      type="submit"
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        product.featured
                          ? "bg-clay-dark text-white"
                          : "border border-sage-light text-ink/70 hover:border-clay"
                      }`}
                    >
                      {product.featured ? "Destacado ✓" : "Destacar"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/productos/${product.id}/editar`}
                      className="font-semibold text-clay-dark hover:underline"
                    >
                      Editar
                    </Link>
                    <form action={archiveProductAction.bind(null, product.id)}>
                      <button type="submit" className="font-semibold text-ink/60 hover:text-clay-dark">
                        Archivar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="px-4 py-8 text-center text-ink/60">
            Todavía no hay productos activos.{" "}
            <Link href="/admin/productos/nuevo" className="font-semibold text-clay-dark hover:underline">
              Crea el primero
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
