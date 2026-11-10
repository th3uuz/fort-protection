"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { NavLink, NavServicos } from "./HeaderNav";
import styles from "./Header.module.css";

type Props = {
  itens: readonly NavLink[];
  servicos: NavServicos;
};

export default function MobileMenu({ itens, servicos }: Props) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.querySelectorAll("details").forEach((d) => {
      d.open = false;
    });
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details ref={ref} className={styles.menu}>
      <summary className={styles.resumo}>
        <span className={styles.sr}>Menu</span>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          <path
            className={styles.iconeAbrir}
            d="M3 6h18M3 12h18M3 18h18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className={styles.iconeFechar}
            d="M5 5l14 14M19 5 5 19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </summary>
      <div className={styles.painel}>
        {itens.map((item) =>
          item.href === servicos.href ? (
            <details key={item.href} className={styles.acordeao}>
              <summary className={styles.acordeaoResumo}>
                {item.label}
                <svg viewBox="0 0 12 8" width="14" height="10" aria-hidden="true" focusable="false">
                  <path
                    d="M1 1.5 6 6.5l5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className={styles.acordeaoCorpo}>
                {servicos.grupos.map((grupo) => (
                  <div key={grupo.titulo}>
                    <p className={styles.grupoTitulo}>{grupo.titulo}</p>
                    <ul>
                      {grupo.itens.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} className={styles.mobileServico}>
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Link href={servicos.href} className={styles.todos}>
                  Ver todos os serviços
                </Link>
              </div>
            </details>
          ) : (
            <Link key={item.href} href={item.href} className={styles.painelLink}>
              {item.label}
            </Link>
          ),
        )}
        <Link href="/contato" className={`btn ${styles.painelCta}`}>
          Solicite um orçamento
        </Link>
      </div>
    </details>
  );
}
