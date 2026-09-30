import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTherapyBySlug, therapies } from "@/lib/therapies";
import TherapyVideo from "@/components/TherapyVideo";
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

      {/* Banner de video con el nombre grande */}
      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl sm:aspect-[16/7]">
        <TherapyVideo
          src={`/therapies/${therapy.slug}.mp4`}
          className="h-full w-full"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/30 to-ink-deep/20"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-light">
            Terapia a domicilio
          </span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-cream drop-shadow-lg sm:text-5xl lg:text-6xl">
            {therapy.name}
          </h1>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Info de la terapia */}
        <div>
          <p className="text-gradient font-display text-2xl font-medium italic leading-snug sm:text-3xl">
            {therapy.tagline}
          </p>
          <p className="mt-6 leading-relaxed text-ink/80">
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
