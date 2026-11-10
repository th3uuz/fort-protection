import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import { servicosPagina } from "@/lib/conteudo";
import { migalhas } from "@/lib/schema";
import { mosaicos } from "@/lib/fotos";
import { pageMetadata } from "@/lib/seo";
import { grupos, servicosDoGrupo, type Grupo } from "@/lib/servicos";
import styles from "../secoes.module.css";

export const metadata = pageMetadata("/servicos");

const ordem: Grupo[] = ["seguranca", "facilities"];

export default function ServicosPage() {
  return (
    <>
      <JsonLd
        dados={migalhas([
          { nome: "Início", caminho: "/" },
          { nome: "Serviços", caminho: "/servicos" },
        ])}
      />
      <PageHero
        titulo={servicosPagina.titulo}
        apoio={[servicosPagina.apoio]}
        migalhas={[{ href: "/", label: "Início" }, { label: "Serviços" }]}
        fotos={mosaicos.servicos}
        banner
        acao={{ href: "/contato", label: "Solicite um orçamento" }}
      />

      {ordem.map((grupo, i) => {
        const itens = servicosDoGrupo(grupo);
        const ultimo = i === ordem.length - 1;
        return (
          <section
            key={grupo}
            className={`${styles.secao} ${i % 2 === 1 ? styles.ink2 : ""}`}
            aria-labelledby={`titulo-${grupo}`}
          >
            <div className="wrap">
              <div className={styles.topo}>
                <h2 id={`titulo-${grupo}`} data-reveal>
                  {grupos[grupo]}
                </h2>
              </div>
              <ul className={styles.cards} role="list">
                {itens.map((s, j) => (
                  <li key={s.slug} data-reveal style={{ ["--d" as string]: j % 4 }}>
                    <ServiceCard servico={s} />
                  </li>
                ))}
                {ultimo ? (
                  <li className={styles.cartaCta} data-reveal>
                    <h3>Peça seu orçamento</h3>
                    <p>Escolha onde você precisa do serviço e quais serviços quer. A mensagem sai pronta.</p>
                    <Link className="btn" href="/contato">
                      Solicite um orçamento
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          </section>
        );
      })}
    </>
  );
}
