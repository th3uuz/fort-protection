import Image from "next/image";
import Link from "next/link";
import { grupos, servicosDoGrupo, type Grupo } from "@/lib/servicos";
import { nav, site } from "@/lib/site";
import HeaderNav, { type NavServicos } from "./HeaderNav";
import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";

const ordem: Grupo[] = ["seguranca", "facilities"];

const servicos: NavServicos = {
  href: "/servicos",
  grupos: ordem.map((g) => ({
    titulo: grupos[g],
    itens: servicosDoGrupo(g).map((s) => ({ href: `/servicos/${s.slug}`, label: s.nome })),
  })),
};

export default function Header() {
  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.brand} aria-label={`${site.name}, página inicial`}>
        <Image src="/images/logo-fort-protection.png" alt="" width={44} height={44} loading="eager" />
        <span>{site.name}</span>
      </Link>
      <HeaderNav itens={nav} servicos={servicos} />
      <Link href="/contato" className={`btn ${styles.cta}`}>
        Pedir orçamento
      </Link>
      <MobileMenu itens={nav} servicos={servicos} />
    </header>
  );
}
