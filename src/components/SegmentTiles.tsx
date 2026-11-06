import Image from "next/image";
import type { Segmento } from "@/lib/segmentos";
import styles from "./SegmentIndex.module.css";

type Props = {
  itens: Segmento[];
};

export default function SegmentTiles({ itens }: Props) {
  return (
    <ul className={styles.livre} role="list">
      {itens.map((s, i) => (
        <li className={styles.item} key={s.slug} data-reveal style={{ ["--d" as string]: i }}>
          <div className={styles.link}>
            <span className={styles.foto}>
              <Image src={`/images/${s.foto}`} alt={s.alt} fill sizes="(max-width: 600px) 50vw, 25vw" quality={70} />
            </span>
            <span className={styles.nome}>{s.nome}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
