import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import AppointmentForm from "@/components/AppointmentForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos o agenda una cita con BioPractors para recibir asesoría sobre tu camino de autocuidado natural.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-dark">
        Hablemos
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-forest-dark sm:text-5xl">
        Contacto
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Cuéntanos qué necesitas o agenda una cita directamente. Fredy Urquijo
        y el equipo de BioPractors te acompañan en cada paso.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <section className="rounded-3xl border border-sage-light/60 bg-white/60 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-forest-dark">
            Envíanos un mensaje
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            Te responderemos lo antes posible.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>

        <section className="rounded-3xl border border-sage-light/60 bg-white/60 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-forest-dark">
            Agenda tu cita
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            Cuéntanos qué necesitas y coordinamos por WhatsApp.
          </p>
          <div className="mt-6">
            <AppointmentForm />
          </div>
        </section>
      </div>
    </div>
  );
}
