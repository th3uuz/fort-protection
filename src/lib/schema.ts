import { faq } from "./faq";
import { localizacao } from "./conteudo";
import type { Servico } from "./servicos";
import { site } from "./site";

const orgId = `${site.url}/#organization`;

export const cidade = { "@type": "City", name: site.city };

export function organizacao() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.png`,
    email: site.email,
    telephone: "+55-11-96711-6990",
    sameAs: [site.instagram, site.facebook],
    areaServed: cidade,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+55-11-96711-6990",
      email: site.email,
      availableLanguage: "pt-BR",
    },
  };
}

export function website() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "pt-BR",
    publisher: { "@id": orgId },
  };
}

export function migalhas(itens: { nome: string; caminho: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nome,
      item: `${site.url}${item.caminho === "/" ? "" : item.caminho}`,
    })),
  };
}

export function servico(s: Servico) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.nome,
    serviceType: s.nome,
    description: s.descricao,
    url: `${site.url}/servicos/${s.slug}`,
    provider: { "@id": orgId },
    areaServed: cidade,
  };
}

export function paginaSobre() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Sobre a ${site.name}`,
    url: `${site.url}/sobre`,
    about: { "@id": orgId },
    description: localizacao.texto,
  };
}

export function paginaContato() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contato ${site.name}`,
    url: `${site.url}/contato`,
    about: { "@id": orgId },
  };
}

export function perguntasFrequentes() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((p) => ({
      "@type": "Question",
      name: p.pergunta,
      acceptedAnswer: { "@type": "Answer", text: p.resposta },
    })),
  };
}
