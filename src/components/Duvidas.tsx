import Link from "next/link";
import { servicoPorSlug } from "@/lib/servicos";
import styles from "./Duvidas.module.css";

export type ItemDuvida = {
  pergunta: string;
  resposta: string;
  links?: string[];
};

export default function Duvidas({ itens }: { itens: ItemDuvida[] }) {
  return (
    <div className={styles.lista}>
      {itens.map((item) => (
        <details className={styles.item} key={item.pergunta}>
          <summary className={styles.pergunta}>{item.pergunta}</summary>
          <div className={styles.resposta}>
            <p>{item.resposta}</p>
            {item.links && item.links.length > 0 ? (
              <ul className={styles.links}>
                {item.links.map((slug) => {
                  const servico = servicoPorSlug(slug);
                  if (!servico) return null;
                  return (
                    <li key={slug}>
                      <Link href={`/servicos/${slug}`}>{servico.nome}</Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
