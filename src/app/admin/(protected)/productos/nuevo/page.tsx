import type { Metadata } from "next";
import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { createProductAction } from "../../actions";

export const metadata: Metadata = { title: "Nuevo producto" };

export default function NewProductPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm font-semibold text-clay-dark hover:underline">
        ← Volver a productos
      </Link>

      <h1 className="mt-3 text-2xl font-extrabold text-forest-dark">Nuevo producto</h1>

      <div className="mt-6 max-w-2xl rounded-3xl border border-sage-light/60 bg-white/70 p-6 sm:p-8">
        <ProductForm action={createProductAction} submitLabel="Crear producto" />
      </div>
    </div>
  );
}
