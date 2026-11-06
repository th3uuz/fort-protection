"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const itens = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"),
    );
    if (!("IntersectionObserver" in window)) {
      itens.forEach((el) => el.classList.add("is-in"));
      root.classList.add("reveal-ready");
      return;
    }
    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("is-in");
            observer.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    itens.forEach((el) => observer.observe(el));
    root.classList.add("reveal-ready");
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
