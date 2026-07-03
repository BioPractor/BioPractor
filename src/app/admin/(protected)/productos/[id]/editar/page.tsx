import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getProductByIdAdmin } from "@/lib/db/products";
import { updateProductAction } from "../../../actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Editar producto" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByIdAdmin(id);
  if (!product) notFound();

  const boundAction = updateProductAction.bind(null, id);

  return (
    <div>
      <Link href="/admin" className="text-sm font-semibold text-sky-dark hover:underline">
        ← Volver a productos
      </Link>

      <h1 className="mt-3 text-2xl font-extrabold text-forest-dark">
        Editar producto
      </h1>

      <div className="mt-6 max-w-2xl rounded-3xl border border-sage-light/60 bg-white/70 p-6 sm:p-8">
        <ProductForm action={boundAction} product={product} submitLabel="Guardar cambios" />
      </div>
    </div>
  );
}
