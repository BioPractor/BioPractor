import type { Metadata } from "next";
import { listAppointmentsAdmin, type Appointment } from "@/lib/db/appointments";
import { setStatusAction, deleteAppointmentAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Citas" };

const STATUS_STYLES: Record<Appointment["status"], string> = {
  pendiente: "bg-clay/15 text-clay-dark",
  atendida: "bg-forest/15 text-forest-dark",
  cancelada: "bg-ink/10 text-ink/60",
};

const STATUS_LABEL: Record<Appointment["status"], string> = {
  pendiente: "Pendiente",
  atendida: "Atendida",
  cancelada: "Cancelada",
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("es-CO", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function CitasPage() {
  let appointments: Appointment[] = [];
  let dbError = false;
  try {
    appointments = await listAppointmentsAdmin();
  } catch {
    dbError = true;
  }

  const pendientes = appointments.filter((a) => a.status === "pendiente").length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-forest-dark">Citas</h1>
          <p className="mt-1 text-sm text-ink/70">
            Solicitudes de terapias y citas a domicilio. Marca cada una como
            atendida o cancelada para llevar el control.
          </p>
        </div>
        {pendientes > 0 && (
          <span className="rounded-full bg-clay/15 px-4 py-2 text-sm font-bold text-clay-dark">
            {pendientes} pendiente{pendientes === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {dbError && (
        <p className="mt-8 rounded-2xl border border-clay/30 bg-clay/10 p-4 text-sm text-clay-dark">
          No se pudo cargar las citas. Verifica que la tabla{" "}
          <code>appointments</code> exista en Supabase (revisa el README /
          <code>supabase/schema.sql</code>) y que el proyecto no esté en pausa.
        </p>
      )}

      {!dbError && appointments.length === 0 && (
        <p className="mt-10 rounded-2xl border border-sage-light/60 bg-white/60 p-8 text-center text-ink/60">
          Todavía no hay citas registradas. Cuando alguien reserve una terapia o
          agende una cita desde el sitio, aparecerá aquí.
        </p>
      )}

      {appointments.length > 0 && (
        <div className="mt-8 space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="rounded-2xl border border-sage-light/60 bg-white/70 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-lg font-semibold text-forest-dark">
                      {appt.name}
                    </h2>
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-bold ${STATUS_STYLES[appt.status]}`}
                    >
                      {STATUS_LABEL[appt.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-sky-dark">
                    {appt.service || "Cita general"}
                    <span className="ml-2 font-normal text-ink/50">
                      · {appt.source === "cita" ? "Contacto" : "Terapia"} ·{" "}
                      {formatDate(appt.createdAt)}
                    </span>
                  </p>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                {appt.phone && (
                  <div className="flex gap-2">
                    <dt className="font-semibold text-ink/60">Teléfono:</dt>
                    <dd>
                      <a
                        href={`https://wa.me/57${appt.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-dark hover:underline"
                      >
                        {appt.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {appt.email && (
                  <div className="flex gap-2">
                    <dt className="font-semibold text-ink/60">Correo:</dt>
                    <dd className="text-ink/80">{appt.email}</dd>
                  </div>
                )}
                {appt.address && (
                  <div className="flex gap-2">
                    <dt className="font-semibold text-ink/60">Dirección:</dt>
                    <dd className="text-ink/80">
                      {appt.address}
                      {appt.city ? `, ${appt.city}` : ""}
                    </dd>
                  </div>
                )}
                {appt.preferredDate && (
                  <div className="flex gap-2">
                    <dt className="font-semibold text-ink/60">Preferida:</dt>
                    <dd className="text-ink/80">{appt.preferredDate}</dd>
                  </div>
                )}
                {appt.notes && (
                  <div className="flex gap-2 sm:col-span-2">
                    <dt className="font-semibold text-ink/60">Notas:</dt>
                    <dd className="text-ink/80">{appt.notes}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-sage-light/50 pt-4">
                <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Marcar como:
                </span>
                <form action={setStatusAction.bind(null, appt.id, "pendiente")}>
                  <button
                    type="submit"
                    disabled={appt.status === "pendiente"}
                    className="rounded-full border border-clay/40 px-3 py-1.5 text-xs font-bold text-clay-dark transition-colors hover:bg-clay/10 disabled:opacity-40"
                  >
                    Pendiente
                  </button>
                </form>
                <form action={setStatusAction.bind(null, appt.id, "atendida")}>
                  <button
                    type="submit"
                    disabled={appt.status === "atendida"}
                    className="rounded-full bg-forest-dark px-3 py-1.5 text-xs font-bold text-cream transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                  >
                    ✓ Atendida
                  </button>
                </form>
                <form action={setStatusAction.bind(null, appt.id, "cancelada")}>
                  <button
                    type="submit"
                    disabled={appt.status === "cancelada"}
                    className="rounded-full border border-sage-light px-3 py-1.5 text-xs font-bold text-ink/60 transition-colors hover:bg-sage-light/40 disabled:opacity-40"
                  >
                    Cancelada
                  </button>
                </form>
                <form
                  action={deleteAppointmentAction.bind(null, appt.id)}
                  className="ml-auto"
                >
                  <button
                    type="submit"
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-ink/40 transition-colors hover:text-clay-dark"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
