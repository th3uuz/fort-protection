export type Pergunta = {
  pergunta: string;
  resposta: string;
  links?: string[];
  pendente?: boolean;
  provisorio: true;
};

export const faq: Pergunta[] = [
  {
    pergunta: "O que faz uma empresa de segurança patrimonial?",
    resposta:
      "A Fort Protection Patrimonial oferece 11 serviços de segurança e facilities, como portaria 24 horas, controlador de acesso, instalação de alarmes e câmeras, limpeza, zeladoria e jardinagem, para condomínios, empresas, casas, galpões, hospitais, escolas e indústrias.",
    links: [
      "portaria-24-horas",
      "controlador-de-acesso",
      "alarmes-e-cameras",
      "zeladoria",
      "jardinagem",
    ],
    provisorio: true,
  },
  {
    pergunta: "Como peço um orçamento?",
    resposta:
      "Pelo WhatsApp (11) 96711-6990, por e-mail em contato@fortprotectionpatrimonial.com.br ou pelo formulário da página de contato.",
    provisorio: true,
  },
  {
    pergunta: "O orçamento tem custo?",
    resposta: "O pedido de orçamento é sem compromisso.",
    pendente: true,
    provisorio: true,
  },
  {
    pergunta: "Posso contratar mais de um serviço?",
    resposta:
      "Sim. No pedido de orçamento você marca todos os serviços de que precisa.",
    provisorio: true,
  },
];
