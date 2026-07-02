import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import AppointmentForm from "@/components/AppointmentForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos o agenda una cita con BioPractor para recibir asesoría sobre tu camino de autocuidado natural.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-forest-dark">Contacto</h1>
      <p className="mt-2 max-w-2xl text-ink/70">
        Cuéntanos qué necesitas o agenda una cita directamente. Fredy Urquijo
        y el equipo de BioPractor te acompañan en cada paso.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <section className="rounded-3xl border border-sage-light/60 bg-white/60 p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-forest-dark">
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
          <h2 className="text-xl font-extrabold text-forest-dark">
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
