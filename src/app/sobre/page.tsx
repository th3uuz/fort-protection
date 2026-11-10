import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SegmentIndex from "@/components/SegmentIndex";
import { IconeAlvo, IconeDiamante, IconeOlho } from "@/components/Icones";
import { home, sobre } from "@/lib/conteudo";
import { migalhas, paginaSobre } from "@/lib/schema";
import { mosaicos } from "@/lib/fotos";
import { pageMetadata } from "@/lib/seo";
import styles from "../secoes.module.css";

export const metadata = pageMetadata("/sobre");

export default function SobrePage() {
  const { missaoVisaoValores: mvv } = sobre;
  const blocos = [
    { titulo: "Missão", texto: mvv.missao, Icone: IconeAlvo },
    { titulo: "Visão", texto: mvv.visao, Icone: IconeOlho },
    { titulo: "Valores", texto: mvv.valores, Icone: IconeDiamante },
  ];

  return (
    <>
      <JsonLd
        dados={[
          paginaSobre(),
          migalhas([
            { nome: "Início", caminho: "/" },
            { nome: "Sobre Nós", caminho: "/sobre" },
          ]),
        ]}
      />
      <PageHero
        titulo="Sobre a Fort Protection"
        apoio={[`${sobre.titulo}.`, sobre.apoio]}
        migalhas={[{ href: "/", label: "Início" }, { label: "Sobre Nós" }]}
        fotos={mosaicos.sobre}
        banner
        acao={{ href: "/contato", label: "Solicite um orçamento" }}
      />

      <section className={styles.secao} aria-labelledby="titulo-quem">
        <div className={`wrap ${styles.quem}`}>
          <div className={styles.quemFoto}>
            <Image
              src="/images/ceo.jpg"
              alt="CEO da Fort Protection Patrimonial sentado diante do letreiro da empresa"
              fill
              sizes="(max-width: 800px) 100vw, 40vw"
              quality={75}
            />
          </div>
          <div className={styles.quemTexto}>
            <h2 id="titulo-quem">
              {sobre.quemSomos.titulo}
            </h2>
            <div className={styles.paragrafos}>
              {sobre.quemSomos.paragrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`field-gold ${styles.mvv}`} aria-labelledby="titulo-mvv">
        <div className="wrap">
          <h2 id="titulo-mvv" className={styles.mvvTitulo} data-reveal>
            Missão, visão e valores
          </h2>
          <div className={styles.mvvGrade}>
            {blocos.map(({ titulo, texto, Icone }, i) => (
              <div className={styles.mvvItem} key={titulo} data-reveal style={{ ["--d" as string]: i }}>
                <span className={styles.icone}>
                  <Icone />
                </span>
                <h3>{titulo}</h3>
                <p className={styles.mvvTexto}>{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-atendemos">
        <SegmentIndex idTitulo="titulo-atendemos" titulo="Área de atuação" texto={home.atendemos.texto}>
          <Link className={styles.link} href="/servicos">
            Ver os serviços
          </Link>
        </SegmentIndex>
      </section>
    </>
  );
}
