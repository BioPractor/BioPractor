import Link from "next/link";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import Reveal from "./Reveal";

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <div className="grain relative overflow-hidden rounded-[2.5rem] bg-ink-deep px-6 py-16 text-center text-cream sm:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-ink-deep to-sky-dark" />
            <div className="animate-aurora absolute -left-10 -top-10 h-64 w-64 rounded-full bg-forest/40 blur-3xl" />
            <div className="animate-aurora-slow absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-sky/40 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
              ¿Prefieres que te{" "}
              <span className="text-gradient italic">asesoremos</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-cream/80">
              Agenda una cita o escríbenos directamente y te ayudamos a
              encontrar el producto ideal para lo que necesitas hoy.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-forest-dark transition-transform hover:scale-105"
              >
                Agendar cita
              </Link>
              <a
                href={generalWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-cream/30 bg-white/5 px-7 py-3.5 text-sm font-bold text-cream backdrop-blur transition-colors hover:bg-white/10"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
