import Image from "next/image";
import Link from "next/link";
import Headline from "@/components/Headline";
import JsonLd from "@/components/JsonLd";
import Masthead from "@/components/Masthead";
import { perguntasFrequentes, website } from "@/lib/schema";
import ContactForm from "@/components/ContactForm";
import SegmentIndex from "@/components/SegmentIndex";
import ServicosCarrossel from "@/components/ServicosCarrossel";
import CountUp from "@/components/CountUp";
import Duvidas from "@/components/Duvidas";
import { faq } from "@/lib/faq";
import { home, indicadores } from "@/lib/conteudo";
import { pageMetadata } from "@/lib/seo";
import { servicoPorSlug } from "@/lib/servicos";
import styles from "./page.module.css";

export const metadata = pageMetadata("/");

const fotosMosaico = [
  { src: "/images/galpoes-topo.jpg", alt: "Estrutura metálica e luminárias no teto de um galpão" },
  { src: "/images/condominios-topo.jpg", alt: "Torres espelhadas de condomínio vistas de baixo" },
  { src: "/images/cameras-cidade.jpg", alt: "Câmera de segurança voltada para a cidade iluminada à noite" },
  { src: "/images/industrias-topo.jpg", alt: "Chaminé iluminada de uma indústria à noite" },
];

const ordemServicos = [
  "portaria-24-horas",
  "limpeza-e-conservacao",
  "alarmes-e-cameras",
  "interinos",
  "mensageiro-e-recepcionista",
  "zeladoria",
  "manutencao",
  "jardinagem",
  "controlador-de-acesso",
  "manobrista",
  "limpeza-pos-obra",
];

export default function Home() {
  const linhasServicos = ordemServicos
    .map((slug) => servicoPorSlug(slug))
    .filter((s) => s !== undefined);

  return (
    <>
      <JsonLd dados={[website(), perguntasFrequentes()]} />

      <section className={styles.hero}>
        <div className={styles.heroTexto}>
          <Headline className={styles.h1} linhas={["Segurança patrimonial", "em São Paulo"]} />
          <div className={`${styles.apoio} fade-after`}>
            <p className={styles.slogan}>{home.slogan}</p>
            <p>{home.apoio}</p>
            <div className={styles.heroAcoes}>
              <a className="btn" href="#orcamento">
                Solicite um orçamento
              </a>
              <Link className={styles.linkTexto} href="/servicos">
                Ver os 11 serviços
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.heroFotos}>
          <Masthead fotos={fotosMosaico} />
        </div>
      </section>

      <section className={styles.eficaz} aria-labelledby="titulo-eficaz">
        <div className={`wrap ${styles.eficazTopo}`}>
          <h2 id="titulo-eficaz" data-reveal>
            {home.eficaz.titulo}
          </h2>
          <p className={styles.lead} data-reveal style={{ ["--d" as string]: 1 }}>
            {home.eficaz.texto}
          </p>
        </div>
        <ul className={`wrap ${styles.figuras}`}>
          {indicadores.map((item, i) => (
            <li key={item.rotulo} data-reveal style={{ ["--d" as string]: i }}>
              <p className={styles.valor}>
                <CountUp valor={item.valor} />
              </p>
              <p className={styles.rotulo}>{item.rotulo}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`field-gold ${styles.servicos}`} aria-labelledby="titulo-servicos">
        <ServicosCarrossel
          servicos={linhasServicos}
          titulo={home.servicos.titulo}
          texto={home.servicos.texto}
          idTitulo="titulo-servicos"
        />
      </section>

      <section className={styles.duplo} aria-label="Limpeza pós obra & eventos, e interinos">
        <article className={styles.painel} data-reveal>
          <div className={styles.painelFoto}>
            <Image
              src="/images/posobra-aspirador.jpg"
              alt="Aspirador industrial no piso de um cômodo logo após a obra"
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 1100px) 40vw, 560px"
              style={{ objectPosition: "50% 65%" }}
              quality={75}
            />
          </div>
          <div className={styles.painelTexto}>
            <h2>{home.posObra.titulo}</h2>
            <p>{home.posObra.texto}</p>
            <Link className={styles.linkTexto} href="/servicos/limpeza-pos-obra">
              Limpeza Pós Obra & Eventos
            </Link>
          </div>
        </article>
        <article className={`${styles.painel} ${styles.painelAlt}`} data-reveal style={{ ["--d" as string]: 1 }}>
          <div className={styles.painelFoto}>
            <Image
              src="/images/interinos-equipe.jpg"
              alt="Equipe de três profissionais de macacão laranja com aspiradores"
              style={{ objectPosition: "50% 55%" }}
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 1100px) 40vw, 560px"
              quality={75}
            />
          </div>
          <div className={styles.painelTexto}>
            <h2>{home.ferias.titulo}</h2>
            <p>{home.ferias.texto}</p>
            <Link className={styles.linkTexto} href="/servicos/interinos">
              Interinos
            </Link>
          </div>
        </article>
      </section>

      <section aria-labelledby="titulo-atendemos">
        <SegmentIndex
          idTitulo="titulo-atendemos"
          titulo={home.atendemos.titulo}
          texto={home.atendemos.texto}
          interativo
        />
      </section>

      <section id="orcamento" className={`field-gold ${styles.orcamento}`} aria-labelledby="titulo-orcamento">
        <div className={`wrap ${styles.orcamentoTopo}`}>
          <h2 id="titulo-orcamento" data-reveal>
            Peça seu orçamento
          </h2>
          <p className={styles.orcamentoTexto} data-reveal style={{ ["--d" as string]: 1 }}>
            Escolha onde você precisa do serviço e quais serviços quer. A mensagem sai pronta.
          </p>
        </div>
        <div className={`wrap ${styles.orcamentoGrade}`}>
          <div className={`field-paper ${styles.orcamentoCaixa}`} data-reveal style={{ ["--d" as string]: 1 }}>
            <ContactForm />
          </div>
        </div>
      </section>

      <section id="perguntas" className={styles.faq} aria-labelledby="titulo-perguntas">
        <div className="wrap">
          <div className={styles.faqTopo}>
            <h2 id="titulo-perguntas" data-reveal>
              Perguntas frequentes
            </h2>
          </div>
          <div className={styles.faqGrade} data-reveal>
            <Duvidas itens={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
