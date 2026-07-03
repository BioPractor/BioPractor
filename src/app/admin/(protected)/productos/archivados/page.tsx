import type { Metadata } from "next";
import Link from "next/link";
import { listAllProductsAdmin } from "@/lib/db/products";
import { restoreProductAction } from "../../actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Productos archivados" };

export default async function ArchivedProductsPage() {
  const products = (await listAllProductsAdmin()).filter((p) => p.archived);

  return (
    <div>
      <Link href="/admin" className="text-sm font-semibold text-sky-dark hover:underline">
        ← Volver a productos
      </Link>

      <h1 className="mt-3 text-2xl font-extrabold text-forest-dark">
        Productos archivados
      </h1>
      <p className="mt-1 text-sm text-ink/70">
        Estos productos no se muestran en el sitio, pero quedan guardados
        aquí. Puedes restaurarlos cuando quieras.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-sage-light/60 bg-white/70">
        {products.length === 0 ? (
          <p className="px-4 py-8 text-center text-ink/60">
            No hay productos archivados.
          </p>
        ) : (
          <ul className="divide-y divide-sage-light/30">
            {products.map((product) => (
              <li key={product.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-semibold text-forest-dark">{product.name}</p>
                  <p className="text-xs text-ink/60">Referencia {product.reference}</p>
                </div>
                <form action={restoreProductAction.bind(null, product.id)}>
                  <button
                    type="submit"
                    className="rounded-full bg-forest-dark px-4 py-2 text-xs font-bold text-cream transition-transform hover:scale-105"
                  >
                    Restaurar
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
