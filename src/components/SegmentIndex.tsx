"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { segmentos } from "@/lib/segmentos";
import styles from "./SegmentIndex.module.css";

type Props = {
  titulo: string;
  texto: string;
  idTitulo: string;
  interativo?: boolean;
  espacado?: boolean;
  tom?: "gold" | "ink";
  children?: ReactNode;
};

export default function SegmentIndex({ titulo, texto, idTitulo, interativo = false, espacado = false, tom = "gold", children }: Props) {
  const escolher = (slug: string) => {
    window.dispatchEvent(new CustomEvent("segmento", { detail: slug }));
  };

  return (
    <div className={`${styles.grade} ${espacado ? styles.espacado : ""}`}>
      <div className={`${tom === "gold" ? "field-gold" : styles.introInk} ${styles.intro}`}>
        <h2 id={idTitulo} data-reveal>
          {titulo}
        </h2>
        <p data-reveal style={{ ["--d" as string]: 1 }}>
          {texto}
        </p>
        {children}
      </div>
      <ul className={styles.lista} role="list">
        {segmentos.map((s, i) => {
          const conteudo = (
            <>
              <span className={styles.foto}>
                <Image
                  src={`/images/${s.foto}`}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 800px) 50vw, 25vw"
                  quality={70}
                />
              </span>
              <span className={styles.nome}>{s.nome}</span>
            </>
          );
          return (
            <li className={styles.item} key={s.slug} data-reveal style={{ ["--d" as string]: i }}>
              {interativo ? (
                <a
                  className={styles.link}
                  href="#orcamento"
                  onClick={() => escolher(s.slug)}
                  aria-label={`${s.nome}: pedir orçamento`}
                >
                  {conteudo}
                </a>
              ) : (
                <div className={styles.link}>{conteudo}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
