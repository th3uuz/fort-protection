import Image from "next/image";
import styles from "./Masthead.module.css";

export type FotoMosaico = { src: string; alt: string; posicao?: string };

type Tile = {
  tipo: "foto" | "cor";
  foto?: number;
  area: string;
  destaque?: boolean;
};

const tiles: Tile[] = [
  { tipo: "foto", foto: 0, area: "1 / 1 / 2 / 3", destaque: true },
  { tipo: "cor", area: "1 / 3 / 2 / 4" },
  { tipo: "foto", foto: 1, area: "2 / 1 / 3 / 2" },
  { tipo: "foto", foto: 2, area: "2 / 2 / 3 / 3" },
  { tipo: "foto", foto: 3, area: "2 / 3 / 3 / 4" },
];

type Props = {
  fotos: FotoMosaico[];
};

export default function Masthead({ fotos }: Props) {
  return (
    <div className={styles.mosaico}>
      {tiles.map((tile, i) => {
        const estilo = {
          ["--area" as string]: tile.area,
          ["--i" as string]: i,
        };
        if (tile.tipo === "cor") {
          return (
            <div key={i} className={`${styles.tile} ${styles.gold} ${styles.marca}`} style={estilo} aria-hidden="true">
              <Image
                src="/images/logo-fort-protection.png"
                alt=""
                width={500}
                height={500}
                sizes="(max-width: 800px) 72px, 128px"
                className={styles.logo}
                quality={80}
              />
              <span className={styles.nomeMarca}>
                Fort Protection
                <span>Patrimonial</span>
              </span>
            </div>
          );
        }
        const foto = fotos[tile.foto ?? 0];
        if (!foto) return null;
        return (
          <div key={i} className={styles.tile} style={estilo}>
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes={tile.destaque ? "(max-width: 800px) 67vw, 38vw" : "(max-width: 800px) 34vw, 19vw"}
              className={tile.destaque ? styles.deriva : undefined}
              style={foto.posicao ? { objectPosition: foto.posicao } : undefined}
              loading="lazy"
              fetchPriority={tile.destaque ? "high" : "auto"}
              quality={75}
            />
          </div>
        );
      })}
    </div>
  );
}
