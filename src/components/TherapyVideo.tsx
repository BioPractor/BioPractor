"use client";

import { useEffect, useRef, useState } from "react";

// Muestra el video de una terapia en bucle, sin sonido. Carga diferida:
// el <video> solo se monta cuando la tarjeta está cerca de la pantalla, para
// que la página no descargue los 7 videos de golpe.
export default function TherapyVideo({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`bg-gradient-to-br from-forest-dark to-sky-dark ${className}`}
    >
      {inView && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
