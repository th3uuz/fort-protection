export type Foto = {
  src: string;
  alt: string;
  posicao?: string;
};

const alts: Record<string, string> = {
  "condominios-topo": "Torres espelhadas de condomínio vistas de baixo",
  "condominios-base": "Fachada de vidro na entrada de um edifício",
  "empresas-topo": "Teto e janelas de uma sala de escritório",
  "empresas-base": "Cadeira de escritório diante de uma mesa de reunião",
  "casas-topo": "Casa moderna de dois andares com varanda de vidro",
  "casas-base": "Entrada de veículos pavimentada diante de uma casa",
  "galpoes-topo": "Estrutura metálica e luminárias no teto de um galpão",
  "galpoes-base": "Piso de concreto de um galpão amplo",
  "hospitais-base": "Cadeiras de espera na recepção de um hospital",
  "escolas-topo": "Prédio de dois andares em volta do pátio de uma escola",
  "escolas-base": "Canteiros com árvores no pátio de uma escola",
  "industrias-topo": "Chaminé iluminada de uma indústria à noite",
  "industrias-base": "Tubulações e estrutura iluminada de uma planta industrial",
  "cameras-cidade": "Câmera de segurança voltada para a cidade iluminada à noite",
  "cameras-celular":
    "Câmera de segurança no teto e celular com as imagens de quatro ambientes",
  limpeza:
    "Profissional de limpeza uniformizado passando mop no piso de um corredor envidraçado",
  recepcao: "Atendente ao telefone em uma mesa de recepção",
  "controle-acesso":
    "Ponto de inspeção com esteira e câmeras na entrada de um terminal",
};

export function foto(nome: string, posicao?: string): Foto {
  const alt = alts[nome];
  if (!alt) {
    throw new Error(`Foto sem texto alternativo: ${nome}`);
  }
  return { src: `/images/${nome}.jpg`, alt, posicao };
}

const grupo = (...nomes: string[]) => nomes.map((n) => foto(n));

export const mosaicos: Record<string, Foto[]> = {
  sobre: grupo("condominios-base", "empresas-topo", "casas-topo", "escolas-topo"),
  servicos: grupo("cameras-celular", "limpeza", "controle-acesso", "recepcao"),
  contato: grupo("cameras-cidade", "casas-topo", "empresas-base", "hospitais-base"),
  "portaria-24-horas": grupo("condominios-topo", "condominios-base", "empresas-topo", "casas-topo"),
  "controlador-de-acesso": grupo("controle-acesso", "hospitais-base", "escolas-topo", "galpoes-base"),
  "alarmes-e-cameras": grupo("cameras-celular", "cameras-cidade", "casas-topo", "galpoes-topo"),
  manobrista: grupo("casas-base", "condominios-base", "empresas-base", "industrias-base"),
  "limpeza-e-conservacao": [
    foto("limpeza", "50% 0%"),
    ...grupo("hospitais-base", "escolas-base", "empresas-base"),
  ],
  "limpeza-pos-obra": [
    foto("limpeza", "50% 100%"),
    ...grupo("casas-topo", "galpoes-base", "condominios-base"),
  ],
  zeladoria: grupo("condominios-base", "escolas-base", "casas-base", "empresas-topo"),
  manutencao: grupo("galpoes-topo", "industrias-base", "condominios-topo", "hospitais-base"),
  jardinagem: grupo("escolas-base", "casas-topo", "condominios-base", "empresas-topo"),
  "mensageiro-e-recepcionista": grupo("recepcao", "empresas-topo", "condominios-topo", "hospitais-base"),
  "interinos": grupo("empresas-topo", "recepcao", "condominios-base", "escolas-topo"),
};
