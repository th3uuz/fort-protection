import Image from "next/image";
import Link from "next/link";
import { mosaicos } from "@/lib/fotos";
import type { Servico } from "@/lib/servicos";
import styles from "./ServiceCard.module.css";

type Props = {
  servico: Servico;
  variante?: "grade" | "carrossel";
  sizes?: string;
};

export default function ServiceCard({ servico, variante = "grade", sizes }: Props) {
  const foto = mosaicos[servico.slug]?.[0];
  return (
    <Link className={`${styles.card} ${styles[variante]}`} href={`/servicos/${servico.slug}`} draggable={false}>
      {foto ? (
        <span className={styles.foto}>
          <Image
            src={foto.src}
            alt={foto.alt}
            fill
            draggable={false}
            sizes={sizes ?? "(max-width: 560px) 120px, (max-width: 800px) 50vw, (max-width: 1100px) 33vw, 25vw"}
            style={foto.posicao ? { objectPosition: foto.posicao } : undefined}
            quality={70}
          />
        </span>
      ) : null}
      <span className={styles.corpo}>
        <span className={styles.nome}>{servico.nome}</span>
        <span className={styles.texto}>{servico.descricao}</span>
      </span>
    </Link>
  );
}
