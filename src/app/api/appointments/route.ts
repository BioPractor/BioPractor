import { NextResponse } from "next/server";
import { createAppointment } from "@/lib/db/appointments";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== "string" || body.name.trim() === "") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await createAppointment({
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: body.address,
      city: body.city,
      service: body.service,
      preferredDate: body.preferredDate,
      notes: body.notes,
      source: body.source,
    });
  } catch {
    // No bloqueamos al usuario si falla el guardado: igual se abre WhatsApp.
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
