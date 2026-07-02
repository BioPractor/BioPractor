import Link from "next/link";
import { generalWhatsAppLink } from "@/lib/whatsapp";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/", icon: "IG" },
  { label: "Facebook", href: "https://facebook.com/", icon: "FB" },
  { label: "TikTok", href: "https://tiktok.com/", icon: "TT" },
];

export default function Footer() {
  return (
    <footer className="border-t border-sage-light/60 bg-forest-dark text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold">BioPractor</p>
          <p className="mt-3 text-sm text-sage-light">
            Un camino de autocuidado a partir de productos naturales, para que
            gestiones tu bienestar a tu propio ritmo.
          </p>
        </div>

        <nav aria-label="Enlaces del sitio" className="text-sm">
          <p className="font-semibold text-cream">Explorar</p>
          <ul className="mt-3 space-y-2 text-sage-light">
            <li>
              <Link href="/" className="hover:text-cream">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/catalogo" className="hover:text-cream">
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/busqueda" className="hover:text-cream">
                Búsqueda
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-cream">
                Contacto y citas
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <p className="font-semibold text-cream">Contacto</p>
          <ul className="mt-3 space-y-2 text-sage-light">
            <li>
              <a href={generalWhatsAppLink()} className="hover:text-cream">
                WhatsApp: 314 444 6563
              </a>
            </li>
            <li>Fredy Urquijo</li>
          </ul>
          <p className="mt-4 font-semibold text-cream">Síguenos</p>
          <ul className="mt-3 flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={`${social.label} — [CONTENIDO PENDIENTE: enlace real]`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-sage-light/60 text-xs font-bold text-sage-light transition-colors hover:border-clay hover:text-cream"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-sage-light/20 px-4 py-4 text-center text-xs text-sage-light sm:px-6">
        © {new Date().getFullYear()} BioPractor. Todos los derechos reservados.
      </div>
    </footer>
  );
}
