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
            alt="BioPractor"
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
          <ul className="mt-4 space-y-2.5 text-cream/70">
            <li>
              <a
                href={generalWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-sky-light"
              >
                WhatsApp: 314 444 6563
              </a>
            </li>
            <li>Fredy Urquijo</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-cream/10 px-4 py-5 text-center text-xs text-cream/60 sm:px-6">
        © {new Date().getFullYear()} BioPractor. Todos los derechos reservados.
      </div>
    </footer>
  );
}
