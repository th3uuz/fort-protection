import Link from "next/link";
import styles from "./Breadcrumb.module.css";

export type Migalha = { href?: string; label: string };

export default function Breadcrumb({ itens }: { itens: Migalha[] }) {
  return (
    <nav aria-label="Você está em" className={styles.nav}>
      <ol className={styles.lista}>
        {itens.map((item, i) => {
          const ultimo = i === itens.length - 1;
          return (
            <li key={item.label}>
              {item.href && !ultimo ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={ultimo ? "page" : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
