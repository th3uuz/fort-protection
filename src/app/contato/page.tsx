import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { contato, localizacao } from "@/lib/conteudo";
import { migalhas, paginaContato } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "./contato.module.css";

export const metadata = pageMetadata("/contato");

export default function ContatoPage() {
  return (
    <>
      <JsonLd
        dados={[
          paginaContato(),
          migalhas([
            { nome: "Início", caminho: "/" },
            { nome: "Contato", caminho: "/contato" },
          ]),
        ]}
      />
      <PageHero
        titulo={contato.titulo}
        apoio={[contato.apoio]}
        migalhas={[{ href: "/", label: "Início" }, { label: "Contato" }]}
      />

      <section id="orcamento" className={`field-paper ${styles.formulario}`} aria-labelledby="titulo-orcamento">
        <div className={`wrap ${styles.formularioGrade}`}>
          <h2 id="titulo-orcamento" data-reveal>
            Peça seu orçamento
          </h2>
          <ContactForm />
        </div>
      </section>

      <section className={styles.zonas} aria-label="Contato e localização">
        <div className={`wrap ${styles.info}`}>
          <div className={styles.bloco} data-reveal>
            <h2>{contato.faleConosco}</h2>
            <dl className={styles.pares}>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a href={site.whatsapp}>(11) 9 6711-6990</a>
                </dd>
              </div>
              <div>
                <dt>Suporte</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
            </dl>
          </div>
          <div className={styles.bloco} data-reveal style={{ ["--d" as string]: 1 }}>
            <h2>{localizacao.titulo}</h2>
            <p className={styles.texto}>{localizacao.texto}</p>
            <dl className={styles.pares}>
              <div>
                <dt>Endereço</dt>
                <dd>{localizacao.endereco}</dd>
              </div>
              <div>
                <dt>Horário</dt>
                <dd>{localizacao.horario}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
