"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

export type NavLink = { href: string; label: string };
export type NavGrupo = { titulo: string; itens: NavLink[] };
export type NavServicos = { href: string; grupos: NavGrupo[] };

type Props = {
  itens: readonly NavLink[];
  servicos: NavServicos;
};

const ativo = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

function Seta() {
  return (
    <svg viewBox="0 0 12 8" width="12" height="8" aria-hidden="true" focusable="false">
      <path
        d="M1 1.5 6 6.5l5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeaderNav({ itens, servicos }: Props) {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const raiz = useRef<HTMLLIElement>(null);
  const atraso = useRef<ReturnType<typeof setTimeout> | null>(null);

  const limpar = () => {
    if (atraso.current) clearTimeout(atraso.current);
    atraso.current = null;
  };
  const abrir = () => {
    limpar();
    setAberto(true);
  };
  const fecharLogo = () => {
    limpar();
    setAberto(false);
  };
  const fecharComAtraso = () => {
    limpar();
    atraso.current = setTimeout(() => setAberto(false), 140);
  };

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: PointerEvent) => {
      if (raiz.current && !raiz.current.contains(e.target as Node)) setAberto(false);
    };
    document.addEventListener("pointerdown", fora);
    return () => document.removeEventListener("pointerdown", fora);
  }, [aberto]);

  useEffect(
    () => () => {
      if (atraso.current) clearTimeout(atraso.current);
    },
    [],
  );

  return (
    <nav aria-label="Principal" className={styles.nav}>
      <ul className={styles.lista}>
        {itens.map((item) => {
          const atual = ativo(pathname, item.href);
          if (item.href !== servicos.href) {
            return (
              <li key={item.href}>
                <Link href={item.href} className={styles.link} aria-current={atual ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            );
          }
          return (
            <li
              key={item.href}
              ref={raiz}
              className={styles.drop}
              onMouseEnter={abrir}
              onMouseLeave={fecharComAtraso}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) fecharLogo();
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") fecharLogo();
              }}
            >
              <Link
                href={item.href}
                className={`${styles.link} ${styles.linkDrop}`}
                aria-current={atual ? "page" : undefined}
                onClick={fecharLogo}
              >
                {item.label}
              </Link>
              <button
                type="button"
                className={styles.seta}
                aria-expanded={aberto}
                aria-controls="menu-servicos"
                aria-label="Mostrar a lista de serviços"
                onClick={() => setAberto((v) => !v)}
              >
                <Seta />
              </button>
              <div id="menu-servicos" className={styles.painelDrop} data-aberto={aberto}>
                <div className={styles.grupos}>
                  {servicos.grupos.map((grupo) => (
                    <div key={grupo.titulo} className={styles.grupo}>
                      <p className={styles.grupoTitulo}>{grupo.titulo}</p>
                      <ul>
                        {grupo.itens.map((s) => (
                          <li key={s.href}>
                            <Link href={s.href} className={styles.dropLink} onClick={fecharLogo}>
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link href={servicos.href} className={styles.todos} onClick={fecharLogo}>
                  Ver todos os serviços
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
