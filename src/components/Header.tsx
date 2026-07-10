"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/busqueda", label: "Búsqueda" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? "glass border-b border-sage-light/50 shadow-sm shadow-forest-dark/5"
          : "border-b border-transparent bg-cream/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          {/* Isotipo de la marca (mano + hoja + columna). El nombre va como
              texto al lado, así que la imagen es decorativa. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.svg"
            alt=""
            aria-hidden="true"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-xl font-semibold tracking-tight text-forest-dark">
            BioPractor
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-forest-dark/10 text-forest-dark"
                    : "text-ink/80 hover:text-sky-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contacto"
            className="ml-2 rounded-full bg-gradient-to-r from-forest to-sky-dark px-5 py-2 text-sm font-bold text-white shadow-sm transition-transform hover:scale-105"
          >
            Agenda tu cita
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sage-light text-forest-dark md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="text-xl leading-none">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegación móvil"
          className="border-t border-sage-light/50 md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-sage-light/50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-xl bg-gradient-to-r from-forest to-sky-dark px-3 py-3 text-center text-base font-bold text-white"
              >
                Agenda tu cita
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
