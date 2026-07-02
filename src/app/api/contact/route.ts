import { NextResponse } from "next/server";
import { submitContact } from "@/lib/contact";

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (!data) {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const result = await submitContact(data);

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result, { status: 200 });
}
