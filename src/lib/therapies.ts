export type TherapyIconKey =
  | "leaf"
  | "drop"
  | "earth"
  | "spine"
  | "sun"
  | "light";

export type Therapy = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: TherapyIconKey;
};

// Terapias que presta BioPractors a domicilio. El especialista orienta al
// cliente para que autogestione sus terapias en casa.
export const therapies: Therapy[] = [
  {
    slug: "fitoterapia",
    name: "Fitoterapia",
    icon: "leaf",
    tagline: "El poder de las plantas medicinales",
    description:
      "Uso terapéutico de plantas medicinales y extractos naturales para acompañar tu salud de forma suave y respetuosa con tu cuerpo.",
  },
  {
    slug: "hidroterapia",
    name: "Hidroterapia",
    icon: "drop",
    tagline: "El agua como fuente de bienestar",
    description:
      "Aplicación del agua en distintas temperaturas y formas —baños, compresas y contrastes— para aliviar molestias y revitalizar el cuerpo.",
  },
  {
    slug: "geoterapia",
    name: "Geoterapia",
    icon: "earth",
    tagline: "La tierra que equilibra",
    description:
      "Uso de arcillas y barros naturales para desintoxicar, desinflamar y aliviar aprovechando las propiedades de la tierra.",
  },
  {
    slug: "quiropraxia",
    name: "Quiropraxia",
    icon: "spine",
    tagline: "Alivio y movilidad para tu cuerpo",
    description:
      "Ajustes y maniobras manuales para liberar tensiones, mejorar la movilidad y devolverle equilibrio a tu columna y articulaciones.",
  },
  {
    slug: "helioterapia",
    name: "Helioterapia",
    icon: "sun",
    tagline: "La energía del sol",
    description:
      "Aprovechamiento controlado y guiado de la luz solar para estimular tu vitalidad y bienestar general.",
  },
  {
    slug: "fototerapia",
    name: "Fototerapia",
    icon: "light",
    tagline: "Luz que revitaliza",
    description:
      "Uso terapéutico de la luz para acompañar tus procesos de recuperación, descanso y bienestar.",
  },
];

export function getTherapyBySlug(slug: string): Therapy | undefined {
  return therapies.find((t) => t.slug === slug);
}
