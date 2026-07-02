import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "energia",
    name: "Energía y rendimiento",
    description:
      "Suplementos para aumentar energía, vitalidad y rendimiento físico en tu día a día o en el entrenamiento.",
  },
  {
    slug: "sueno-estres",
    name: "Sueño y manejo del estrés",
    description:
      "Productos que ayudan a descansar mejor, reducir el estrés y la ansiedad, y encontrar calma.",
  },
  {
    slug: "colageno-belleza",
    name: "Colágeno, piel, cabello y uñas",
    description:
      "Colágenos y suplementos de belleza para nutrir tu piel, fortalecer cabello y uñas.",
  },
  {
    slug: "articulaciones-huesos",
    name: "Articulaciones y huesos",
    description:
      "Apoyo para articulaciones, huesos y movilidad: magnesio, calcio, colágeno y más.",
  },
  {
    slug: "digestion",
    name: "Digestión y flora intestinal",
    description:
      "Probióticos y suplementos digestivos para una digestión más ligera y un intestino en equilibrio.",
  },
  {
    slug: "hormonal",
    name: "Equilibrio hormonal",
    description:
      "Productos pensados para el equilibrio hormonal, la salud menstrual y la menopausia.",
  },
  {
    slug: "inmunidad",
    name: "Inmunidad y defensas",
    description:
      "Suplementos que refuerzan el sistema inmunológico y ayudan a tu cuerpo a defenderse mejor.",
  },
  {
    slug: "peso-metabolismo",
    name: "Control de peso y metabolismo",
    description:
      "Apoyo para el metabolismo, el control de peso y la saciedad.",
  },
  {
    slug: "cardiovascular",
    name: "Salud cardiovascular",
    description:
      "Productos que apoyan la salud del corazón y la circulación.",
  },
  {
    slug: "ninos",
    name: "Niños",
    description:
      "Suplementos formulados especialmente para el crecimiento y desarrollo de los más pequeños.",
  },
  {
    slug: "bienestar-general",
    name: "Bienestar general",
    description:
      "Otros productos para acompañar tu bienestar y autocuidado diario.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
