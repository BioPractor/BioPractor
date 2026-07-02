import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-sage-light/60 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg font-extrabold text-forest-dark">
              Panel BioPractor
            </Link>
            <nav className="flex gap-4 text-sm font-semibold text-ink/70">
              <Link href="/admin" className="hover:text-forest-dark">
                Productos
              </Link>
              <Link href="/admin/productos/archivados" className="hover:text-forest-dark">
                Archivados
              </Link>
              <Link href="/admin/productos/nuevo" className="hover:text-forest-dark">
                Nuevo producto
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold text-ink/70 hover:text-forest-dark">
              Ver sitio
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
