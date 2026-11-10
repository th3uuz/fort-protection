"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import ServiceCard from "@/components/ServiceCard";
import type { Servico } from "@/lib/servicos";
import styles from "./ServicosCarrossel.module.css";

const CLONES = 5;
const INTERVALO = 3000;

type Props = {
  servicos: Servico[];
  titulo: string;
  texto: string;
  idTitulo: string;
};

const consultaMovimento = "(prefers-reduced-motion: reduce)";

function assinarMovimento(aviso: () => void) {
  const mq = window.matchMedia(consultaMovimento);
  mq.addEventListener("change", aviso);
  return () => mq.removeEventListener("change", aviso);
}

function assinarAba(aviso: () => void) {
  document.addEventListener("visibilitychange", aviso);
  return () => document.removeEventListener("visibilitychange", aviso);
}

export default function ServicosCarrossel({ servicos, titulo, texto, idTitulo }: Props) {
  const total = servicos.length;
  const slides = [...servicos.slice(-CLONES), ...servicos, ...servicos.slice(0, CLONES)];

  const [indice, setIndice] = useState(CLONES);
  const [animar, setAnimar] = useState(true);
  const [pausado, setPausado] = useState<boolean | null>(null);
  const [interagindo, setInteragindo] = useState(false);
  const [visivel, setVisivel] = useState(false);

  const reduzido = useSyncExternalStore(
    assinarMovimento,
    () => window.matchMedia(consultaMovimento).matches,
    () => false,
  );
  const abaVisivel = useSyncExternalStore(
    assinarAba,
    () => document.visibilityState === "visible",
    () => true,
  );

  const raizRef = useRef<HTMLDivElement>(null);
  const janelaRef = useRef<HTMLDivElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const inicioToque = useRef<number | null>(null);
  const arrastou = useRef(false);

  const parado = pausado ?? reduzido;
  const ativo = !parado && !interagindo && visivel && abaVisivel;
  const atual = (((indice - CLONES) % total) + total) % total;

  const mover = useCallback(
    (passo: number) => {
      setAnimar(true);
      setIndice((i) => (i < CLONES || i >= CLONES + total ? i : i + passo));
    },
    [total],
  );

  const normalizar = useCallback(() => {
    setIndice((i) => {
      if (i >= CLONES + total) return i - total;
      if (i < CLONES) return i + total;
      return i;
    });
    setAnimar(false);
  }, [total]);

  useEffect(() => {
    const el = raizRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!ativo) return;
    const t = window.setTimeout(() => mover(1), INTERVALO);
    return () => window.clearTimeout(t);
  }, [ativo, indice, mover]);

  useEffect(() => {
    if (indice >= CLONES && indice < CLONES + total) return;
    const t = window.setTimeout(normalizar, 900);
    return () => window.clearTimeout(t);
  }, [indice, total, normalizar]);

  useEffect(() => {
    if (animar) return;
    trilhoRef.current?.getBoundingClientRect();
    const r = window.requestAnimationFrame(() => setAnimar(true));
    return () => window.cancelAnimationFrame(r);
  }, [animar]);

  const aoFocar = (pos: number) => {
    const janela = janelaRef.current;
    if (!janela) return;
    const per = Math.max(1, Math.floor(parseFloat(getComputedStyle(janela).getPropertyValue("--per")) || 1));
    if (pos < indice || pos > indice + per - 1) {
      setAnimar(true);
      setIndice(pos);
    }
  };

  return (
    <div
      ref={raizRef}
      className={styles.carrossel}
      role="region"
      aria-roledescription="carrossel"
      aria-labelledby={idTitulo}
      onMouseEnter={() => setInteragindo(true)}
      onMouseLeave={() => setInteragindo(false)}
      onFocus={() => setInteragindo(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteragindo(false);
      }}
    >
      <div className={styles.topo}>
        <div>
          <h2 id={idTitulo} data-reveal>
            {titulo}
          </h2>
          <p className={styles.texto} data-reveal style={{ ["--d" as string]: 1 }}>
            {texto}
          </p>
        </div>
        <div className={styles.controles}>
          <span className={styles.contador} aria-hidden="true">
            {String(atual + 1).padStart(2, "0")}
            <span className={styles.contadorTotal}> / {String(total).padStart(2, "0")}</span>
          </span>
          <button
            type="button"
            className={styles.botao}
            onClick={() => setPausado(!parado)}
            aria-label={parado ? "Retomar rolagem automática" : "Pausar rolagem automática"}
          >
            {parado ? (
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
              </svg>
            )}
          </button>
          <button type="button" className={styles.botao} onClick={() => mover(-1)} aria-label="Serviço anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className={styles.botao} onClick={() => mover(1)} aria-label="Próximo serviço">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={janelaRef}
        className={styles.janela}
        data-reveal
        onPointerDown={(e) => {
          inicioToque.current = e.clientX;
          arrastou.current = false;
        }}
        onPointerUp={(e) => {
          if (inicioToque.current === null) return;
          const dx = e.clientX - inicioToque.current;
          inicioToque.current = null;
          if (Math.abs(dx) > 40) {
            arrastou.current = true;
            mover(dx < 0 ? 1 : -1);
          }
        }}
        onPointerCancel={() => {
          inicioToque.current = null;
        }}
        onClickCapture={(e) => {
          if (arrastou.current) {
            e.preventDefault();
            e.stopPropagation();
            arrastou.current = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          ref={trilhoRef}
          className={`${styles.trilho} ${animar ? styles.animar : ""}`}
          style={{ ["--i" as string]: indice }}
          aria-live={ativo ? "off" : "polite"}
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget && e.propertyName === "transform") normalizar();
          }}
        >
          {slides.map((s, pos) => {
            const clone = pos < CLONES || pos >= CLONES + total;
            const n = pos - CLONES + 1;
            return (
              <div
                key={`${s.slug}-${pos}`}
                className={styles.slide}
                role={clone ? undefined : "group"}
                aria-roledescription={clone ? undefined : "slide"}
                aria-label={clone ? undefined : `${n} de ${total}`}
                aria-hidden={clone || undefined}
                inert={clone || undefined}
                onFocus={clone ? undefined : () => aoFocar(pos)}
              >
                <ServiceCard
                  servico={s}
                  variante="carrossel"
                  sizes="(max-width: 560px) 80vw, (max-width: 800px) 45vw, (max-width: 1100px) 33vw, 360px"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.progresso} aria-hidden="true">
        <span key={`${indice}-${ativo}`} className={ativo ? styles.enchendo : ""} />
      </div>

      <div className={styles.rodape}>
        <Link className="btn" href="/servicos">
          Ver todos os serviços
        </Link>
      </div>
    </div>
  );
}
