export type TherapyIconKey =
  | "leaf"
  | "drop"
  | "earth"
  | "spine"
  | "sun"
  | "light"
  | "wave";

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
    tagline:
      "Aprende a escuchar tu cuerpo y a darle lo que requiere para potenciarlo en tu hogar.",
    description:
      "Uso terapéutico de plantas medicinales y extractos naturales para acompañar tu salud de forma suave y respetuosa con tu cuerpo.",
  },
  {
    slug: "hidroterapia",
    name: "Hidroterapia",
    icon: "drop",
    tagline: "Tu salud en tus manos.",
    description:
      "Aplicación del agua en distintas temperaturas y formas —baños, compresas y contrastes— para aliviar molestias y revitalizar el cuerpo.",
  },
  {
    slug: "geoterapia",
    name: "Geoterapia",
    icon: "earth",
    tagline: "Aprende a cuidarte en el lugar que más amas.",
    description:
      "Uso de arcillas y barros naturales para desintoxicar, desinflamar y aliviar aprovechando las propiedades de la tierra.",
  },
  {
    slug: "quiropraxia",
    name: "Quiropraxia",
    icon: "spine",
    tagline:
      "El arte de cuidarte de forma natural, en tu propio espacio y tu propio ritmo.",
    description:
      "Ajustes y maniobras manuales para liberar tensiones, mejorar la movilidad y devolverle equilibrio a tu columna y articulaciones.",
  },
  {
    slug: "helioterapia",
    name: "Helioterapia",
    icon: "sun",
    tagline:
      "La autogestión con terapias naturales es el camino para fortalecer el cuerpo, equilibrar la mente y activar tu propia energía vital.",
    description:
      "Aprovechamiento controlado y guiado de la luz solar para estimular tu vitalidad y bienestar general.",
  },
  {
    slug: "fototerapia",
    name: "Fototerapia",
    icon: "light",
    tagline: "Tu hogar, tu santuario de sanación natural.",
    description:
      "Uso terapéutico de la luz para acompañar tus procesos de recuperación, descanso y bienestar.",
  },
  {
    slug: "talasoterapia",
    name: "Talasoterapia",
    icon: "wave",
    tagline:
      "Despierta el poder de tu propia sanación en la comodidad de tu hogar.",
    description:
      "Uso terapéutico del agua de mar y los elementos marinos —sal, algas y minerales— para revitalizar el cuerpo, favorecer la circulación y la relajación.",
  },
];

export function getTherapyBySlug(slug: string): Therapy | undefined {
  return therapies.find((t) => t.slug === slug);
}
