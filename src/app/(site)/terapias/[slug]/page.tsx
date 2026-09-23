import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTherapyBySlug, therapies } from "@/lib/therapies";
import TherapyIcon from "@/components/TherapyIcon";
import TherapyBookingForm from "@/components/TherapyBookingForm";

export function generateStaticParams() {
  return therapies.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const therapy = getTherapyBySlug(slug);
  if (!therapy) return {};
  return {
    title: `${therapy.name} a domicilio`,
    description: therapy.description,
  };
}

export default async function TherapyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const therapy = getTherapyBySlug(slug);
  if (!therapy) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Link
        href="/terapias"
        className="text-sm font-semibold text-sky-dark hover:underline"
      >
        ← Todas las terapias
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Info de la terapia */}
        <div>
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-forest to-sky-dark text-cream shadow-lg shadow-sky-dark/20">
            <TherapyIcon icon={therapy.icon} className="h-8 w-8" />
          </span>
          <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.3em] text-sky-dark">
            Terapia a domicilio
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-forest-dark sm:text-5xl">
            {therapy.name}
          </h1>
          <p className="mt-2 text-lg font-medium text-sky-dark">
            {therapy.tagline}
          </p>
          <p className="mt-5 leading-relaxed text-ink/80">
            {therapy.description}
          </p>

          <div className="mt-8 rounded-2xl border border-sage-light/60 bg-sage-light/20 p-5">
            <p className="text-sm font-semibold text-forest-dark">
              ¿Cómo funciona?
            </p>
            <ol className="mt-3 space-y-2 text-sm text-ink/75">
              <li>1. Completa tus datos en el formulario.</li>
              <li>2. Se abre WhatsApp con tu solicitud lista para enviar.</li>
              <li>
                3. El especialista confirma fecha, hora y detalles de la visita
                a domicilio.
              </li>
            </ol>
          </div>
        </div>

        {/* Formulario de reserva */}
        <div className="rounded-3xl border border-sage-light/60 bg-white/70 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-forest-dark">
            Reserva tu sesión
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            Déjanos tus datos y coordinamos la visita.
          </p>
          <div className="mt-6">
            <TherapyBookingForm therapyName={therapy.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
