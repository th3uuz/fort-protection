import Image from "next/image";
import Link from "next/link";
import { localizacao, rodape } from "@/lib/conteudo";
import { servicos } from "@/lib/servicos";
import { site } from "@/lib/site";
import CurrentYear from "./CurrentYear";
import styles from "./Footer.module.css";

function IconeInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
      />
    </svg>
  );
}

function IconeFacebook() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.95.35-1.65 1.75-1.65H17V3.9c-.3-.04-1.35-.14-2.55-.14-2.55 0-4.3 1.55-4.3 4.4v2.34H7.3v3.3h2.85V22h3.35Z"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.cols}>
        <div className={styles.col}>
          <Link
            href="/"
            className={styles.marca}
            aria-label={`${site.name}, página inicial`}
          >
            <Image
              src="/images/logo-fort-protection.png"
              alt=""
              width={48}
              height={48}
            />
            <span>Fort Protection</span>
          </Link>
          <h2 className={styles.titulo}>{rodape.titulo}</h2>
          <p className={styles.texto}>{rodape.texto}</p>
          <ul className={styles.redes}>
            <li>
              <a
                href={site.instagram}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Instagram"
              >
                <IconeInstagram />
              </a>
            </li>
            <li>
              <a
                href={site.facebook}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Facebook"
              >
                <IconeFacebook />
              </a>
            </li>
          </ul>
          <dl className={styles.dados}>
            <div>
              <dt>Endereço</dt>
              <dd>{localizacao.endereco}</dd>
            </div>
            <div>
              <dt>Horário de funcionamento</dt>
              <dd>{localizacao.horario}</dd>
            </div>
          </dl>
        </div>
        <div className={styles.col}>
          <h2 className={styles.titulo}>Serviços</h2>
          <ul className={styles.list}>
            {servicos.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicos/${s.slug}`}>{s.nome}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.col}>
          <h2 className={styles.titulo}>A empresa</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/sobre">Sobre Nós</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
          </ul>
        </div>
        <div className={styles.col}>
          <h2 className={styles.titulo}>Fale conosco</h2>
          <ul className={styles.list}>
            <li>
              <a className={styles.contatoLink} href={site.whatsapp}>
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className={styles.contatoLink} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className={styles.legal}>
        © <CurrentYear /> {site.name}. Todos os direitos reservados. CNPJ{" "}
        {site.cnpj}.
      </p>
    </footer>
  );
}
