import Link from "next/link";
import { generalWhatsAppLink } from "@/lib/whatsapp";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/", icon: "IG" },
  { label: "Facebook", href: "https://facebook.com/", icon: "FB" },
  { label: "TikTok", href: "https://tiktok.com/", icon: "TT" },
];

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink-deep text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-deep via-forest-dark/60 to-ink-deep" />
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-full.svg"
            alt="BioPractors"
            className="h-28 w-auto drop-shadow-lg"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
            Un camino de autocuidado a partir de productos naturales, para que
            gestiones tu bienestar a tu propio ritmo.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={`${social.label} — [CONTENIDO PENDIENTE: enlace real]`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-xs font-bold text-cream/80 transition-all hover:border-sky hover:bg-sky/20 hover:text-cream"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Enlaces del sitio" className="text-sm">
          <p className="font-display text-base font-semibold text-cream">
            Explorar
          </p>
          <ul className="mt-4 space-y-2.5 text-cream/70">
            <li>
              <Link href="/" className="transition-colors hover:text-sky-light">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/catalogo" className="transition-colors hover:text-sky-light">
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/terapias" className="transition-colors hover:text-sky-light">
                Terapias
              </Link>
            </li>
            <li>
              <Link href="/busqueda" className="transition-colors hover:text-sky-light">
                Búsqueda
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="transition-colors hover:text-sky-light">
                Contacto y citas
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <p className="font-display text-base font-semibold text-cream">
            Contacto
          </p>
          <a
            href={generalWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-semibold text-cream transition-colors hover:text-sky-light"
          >
            <svg viewBox="0 0 32 32" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.4.66 4.63 1.8 6.55L4 29l7.6-1.75a11.96 11.96 0 0 0 4.42.84h.01C22.65 28.09 28 22.7 28 16.07 28 9.45 22.64 3 16.02 3Zm5.44 14.6c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
            </svg>
            314 444 6563
          </a>
          <p className="mt-3 text-cream/80">
            Especialista en Medicina Natural Alternativa
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-1.5 text-cream/70">
            {[
              "Fitoterapia",
              "Hidroterapia",
              "Geoterapia",
              "Quiropraxia",
              "Helioterapia",
              "Fototerapia",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-sky-light" />
                {t}
              </li>
            ))}
            <li className="text-cream/50">…entre otras</li>
          </ul>
          <p className="mt-4 border-l-2 border-sky/50 pl-3 text-sm italic text-cream/80">
            Te orientamos para que autogestiones tus terapias en casa.
          </p>
        </div>
      </div>

      <div className="relative border-t border-cream/10 px-4 py-5 text-center text-xs text-cream/60 sm:px-6">
        © {new Date().getFullYear()} BioPractors. Todos los derechos reservados.
      </div>
    </footer>
  );
}
