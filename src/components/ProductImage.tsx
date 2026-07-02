import ProductPhoto from "./ProductPhoto";

export default function ProductImage({
  product,
  className = "",
}: {
  product: { name: string; images: string[] };
  className?: string;
}) {
  const src = product.images[0];

  if (src) {
    // Las imágenes las sube el administrador desde cualquier URL externa
    // (no un dominio fijo), así que no usamos next/image aquí.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={product.name} className={`object-cover ${className}`} />;
  }

  return <ProductPhoto productName={product.name} className={className} />;
}
