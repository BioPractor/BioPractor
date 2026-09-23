import type { TherapyIconKey } from "@/lib/therapies";

// Íconos de línea (stroke = currentColor) para cada terapia.
const PATHS: Record<TherapyIconKey, React.ReactNode> = {
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </>
  ),
  drop: (
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  ),
  earth: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
    </>
  ),
  spine: (
    <>
      <path d="M12 3v18" />
      <path d="M9 5h6M8.5 8.5h7M8 12h8M8.5 15.5h7M9 19h6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  light: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .9 1.6h5.2c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3Z" />
    </>
  ),
};

export default function TherapyIcon({
  icon,
  className = "h-6 w-6",
}: {
  icon: TherapyIconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[icon]}
    </svg>
  );
}
