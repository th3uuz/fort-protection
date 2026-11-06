"use client";

import { useEffect, useRef } from "react";

type Props = { valor: string; duracao?: number };

export default function CountUp({ valor, duracao = 1800 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = valor.match(/^(\D*)(\d+)(\D*)$/);
    if (!m) return;
    const [, prefixo, num, sufixo] = m;
    const alvo = Number(num);
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzir || !("IntersectionObserver" in window)) return;

    el.textContent = `${prefixo}0${sufixo}`;
    let raf = 0;

    const rodar = () => {
      const inicio = performance.now();
      const passo = (agora: number) => {
        const t = Math.min((agora - inicio) / duracao, 1);
        const suave = 1 - Math.pow(1 - t, 4);
        el.textContent = `${prefixo}${Math.round(alvo * suave)}${sufixo}`;
        if (t < 1) raf = requestAnimationFrame(passo);
      };
      raf = requestAnimationFrame(passo);
    };

    const observer = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          observer.disconnect();
          rodar();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = valor;
    };
  }, [valor, duracao]);

  return (
    <span ref={ref} aria-label={valor} style={{ fontVariantNumeric: "tabular-nums" }}>
      {valor}
    </span>
  );
}
