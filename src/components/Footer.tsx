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
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-forest to-sky-dark text-cream"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2C7 2 3 6.5 3 12c0 5.79 4.61 9.5 8.5 10 .1-1.28.06-2.55-.16-3.71C15.9 17.4 20 13.9 20 8.5 20 5.5 17 2 12 2Z" />
              </svg>
            </span>
            <span className="font-display text-2xl font-semibold">BioPractor</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
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
