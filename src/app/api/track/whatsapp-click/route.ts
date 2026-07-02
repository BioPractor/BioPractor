import { NextResponse } from "next/server";
import { incrementWhatsappClick } from "@/lib/db/products";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const slug = body?.slug;

  if (typeof slug !== "string" || !slug) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await incrementWhatsappClick(slug);
  } catch {
    // No bloqueamos al usuario si falla el conteo de estadísticas.
  }

  return NextResponse.json({ ok: true });
}
