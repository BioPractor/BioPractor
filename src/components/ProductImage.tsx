import Image from "next/image";
import ProductPhoto from "./ProductPhoto";

export default function ProductImage({
  product,
  className = "",
  zoom = false,
}: {
  product: { name: string; images: string[] };
  className?: string;
  // Cuando es true, la foto hace un leve zoom al pasar el cursor por la
  // tarjeta contenedora (que debe tener la clase `group`).
  zoom?: boolean;
}) {
  const src = product.images[0];
  const imgZoom = zoom
    ? "transition-transform duration-500 group-hover:scale-105"
    : "";

  if (src) {
    // Las fotos del catálogo viven en public/ (rutas locales) y usan
    // next/image para carga diferida y tamaños responsive. Si el admin pega
    // una URL externa arbitraria, usamos <img> normal para no depender de
    // una lista fija de dominios permitidos.
    const isLocal = src.startsWith("/");
    return (
      <div className={`relative overflow-hidden bg-sage-light/30 ${className}`}>
        {isLocal ? (
          <Image
            src={src}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className={`object-cover ${imgZoom}`}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover ${imgZoom}`}
          />
        )}
      </div>
    );
  }

  return <ProductPhoto productName={product.name} className={className} />;
}
