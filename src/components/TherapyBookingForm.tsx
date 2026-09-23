"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function TherapyBookingForm({
  therapyName,
}: {
  therapyName: string;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    date: "",
    notes: "",
  });

  const canSubmit =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.address.trim() !== "";

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const lines = [
      `Hola BioPractors, quiero reservar una terapia a domicilio.`,
      ``,
      `🌿 Terapia: ${therapyName}`,
      `Nombre: ${form.name}`,
      `Teléfono: ${form.phone}`,
      form.email && `Correo: ${form.email}`,
      `Dirección: ${form.address}${form.city ? `, ${form.city}` : ""}`,
      form.date && `Fecha/hora preferida: ${form.date}`,
      form.notes && `Notas: ${form.notes}`,
    ].filter(Boolean);

    window.open(
      buildWhatsAppLink(lines.join("\n")),
      "_blank",
      "noopener,noreferrer"
    );
  }

  const inputClass =
    "rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-sky";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="tb-name" className="text-sm font-semibold text-ink">
            Nombre completo *
          </label>
          <input id="tb-name" type="text" required value={form.name} onChange={update("name")} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tb-phone" className="text-sm font-semibold text-ink">
            Teléfono / WhatsApp *
          </label>
          <input id="tb-phone" type="tel" required value={form.phone} onChange={update("phone")} className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="tb-email" className="text-sm font-semibold text-ink">
          Correo electrónico
        </label>
        <input id="tb-email" type="email" value={form.email} onChange={update("email")} className={inputClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="tb-address" className="text-sm font-semibold text-ink">
            Dirección (para la visita) *
          </label>
          <input id="tb-address" type="text" required value={form.address} onChange={update("address")} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tb-city" className="text-sm font-semibold text-ink">
            Ciudad / barrio
          </label>
          <input id="tb-city" type="text" value={form.city} onChange={update("city")} className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="tb-date" className="text-sm font-semibold text-ink">
          Fecha y hora preferida
        </label>
        <input id="tb-date" type="datetime-local" value={form.date} onChange={update("date")} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="tb-notes" className="text-sm font-semibold text-ink">
          Motivo o notas (opcional)
        </label>
        <textarea id="tb-notes" rows={3} value={form.notes} onChange={update("notes")} className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-forest to-sky-dark px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-dark/20 transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
      >
        Reservar por WhatsApp
      </button>
      <p className="text-xs text-ink/60">
        Se abrirá WhatsApp con tu solicitud lista para enviar. El especialista
        confirmará contigo la fecha, la hora y los detalles de la terapia a
        domicilio.
      </p>
    </form>
  );
}
