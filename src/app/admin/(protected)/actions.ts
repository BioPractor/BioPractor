"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categories } from "@/lib/categories";
import {
  archiveProductAdmin,
  createProductAdmin,
  restoreProductAdmin,
  setFeaturedAdmin,
  updateProductAdmin,
} from "@/lib/db/products";
import type { ProductInput } from "@/lib/types";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseProductInput(formData: FormData): ProductInput {
  const categorySlugs = categories
    .map((c) => c.slug)
    .filter((slug) => formData.get(`category-${slug}`) === "on");
  const name = String(formData.get("name") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();

  return {
    name,
    slug: slugify(rawSlug || name),
    reference: String(formData.get("reference") ?? "").trim(),
    price: Math.max(0, Math.round(Number(formData.get("price") ?? 0))),
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    categorySlugs,
    images: image ? [image] : [],
  };
}

function revalidatePublicPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/busqueda");
  if (slug) revalidatePath(`/catalogo/${slug}`);
}

export type ProductFormState = { status: "idle" | "error"; message?: string };

export async function createProductAction(
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const input = parseProductInput(formData);

  if (!input.name || !input.slug || !input.price) {
    return { status: "error", message: "Nombre, slug y precio son obligatorios." };
  }

  try {
    await createProductAdmin(input);
  } catch {
    return {
      status: "error",
      message: "No se pudo crear el producto. Revisa que el slug no esté repetido.",
    };
  }

  revalidatePublicPages(input.slug);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProductAction(
  id: string,
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const input = parseProductInput(formData);

  if (!input.name || !input.slug || !input.price) {
    return { status: "error", message: "Nombre, slug y precio son obligatorios." };
  }

  try {
    await updateProductAdmin(id, input);
  } catch {
    return {
      status: "error",
      message: "No se pudo guardar el producto. Revisa que el slug no esté repetido.",
    };
  }

  revalidatePublicPages(input.slug);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function toggleFeaturedAction(id: string, featured: boolean) {
  await setFeaturedAdmin(id, featured);
  revalidatePublicPages();
  revalidatePath("/admin");
}

export async function archiveProductAction(id: string) {
  await archiveProductAdmin(id);
  revalidatePublicPages();
  revalidatePath("/admin");
  revalidatePath("/admin/productos/archivados");
}

export async function restoreProductAction(id: string) {
  await restoreProductAdmin(id);
  revalidatePublicPages();
  revalidatePath("/admin");
  revalidatePath("/admin/productos/archivados");
}
