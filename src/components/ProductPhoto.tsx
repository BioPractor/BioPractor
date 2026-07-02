const LEAF_PATH =
  "M12 2C7 2 3 6.5 3 12c0 5.79 4.61 9.5 8.5 10 .1-1.28.06-2.55-.16-3.71C15.9 17.4 20 13.9 20 8.5 20 5.5 17 2 12 2Z";

/**
 * Marcador visual para las fotos de producto mientras se reemplazan por las
 * imágenes reales del catálogo AlmaVida. Evita depender de archivos que aún
 * no existen y deja explícito qué falta por cargar.
 */
export default function ProductPhoto({
  productName,
  className = "",
}: {
  productName: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-sage-light to-cream-soft text-center ${className}`}
      role="img"
      aria-label={`Foto pendiente de cargar para ${productName}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-10 w-10 text-forest"
        fill="currentColor"
      >
        <path d={LEAF_PATH} />
      </svg>
      <span className="px-4 text-xs font-semibold text-forest-dark/70">
        [CONTENIDO PENDIENTE: foto del catálogo]
      </span>
    </div>
  );
}
