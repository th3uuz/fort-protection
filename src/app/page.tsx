import Image from "next/image";
import Link from "next/link";
import Headline from "@/components/Headline";
import JsonLd from "@/components/JsonLd";
import Masthead from "@/components/Masthead";
import { perguntasFrequentes, website } from "@/lib/schema";
import ContactForm from "@/components/ContactForm";
import SegmentIndex from "@/components/SegmentIndex";
import ServiceCard from "@/components/ServiceCard";
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
                Pedir orçamento
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

      <section className={`field-paper ${styles.servicos}`} aria-labelledby="titulo-servicos">
        <div className={`wrap ${styles.servicosTopo}`}>
          <div>
            <h2 id="titulo-servicos" data-reveal>
              {home.servicos.titulo}
            </h2>
            <p className={styles.servicosTexto} data-reveal style={{ ["--d" as string]: 1 }}>
              {home.servicos.texto}
            </p>
          </div>
          <Link className={styles.linkTexto} href="/servicos">
            Ver todos os serviços
          </Link>
        </div>
        <ul className={`wrap ${styles.cards}`} role="list">
          {linhasServicos.map((s, i) => (
            <li key={s.slug} data-reveal style={{ ["--d" as string]: i % 4 }}>
              <ServiceCard servico={s} />
            </li>
          ))}
          <li className={styles.cartaCta} data-reveal>
            <h3>Peça seu orçamento</h3>
            <p>Escolha onde você precisa do serviço e quais serviços quer. A mensagem sai pronta.</p>
            <a className="btn" href="#orcamento">
              Pedir orçamento
            </a>
          </li>
        </ul>
      </section>

      <section className={styles.duplo} aria-label="Limpeza pós-obra e interinos">
        <article className={styles.painel} data-reveal>
          <div className={styles.painelFoto}>
            <Image
              src="/images/limpeza.jpg"
              alt="Profissional de limpeza uniformizado passando mop no piso de um corredor envidraçado"
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 1100px) 40vw, 20vw"
              style={{ objectPosition: "50% 100%" }}
              quality={75}
            />
          </div>
          <div className={styles.painelTexto}>
            <h2>{home.posObra.titulo}</h2>
            <p>{home.posObra.texto}</p>
            <Link className={styles.linkTexto} href="/servicos/limpeza-pos-obra">
              Limpeza pós-obra
            </Link>
          </div>
        </article>
        <article className={`${styles.painel} ${styles.painelAlt}`} data-reveal style={{ ["--d" as string]: 1 }}>
          <div className={styles.painelFoto}>
            <Image
              src="/images/recepcao.jpg"
              alt="Atendente ao telefone em uma mesa de recepção"
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 1100px) 40vw, 20vw"
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

      <section className={styles.atendemos} aria-labelledby="titulo-atendemos">
        <SegmentIndex
          idTitulo="titulo-atendemos"
          titulo={home.atendemos.titulo}
          texto={home.atendemos.texto}
          interativo
        />
      </section>

      <section id="orcamento" className={`field-gold ${styles.orcamento}`} aria-labelledby="titulo-orcamento">
        <div className={`wrap ${styles.orcamentoGrade}`}>
          <div className={styles.orcamentoEsq}>
            <h2 id="titulo-orcamento" data-reveal>
              Peça seu orçamento
            </h2>
            <div className={styles.orcamentoFoto} data-reveal style={{ ["--d" as string]: 1 }}>
              <Image
                src="/images/cameras-celular.jpg"
                alt="Câmera de segurança no teto e celular com as imagens de quatro ambientes"
                fill
                sizes="(max-width: 800px) 100vw, 38vw"
                quality={75}
              />
            </div>
          </div>
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
