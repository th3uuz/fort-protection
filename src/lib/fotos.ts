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
  "acesso-catracas": "Catracas com leitor de acesso em um saguão de prédio",
  "acesso-lobby": "Saguão de prédio com bloqueadores metálicos no piso e parede de vidro",
  "cameras-parede": "Duas câmeras de segurança tipo domo fixadas na quina de uma parede",
  "manobrista-chave": "Mão entregando a chave de um carro",
  "limpeza-aspirador": "Profissional de limpeza de luvas aspirando o carpete de um escritório",
  "limpeza-corredor": "Auxiliar de limpeza com carrinho e esfregão em um corredor de prédio",
  "posobra-aspirador": "Aspirador industrial no piso de um cômodo logo após a obra",
  "posobra-salao": "Salão amplo em fase final de obra com escada e tubulações no piso",
  "zeladoria-reparo": "Profissional de luvas instalando uma luminária com parafusadeira",
  "manutencao-quadro": "Eletricista de capacete diante de um quadro de distribuição elétrica",
  "manutencao-multimetro": "Técnico medindo um circuito elétrico com multímetro",
  "jardinagem-cerca": "Jardineiro uniformizado podando uma cerca viva com tesoura",
  "jardinagem-arbusto": "Mãos de jardineiro podando um arbusto com tesoura",
  "recepcao-balcao": "Recepcionistas em um balcão de atendimento, uma delas ao telefone",
  "recepcao-lobby": "Recepcionista atrás do balcão de um saguão movimentado",
  "interinos-equipe": "Equipe de três profissionais de macacão laranja com aspiradores",
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
  servicos: grupo("cameras-celular", "limpeza-aspirador", "acesso-catracas", "recepcao-balcao"),
  contato: grupo("cameras-cidade", "casas-topo", "empresas-base", "hospitais-base"),
  "portaria-24-horas": grupo("condominios-topo", "condominios-base", "empresas-topo", "casas-topo"),
  "controlador-de-acesso": grupo("acesso-catracas", "acesso-lobby", "controle-acesso", "galpoes-base"),
  "alarmes-e-cameras": [
    foto("cameras-parede", "50% 15%"),
    ...grupo("cameras-celular", "cameras-cidade", "casas-topo"),
  ],
  manobrista: grupo("manobrista-chave", "casas-base", "condominios-base", "empresas-base"),
  "limpeza-e-conservacao": grupo("limpeza-aspirador", "limpeza-corredor", "hospitais-base", "escolas-base"),
  "limpeza-pos-obra": [
    foto("posobra-aspirador", "50% 65%"),
    ...grupo("posobra-salao", "galpoes-base", "condominios-base"),
  ],
  zeladoria: [
    foto("zeladoria-reparo", "50% 15%"),
    ...grupo("condominios-base", "escolas-base", "casas-base"),
  ],
  manutencao: [
    foto("manutencao-quadro", "50% 40%"),
    ...grupo("manutencao-multimetro", "galpoes-topo", "industrias-base"),
  ],
  jardinagem: grupo("jardinagem-cerca", "jardinagem-arbusto", "escolas-base", "casas-topo"),
  "mensageiro-e-recepcionista": grupo("recepcao-balcao", "recepcao-lobby", "empresas-topo", "hospitais-base"),
  "interinos": [
    foto("interinos-equipe", "50% 55%"),
    ...grupo("empresas-topo", "condominios-base", "escolas-topo"),
  ],
};

export const fotosInclui: Record<string, Foto> = {
  "alarmes-e-cameras": foto("cameras-parede", "50% 20%"),
  manobrista: foto("manobrista-chave"),
  zeladoria: foto("zeladoria-reparo", "50% 20%"),
  interinos: foto("interinos-equipe", "50% 60%"),
};
