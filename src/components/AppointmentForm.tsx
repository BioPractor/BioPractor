"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function AppointmentForm() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const canSubmit = name.trim() !== "" && service.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const lines = [
      `Hola BioPractor, quiero agendar una cita.`,
      `Nombre: ${name}`,
      `Interés: ${service}`,
      date && `Fecha/hora preferida: ${date}`,
      notes && `Notas: ${notes}`,
    ].filter(Boolean);

    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="appt-name" className="text-sm font-semibold text-ink">
          Nombre
        </label>
        <input
          id="appt-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="appt-service" className="text-sm font-semibold text-ink">
          ¿En qué te podemos acompañar?
        </label>
        <input
          id="appt-service"
          type="text"
          required
          placeholder="Ej: asesoría para dolores de cabeza"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="appt-date" className="text-sm font-semibold text-ink">
          Fecha y hora preferida
        </label>
        <input
          id="appt-date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="appt-notes" className="text-sm font-semibold text-ink">
          Notas (opcional)
        </label>
        <textarea
          id="appt-notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="rounded-xl border border-sage-light bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-clay"
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-full bg-clay-dark px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
      >
        Solicitar cita por WhatsApp
      </button>
      <p className="text-xs text-ink/70">
        Se abrirá WhatsApp con tu solicitud lista para enviar. BioPractor
        confirmará la fecha y hora contigo directamente.
      </p>
    </form>
  );
}
