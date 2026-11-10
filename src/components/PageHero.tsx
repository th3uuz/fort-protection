import Link from "next/link";
import Breadcrumb, { type Migalha } from "./Breadcrumb";
import Headline from "./Headline";
import Masthead, { type FotoMosaico } from "./Masthead";
import styles from "./PageHero.module.css";

type Props = {
  titulo: string;
  apoio: string[];
  migalhas: Migalha[];
  fotos?: FotoMosaico[];
  banner?: boolean;
  acao?: { href: string; label: string };
};

export default function PageHero({ titulo, apoio, migalhas, fotos, banner = false, acao }: Props) {
  const temFotos = !banner && !!fotos && fotos.length > 0;
  return (
    <section className={`${styles.hero} ${banner ? styles.banner : ""}`}>
      <div className={`${styles.texto} fade-after`}>
        <Breadcrumb itens={migalhas} />
        <Headline className={styles.h1} linhas={[titulo]} />
        {apoio.map((texto) => (
          <p key={texto} className={styles.apoio}>
            {texto}
          </p>
        ))}
        {banner && acao ? (
          <div className={styles.acoes}>
            <Link className="btn" href={acao.href}>
              {acao.label}
            </Link>
          </div>
        ) : null}
      </div>
      {temFotos && (
        <div className={`wrap ${styles.faixaWrap}`}>
          <div className={styles.fotos}>
            <Masthead fotos={fotos} variante="faixa" />
          </div>
        </div>
      )}
    </section>
  );
}
