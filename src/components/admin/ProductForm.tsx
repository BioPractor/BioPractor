"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { categories } from "@/lib/categories";
import type { Product } from "@/lib/types";
import type { ProductFormState } from "@/app/admin/(protected)/actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-forest-dark px-8 py-3 text-sm font-bold text-cream transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
    >
      {pending ? "Guardando..." : label}
    </button>
  );
}

export default function ProductForm({
  action,
  product,
  submitLabel,
}: {
  action: (prevState: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  product?: Product;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, { status: "idle" } as ProductFormState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-semibold text-ink">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={product?.name}
            className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="slug" className="text-sm font-semibold text-ink">
            Slug (URL) — déjalo vacío para generarlo del nombre
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={product?.slug}
            placeholder="ej: aceite-relajante"
            className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="reference" className="text-sm font-semibold text-ink">
            Referencia
          </label>
          <input
            id="reference"
            name="reference"
            type="text"
            defaultValue={product?.reference}
            className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-semibold text-ink">
            Precio (COP)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step={100}
            required
            defaultValue={product?.price}
            className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="image" className="text-sm font-semibold text-ink">
          URL de la foto principal (opcional)
        </label>
        <input
          id="image"
          name="image"
          type="url"
          defaultValue={product?.images[0]}
          placeholder="https://..."
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold text-ink">Categorías</legend>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <label
              key={category.slug}
              className="flex items-center gap-2 rounded-full border border-sage-light px-3 py-1.5 text-sm text-ink has-[:checked]:border-forest has-[:checked]:bg-sage-light/40"
            >
              <input
                type="checkbox"
                name={`category-${category.slug}`}
                defaultChecked={product?.categorySlugs.includes(category.slug)}
                className="h-4 w-4"
              />
              {category.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1">
        <label htmlFor="shortDescription" className="text-sm font-semibold text-ink">
          Descripción corta (para las tarjetas)
        </label>
        <input
          id="shortDescription"
          name="shortDescription"
          type="text"
          required
          defaultValue={product?.shortDescription}
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-semibold text-ink">
          Descripción completa
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={product?.description}
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <div>
        <SubmitButton label={submitLabel} />
      </div>

      {state.status === "error" && (
        <p className="text-sm font-semibold text-clay-dark" aria-live="polite">
          {state.message}
        </p>
      )}
    </form>
  );
}
