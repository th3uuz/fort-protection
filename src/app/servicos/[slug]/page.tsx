import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Duvidas from "@/components/Duvidas";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SegmentTiles from "@/components/SegmentTiles";
import ServiceCard from "@/components/ServiceCard";
import { migalhas, servico as esquemaServico } from "@/lib/schema";
import { fotosInclui, mosaicos } from "@/lib/fotos";
import { rotuloServico } from "@/lib/orcamento";
import { servicoGeral } from "@/lib/conteudo";
import { pageMetadata } from "@/lib/seo";
import { segmentoPorSlug } from "@/lib/segmentos";
import { servicoPorSlug, servicos } from "@/lib/servicos";
import { site } from "@/lib/site";
import styles from "../../secoes.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicos.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!servicoPorSlug(slug)) notFound();
  return pageMetadata(`/servicos/${slug}`);
}

export default async function ServicoPage({ params }: Props) {
  const { slug } = await params;
  const servico = servicoPorSlug(slug);
  if (!servico) notFound();

  const relacionados = servico.relacionados
    .map((r) => servicoPorSlug(r))
    .filter((r) => r !== undefined);
  const atendidos = servico.segmentos
    .map((s) => segmentoPorSlug(s))
    .filter((s) => s !== undefined);
  const fotoInclui =
    fotosInclui[servico.slug] ?? mosaicos[servico.slug][1] ?? mosaicos[servico.slug][0];
  const mensagem = `Olá, quero um orçamento de ${rotuloServico(servico.slug, servico.nome)}.`;
  const whatsapp = `${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
  const rotulo = rotuloServico(servico.slug, servico.nome);
  const tituloDuvidas = `Dúvidas sobre ${rotulo}`.length <= 32 ? `Dúvidas sobre ${rotulo}` : "Dúvidas frequentes";
  const tituloPedir = `Peça orçamento de ${rotulo}`.length <= 36 ? `Peça orçamento de ${rotulo}` : "Peça seu orçamento";

  return (
    <>
      <JsonLd
        dados={[
          esquemaServico(servico),
          migalhas([
            { nome: "Início", caminho: "/" },
            { nome: "Serviços", caminho: "/servicos" },
            { nome: servico.nome, caminho: `/servicos/${servico.slug}` },
          ]),
        ]}
      />
      <PageHero
        titulo={servico.h1}
        apoio={[servico.descricao]}
        migalhas={[
          { href: "/", label: "Início" },
          { href: "/servicos", label: "Serviços" },
          { label: servico.nome },
        ]}
        fotos={mosaicos[servico.slug]}
        banner
        acao={{ href: "#titulo-pedir", label: "Solicite um orçamento" }}
      />

      <section className={styles.secao} aria-label="O que inclui">
        <div className={`wrap ${styles.inclui}`}>
          <div className={styles.incluiFoto}>
            <Image
              src={fotoInclui.src}
              alt={fotoInclui.alt}
              fill
              sizes="(max-width: 800px) 100vw, 40vw"
              style={fotoInclui.posicao ? { objectPosition: fotoInclui.posicao } : undefined}
              loading="eager"
              quality={75}
            />
            <Image
              src="/images/logo-fort-protection.png"
              alt=""
              width={72}
              height={72}
              className={styles.incluiLogo}
            />
          </div>
          <div className={styles.incluiTexto}>
            <p className={styles.intro}>{servico.intro}</p>
            <ul className={styles.duasColunas}>
              {servico.inclui.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.secao} ${styles.ink2}`} aria-labelledby="titulo-como">
        <div className={`wrap ${styles.como}`}>
          <h2 id="titulo-como" data-reveal>
            Como funciona
          </h2>
          <div className={styles.paragrafos} data-reveal style={{ ["--d" as string]: 1 }}>
            {servico.detalhes.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={`field-gold ${styles.mvv}`} aria-labelledby="titulo-pilares">
        <div className="wrap">
          <h2 id="titulo-pilares" className={styles.mvvTitulo} data-reveal>
            {servicoGeral.pilaresTitulo}
          </h2>
          <div className={styles.mvvGrade}>
            {servicoGeral.pilares.map((p, i) => (
              <div className={`${styles.mvvItem} ${styles.pilar}`} key={p.titulo} data-reveal style={{ ["--d" as string]: i }}>
                <span className={styles.icone} aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{p.titulo}</h3>
                <p className={styles.pilarTexto}>{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.secao} aria-labelledby="titulo-onde">
        <div className="wrap">
          <div className={styles.topo}>
            <h2 id="titulo-onde" data-reveal>
              Área de atuação
            </h2>
            <p className={styles.texto}>{servicoGeral.areaTexto}</p>
          </div>
          <SegmentTiles itens={atendidos} />
        </div>
      </section>

      <section className={`${styles.secao} ${styles.ink2}`} aria-labelledby="titulo-duvidas">
        <div className="wrap">
          <h2 id="titulo-duvidas" className={styles.duvidasTitulo} data-reveal>
            {tituloDuvidas}
          </h2>
          <div className={styles.duvidasLista} data-reveal style={{ ["--d" as string]: 1 }}>
            <Duvidas itens={servico.duvidas} />
          </div>
        </div>
      </section>

      <section className={`field-gold ${styles.pedir}`} aria-labelledby="titulo-pedir">
        <div className={`wrap ${styles.pedirFaixa}`}>
          <div className={styles.pedirTexto} data-reveal>
            <h2 id="titulo-pedir">{tituloPedir}</h2>
            <p>{mensagem}</p>
          </div>
          <div className={styles.acoes} data-reveal style={{ ["--d" as string]: 1 }}>
            <a className="btn" href={whatsapp} rel="noopener noreferrer" target="_blank">
              Enviar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className={styles.secao} aria-labelledby="titulo-outros">
        <div className="wrap">
          <div className={styles.topo}>
            <h2 id="titulo-outros" data-reveal>
              Outros serviços
            </h2>
          </div>
          <ul className={`${styles.cards} ${styles.cardsSobre}`} role="list">
            {relacionados.map((r, i) => (
              <li key={r.slug} data-reveal style={{ ["--d" as string]: i }}>
                <ServiceCard servico={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
