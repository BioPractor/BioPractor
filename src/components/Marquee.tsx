const ITEMS = [
  "Energía",
  "Descanso",
  "Digestión",
  "Inmunidad",
  "Colágeno",
  "Equilibrio hormonal",
  "Articulaciones",
  "Bienestar emocional",
  "Piel, cabello y uñas",
  "Corazón",
];

export default function Marquee() {
  return (
    <div className="grain relative overflow-hidden border-y border-sage-light/50 bg-forest-dark py-4 text-cream">
      <div className="flex w-max animate-marquee items-center gap-6">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className="whitespace-nowrap font-display text-lg italic text-cream/90">
              {item}
            </span>
            <span aria-hidden="true" className="text-sky-light">
              ✦
            </span>
          </div>
        ))}
      </div>
      {/* Difuminado en los bordes */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-forest-dark to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-forest-dark to-transparent" />
    </div>
  );
}
