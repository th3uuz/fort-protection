import Breadcrumb, { type Migalha } from "./Breadcrumb";
import Headline from "./Headline";
import Masthead, { type FotoMosaico } from "./Masthead";
import styles from "./PageHero.module.css";

type Props = {
  titulo: string;
  apoio: string[];
  migalhas: Migalha[];
  fotos: FotoMosaico[];
};

export default function PageHero({ titulo, apoio, migalhas, fotos }: Props) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.texto} fade-after`}>
        <Breadcrumb itens={migalhas} />
        <Headline className={styles.h1} linhas={[titulo]} />
        {apoio.map((texto) => (
          <p key={texto} className={styles.apoio}>
            {texto}
          </p>
        ))}
      </div>
      <div className={styles.fotos}>
        <Masthead fotos={fotos} />
      </div>
    </section>
  );
}
