import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Duvidas from "@/components/Duvidas";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SegmentTiles from "@/components/SegmentTiles";
import ServiceCard from "@/components/ServiceCard";
import { migalhas, servico as esquemaServico } from "@/lib/schema";
import { mosaicos } from "@/lib/fotos";
import { rotuloServico } from "@/lib/orcamento";
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
  const fotoInclui = mosaicos[servico.slug][1] ?? mosaicos[servico.slug][0];
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
      />

      <section className={styles.secao} aria-labelledby="titulo-inclui">
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
          </div>
          <div className={styles.incluiTexto}>
            <h2 id="titulo-inclui">O que inclui</h2>
            <p className={styles.intro}>{servico.intro}</p>
            <ul className={styles.duasColunas}>
              {servico.inclui.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.secao} ${styles.ink2}`} aria-labelledby="titulo-onde">
        <div className="wrap">
          <div className={styles.topo}>
            <h2 id="titulo-onde" data-reveal>
              Onde atendemos
            </h2>
          </div>
          <SegmentTiles itens={atendidos} />
        </div>
      </section>

      <section className={styles.secao} aria-labelledby="titulo-duvidas">
        <div className={`wrap ${styles.duvidasGrade}`}>
          <div className={styles.duvidasLista}>
            <h2 id="titulo-duvidas" data-reveal>
              {tituloDuvidas}
            </h2>
            <div data-reveal style={{ ["--d" as string]: 1 }}>
              <Duvidas itens={servico.duvidas} />
            </div>
          </div>
          <div className={`field-gold ${styles.pedir}`} data-reveal style={{ ["--d" as string]: 1 }}>
            <h2 id="titulo-pedir">{tituloPedir}</h2>
            <p>{mensagem}</p>
            <div className={styles.acoes}>
              <a className="btn" href={whatsapp} rel="noopener noreferrer" target="_blank">
                Enviar pelo WhatsApp
              </a>
              <Link className={styles.link} href="/contato">
                Ver todas as opções
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.secao} ${styles.ink2}`} aria-labelledby="titulo-outros">
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
