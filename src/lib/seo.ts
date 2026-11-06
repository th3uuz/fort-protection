import type { Metadata } from "next";
import { site } from "./site";

export type PaginaSeo = {
  title: string;
  description: string;
  h1: string;
};

export const paginas: Record<string, PaginaSeo> = {
  "/": {
    title: "Segurança patrimonial e facilities em SP | Fort Protection",
    description:
      "Portaria 24 horas, limpeza, zeladoria, controle de acesso e alarmes para condomínios, empresas e casas em São Paulo. Peça seu orçamento pelo WhatsApp.",
    h1: "Segurança patrimonial em São Paulo",
  },
  "/sobre": {
    title: "Sobre a Fort Protection Patrimonial | Segurança em SP",
    description:
      "Conheça a Fort Protection Patrimonial: segurança patrimonial e facilities com profissionais qualificados em São Paulo. Veja missão e valores e fale conosco.",
    h1: "Sobre a Fort Protection",
  },
  "/servicos": {
    title: "Serviços de segurança e facilities em SP | Fort Protection",
    description:
      "Portaria 24 horas, controlador de acesso, alarmes e câmeras, limpeza, zeladoria, jardinagem e mais 5 serviços terceirizados. Escolha e peça seu orçamento.",
    h1: "Serviços de Segurança e Facilities",
  },
  "/servicos/portaria-24-horas": {
    title: "Portaria 24 horas terceirizada em SP | Fort Protection",
    description:
      "Portaria 24 horas terceirizada para condomínios e empresas em São Paulo, com cobertura de férias por interinos. Peça um orçamento sem compromisso.",
    h1: "Portaria 24 horas",
  },
  "/servicos/controlador-de-acesso": {
    title: "Controle de acesso terceirizado em SP | Fort Protection",
    description:
      "Controlador de acesso terceirizado para condomínios, empresas, hospitais e escolas em São Paulo. Conte como é o seu local e peça seu orçamento.",
    h1: "Controlador de acesso",
  },
  "/servicos/alarmes-e-cameras": {
    title: "Instalação de alarmes e câmeras de segurança em SP",
    description:
      "Instalação de alarmes e câmeras de segurança para casas, condomínios, empresas e galpões em São Paulo. Proteção contra invasões. Peça seu orçamento.",
    h1: "Instalação de alarmes e câmeras",
  },
  "/servicos/manobrista": {
    title: "Serviço de manobrista para condomínios | Fort Protection",
    description:
      "Manobrista terceirizado para condomínios e empresas em São Paulo: acesso mais rápido e atenção ao seu veículo. Peça um orçamento pelo WhatsApp.",
    h1: "Manobrista",
  },
  "/servicos/limpeza-e-conservacao": {
    title: "Limpeza e conservação para condomínios | Fort Protection",
    description:
      "Limpeza e conservação terceirizada para condomínios, empresas, escolas e hospitais em São Paulo. Ambiente limpo e organizado. Peça seu orçamento.",
    h1: "Limpeza e Conservação",
  },
  "/servicos/limpeza-pos-obra": {
    title: "Limpeza pós-obra em São Paulo | Fort Protection",
    description:
      "Limpeza pós-obra profissional para obras de pequeno e grande porte em São Paulo. Orçamento sem compromisso: fale com a Fort Protection pelo WhatsApp.",
    h1: "Limpeza pós-obra",
  },
  "/servicos/zeladoria": {
    title: "Zeladoria condominial em São Paulo | Fort Protection",
    description:
      "Zeladoria terceirizada para condomínios e empresas em São Paulo, com cuidado do patrimônio e de quem vive no local. Peça seu orçamento à Fort Protection.",
    h1: "Zeladoria",
  },
  "/servicos/manutencao": {
    title: "Manutenção predial para condomínios | Fort Protection",
    description:
      "Manutenção predial terceirizada para condomínios e empresas em São Paulo: trocas e consertos do dia a dia. Peça seu orçamento à Fort Protection.",
    h1: "Manutenção predial",
  },
  "/servicos/jardinagem": {
    title: "Jardinagem para condomínios e empresas | Fort Protection",
    description:
      "Jardinagem terceirizada para condomínios, empresas e casas em São Paulo: áreas verdes cuidadas e ambiente mais elegante. Peça seu orçamento.",
    h1: "Jardinagem",
  },
  "/servicos/mensageiro-e-recepcionista": {
    title: "Recepcionista e mensageiro terceirizados | Fort Protection",
    description:
      "Recepcionista e mensageiro terceirizados para condomínios e empresas em São Paulo, com atendimento na recepção do seu prédio. Peça seu orçamento.",
    h1: "Mensageiro e recepcionista",
  },
  "/servicos/interinos": {
    title: "Interinos para portaria e equipe | Fort Protection",
    description:
      "Interinos para cobrir as férias do porteiro, zelador ou recepcionista do seu condomínio ou empresa em São Paulo. O posto não fica vazio. Peça orçamento.",
    h1: "Interinos",
  },
  "/contato": {
    title: "Contato e orçamento | Fort Protection Patrimonial",
    description:
      "Fale com a Fort Protection Patrimonial pelo WhatsApp (11) 96711-6990 ou por e-mail. Atendimento das 08:00 às 18:00. Peça seu orçamento de segurança.",
    h1: "Entre em Contato Conosco",
  },
};

export function pageMetadata(path: string): Metadata {
  const pagina = paginas[path];
  if (!pagina) {
    throw new Error(`Página sem SEO definido: ${path}`);
  }
  const url = path === "/" ? site.url : `${site.url}${path}`;
  return {
    title: { absolute: pagina.title },
    description: pagina.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: site.name,
      url,
      title: pagina.title,
      description: pagina.description,
    },
    twitter: {
      card: "summary_large_image",
      title: pagina.title,
      description: pagina.description,
    },
  };
}
