import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Product, ProductInput } from "@/lib/types";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  reference: string;
  category_slugs: string[];
  price: number;
  short_description: string;
  description: string;
  images: string[];
  featured: boolean;
  archived: boolean;
  views: number;
  whatsapp_clicks: number;
};

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    reference: row.reference,
    categorySlugs: row.category_slugs ?? [],
    price: row.price,
    shortDescription: row.short_description,
    description: row.description,
    images: row.images ?? [],
    featured: row.featured,
    archived: row.archived,
    views: row.views,
    whatsappClicks: row.whatsapp_clicks,
  };
}

function inputToRow(input: ProductInput) {
  return {
    slug: input.slug,
    name: input.name,
    reference: input.reference,
    category_slugs: input.categorySlugs,
    price: input.price,
    short_description: input.shortDescription,
    description: input.description,
    images: input.images,
  };
}

// --- Lectura pública (solo productos activos, no archivados) ---

export async function listActiveProducts(): Promise<Product[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("products")
    .select("*")
    .eq("archived", false)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function listFeaturedProducts(limit = 3): Promise<Product[]> {
  const active = await listActiveProducts();
  const featured = active.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);

  const rest = active.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, limit);
}

export async function listProductsByCategory(categorySlug: string): Promise<Product[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("products")
    .select("*")
    .eq("archived", false)
    .contains("category_slugs", [categorySlug])
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getActiveProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("archived", false)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRow(data) : null;
}

export async function incrementProductView(slug: string): Promise<void> {
  const { error } = await getSupabaseAdmin().rpc("increment_product_view", { p_slug: slug });
  if (error) throw error;
}

export async function incrementWhatsappClick(slug: string): Promise<void> {
  const { error } = await getSupabaseAdmin().rpc("increment_whatsapp_click", { p_slug: slug });
  if (error) throw error;
}

// --- Panel de administración (incluye productos archivados) ---

export async function listAllProductsAdmin(): Promise<Product[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("products")
    .select("*")
    .order("archived", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getProductByIdAdmin(id: string): Promise<Product | null> {
  const { data, error } = await getSupabaseAdmin().from("products").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

export async function createProductAdmin(input: ProductInput): Promise<void> {
  const { error } = await getSupabaseAdmin().from("products").insert(inputToRow(input));
  if (error) throw error;
}

export async function updateProductAdmin(id: string, input: ProductInput): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("products")
    .update({ ...inputToRow(input), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function setFeaturedAdmin(id: string, featured: boolean): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("products")
    .update({ featured, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function archiveProductAdmin(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("products")
    .update({ archived: true, featured: false, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function restoreProductAdmin(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("products")
    .update({ archived: false, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}
