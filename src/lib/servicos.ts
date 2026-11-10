export type Grupo = "seguranca" | "facilities";

export type Duvida = {
  pergunta: string;
  resposta: string;
};

export type Servico = {
  slug: string;
  nome: string;
  h1: string;
  grupo: Grupo;
  descricao: string;
  intro: string;
  detalhes: string[];
  inclui: string[];
  duvidas: Duvida[];
  segmentos: string[];
  relacionados: string[];
  provisorio: true;
};

export const grupos: Record<Grupo, string> = {
  seguranca: "Segurança",
  facilities: "Facilities",
};

const orcamentoResposta =
  "Fale com a Fort Protection pelo WhatsApp ou por e-mail. O pedido de orçamento é sem compromisso.";

export const servicos: Servico[] = [
  {
    slug: "portaria-24-horas",
    nome: "Portaria 24 horas",
    h1: "Portaria 24 horas",
    grupo: "seguranca",
    descricao:
      "Serviço de portaria 24 horas contínua para garantir a segurança de sua propriedade e ativos.",
    intro:
      "Um porteiro no posto em todos os turnos, inclusive madrugadas, fins de semana e feriados. Nas férias dele, um interino assume.",
    detalhes: [
      "A portaria é o primeiro filtro de um condomínio ou de uma empresa. Com um porteiro em cada turno, quem chega é identificado antes de entrar e o que acontece no posto fica registrado.",
      "Combinamos com você as regras do local: quem pode entrar, como avisar os moradores e quem acionar quando algo sai da rotina. A equipe segue essas regras em todos os turnos e, nas férias do porteiro, um interino cobre o posto.",
    ],
    inclui: [
      "controle de entrada de moradores, visitantes e prestadores",
      "recebimento de encomendas e correspondências",
      "registro das ocorrências do turno",
      "contato com síndico ou administração quando algo sai da rotina",
    ],
    duvidas: [
      {
        pergunta: "A portaria funciona 24 horas mesmo?",
        resposta:
          "Sim. É um serviço de portaria 24 horas contínua para garantir a segurança de sua propriedade e ativos.",
      },
      {
        pergunta: "O que acontece quando o porteiro sai de férias?",
        resposta:
          "Um interino da Fort Protection cobre o posto do seu funcionário(a).",
      },
      { pergunta: "O orçamento tem custo?", resposta: orcamentoResposta },
    ],
    segmentos: ["condominios", "empresas", "hospitais", "escolas"],
    relacionados: [
      "controlador-de-acesso",
      "interinos",
      "mensageiro-e-recepcionista",
    ],
    provisorio: true,
  },
  {
    slug: "controlador-de-acesso",
    nome: "Controlador de acesso",
    h1: "Controlador de acesso",
    grupo: "seguranca",
    descricao: "Ajuda, auxilia e elabora organizações no local.",
    intro:
      "Quem entra passa por alguém que confere. Para recepções, portões e entradas de serviço com movimento.",
    detalhes: [
      "Em entradas com muito movimento, o fluxo vira fila e fica mais fácil alguém passar sem ser identificado. O controlador confere a autorização, registra quem passou e orienta quem chega.",
      "A rotina é ajustada ao local: horários de pico, entradas de serviço e áreas de acesso restrito. Ele trabalha junto com a portaria ou a recepção, para que a informação circule entre quem está nos postos.",
    ],
    inclui: [
      "identificação e registro de visitantes e prestadores",
      "conferência da autorização antes de liberar",
      "organização do fluxo na entrada",
      "comunicação com a portaria",
    ],
    duvidas: [
      {
        pergunta: "Em quais locais o controlador de acesso atua?",
        resposta:
          "Em condomínios, empresas, hospitais, escolas, galpões e indústrias, nas entradas com movimento.",
      },
      {
        pergunta: "Posso contratar junto com a portaria?",
        resposta:
          "Sim. No pedido de orçamento você marca todos os serviços de que precisa.",
      },
    ],
    segmentos: ["condominios", "empresas", "hospitais", "escolas", "industrias"],
    relacionados: [
      "portaria-24-horas",
      "manobrista",
      "mensageiro-e-recepcionista",
    ],
    provisorio: true,
  },
  {
    slug: "alarmes-e-cameras",
    nome: "Instalação de alarmes e câmeras",
    h1: "Instalação de alarmes e câmeras",
    grupo: "seguranca",
    descricao:
      "Sistemas de segurança eletrônica para beneficiar ainda mais seu patrimônio. Instalação de alarmes e câmeras para proteção eficaz contra invasões.",
    intro:
      "Câmeras e alarmes instalados nos pontos por onde alguém entraria.",
    detalhes: [
      "Antes de instalar, avaliamos o local: entradas, pontos de passagem e áreas que mais precisam de cobertura. Com isso, indicamos onde ficam as câmeras e os alarmes.",
      "Depois da instalação, orientamos moradores ou equipe sobre o uso no dia a dia. O objetivo é proteger o patrimônio contra invasões com um sistema que o cliente sabe operar.",
    ],
    inclui: [
      "visita para avaliar entradas e áreas a cobrir",
      "instalação de câmeras e alarmes",
      "orientação de uso para moradores ou equipe",
    ],
    duvidas: [
      {
        pergunta: "Vocês instalam alarmes e câmeras?",
        resposta:
          "Sim. A instalação de alarmes e câmeras é para proteção eficaz contra invasões.",
      },
      {
        pergunta: "Atendem casas e empresas?",
        resposta:
          "Atendemos condomínios, empresas, casas, galpões, hospitais, escolas e indústrias.",
      },
    ],
    segmentos: ["casas", "condominios", "empresas", "galpoes", "industrias"],
    relacionados: [
      "portaria-24-horas",
      "controlador-de-acesso",
      "manutencao",
    ],
    provisorio: true,
  },
  {
    slug: "manobrista",
    nome: "Manobrista",
    h1: "Manobrista",
    grupo: "seguranca",
    descricao:
      "O manobrista vai facilitar que seu acesso seja mais rápido no local e com toda certeza vai monitorar o seu patrimônio (Veículo).",
    intro: "O carro é recebido na entrada e estacionado, sem fila no portão.",
    detalhes: [
      "O manobrista recebe o veículo na entrada, estaciona e devolve na saída. Quem chega não precisa procurar vaga, e a fila no portão diminui.",
      "O serviço atende condomínios, empresas e hospitais, onde o carro precisa de atenção enquanto está no local. Combinamos com você os horários, o número de vagas e o fluxo de entrada e saída.",
    ],
    inclui: [
      "recepção do veículo",
      "estacionamento e retirada",
      "atenção ao veículo enquanto está no local",
    ],
    duvidas: [
      {
        pergunta: "O manobrista atende condomínios e empresas?",
        resposta: "Sim, em condomínios e empresas.",
      },
      { pergunta: "O orçamento tem custo?", resposta: orcamentoResposta },
    ],
    segmentos: ["condominios", "empresas", "hospitais"],
    relacionados: [
      "controlador-de-acesso",
      "portaria-24-horas",
      "mensageiro-e-recepcionista",
    ],
    provisorio: true,
  },
  {
    slug: "limpeza-e-conservacao",
    nome: "Limpeza e Conservação",
    h1: "Limpeza e Conservação",
    grupo: "facilities",
    descricao:
      "Serviço de limpeza e Conservação, mantém um ambiente bem mais aconchegante e organizado.",
    intro:
      "Limpeza diária das áreas comuns em uma escala combinada com você.",
    detalhes: [
      "A limpeza segue uma rotina combinada com você: quais áreas, em quais dias e em quais horários. Assim a equipe não atrapalha o movimento do local e o ambiente está em ordem quando as pessoas chegam.",
      "Além da limpeza do dia a dia, cuidamos da conservação de pisos, vidros e superfícies, para que o espaço mantenha a boa aparência com o tempo. Em escolas, hospitais e empresas, a escala se ajusta ao funcionamento de cada local.",
    ],
    inclui: [
      "limpeza de áreas comuns, recepções e escritórios",
      "conservação de pisos, vidros e superfícies",
      "reposição de materiais de higiene",
    ],
    duvidas: [
      {
        pergunta: "Atendem escolas e hospitais?",
        resposta:
          "Atendemos condomínios, empresas, casas, galpões, hospitais, escolas e indústrias.",
      },
      {
        pergunta: "Posso contratar limpeza junto com portaria?",
        resposta:
          "Sim. No pedido de orçamento você marca todos os serviços de que precisa.",
      },
    ],
    segmentos: ["condominios", "empresas", "escolas", "hospitais"],
    relacionados: ["limpeza-pos-obra", "zeladoria", "jardinagem"],
    provisorio: true,
  },
  {
    slug: "limpeza-pos-obra",
    nome: "Limpeza Pós Obra & Eventos",
    h1: "Limpeza Pós Obra & Eventos",
    grupo: "facilities",
    descricao:
      "Nossa empresa se responsabiliza em deixar o seu patrimônio, mais confortável e aconchegante após uma obra de grande e pequeno porte.",
    intro:
      "Depois da reforma, sobra poeira fina em tudo. A equipe deixa o lugar pronto para uso, seja a obra pequena ou grande.",
    detalhes: [
      "Depois de uma obra, o pó fino se espalha por pisos, vidros, esquadrias e azulejos, e o espaço ainda não está pronto para uso. A limpeza retira os resíduos e deixa o ambiente liberado para quem vai ocupá-lo. A limpeza de eventos segue a mesma ideia: o espaço volta a ficar em ordem logo depois.",
      "Atendemos obras pequenas e grandes. Conte o tipo de obra e o tamanho da área no pedido de orçamento, e combinamos o prazo e a equipe.",
    ],
    inclui: [
      "remoção de poeira e resíduos",
      "limpeza de pisos, vidros, esquadrias e azulejos",
      "ambiente pronto para uso",
    ],
    duvidas: [
      {
        pergunta: "Fazem limpeza pós obra de obra pequena?",
        resposta: "Sim. Atendemos obras de grande e pequeno porte.",
      },
      {
        pergunta: "Quanto custa a limpeza pós obra por m²?",
        resposta:
          "O valor depende da obra. Peça um orçamento sem compromisso.",
      },
    ],
    segmentos: ["casas", "condominios", "empresas", "escolas"],
    relacionados: ["limpeza-e-conservacao", "manutencao", "zeladoria"],
    provisorio: true,
  },
  {
    slug: "zeladoria",
    nome: "Zeladoria",
    h1: "Zeladoria",
    grupo: "facilities",
    descricao:
      "Análise de riscos e elaboração de estratégias personalizadas para proteger seu patrimônio.",
    intro: "Alguém que conhece o prédio e cuida dele no dia a dia.",
    detalhes: [
      "O zelador conhece a rotina do condomínio ou da empresa e acompanha o que acontece nas áreas comuns. Ele percebe cedo o que precisa de reparo e avisa o síndico ou a administração.",
      "Também acompanha os prestadores que entram para fazer algum serviço, para que o trabalho seja feito como combinado e o local fique em ordem depois.",
    ],
    inclui: [
      "verificação das áreas comuns",
      "acompanhamento de prestadores",
      "aviso ao síndico sobre o que precisa de reparo",
    ],
    duvidas: [
      {
        pergunta: "A zeladoria é só para condomínios?",
        resposta: "Atendemos condomínios e empresas.",
      },
      { pergunta: "O orçamento tem custo?", resposta: orcamentoResposta },
    ],
    segmentos: ["condominios", "empresas"],
    relacionados: ["manutencao", "jardinagem", "limpeza-e-conservacao"],
    provisorio: true,
  },
  {
    slug: "manutencao",
    nome: "Manutenção",
    h1: "Manutenção predial",
    grupo: "facilities",
    descricao: "Troca e concerto de uma necessidade do condomínio.",
    intro:
      "As trocas e os consertos que o condomínio precisa, sem esperar um técnico avulso.",
    detalhes: [
      "Trocas de lâmpadas e pequenos reparos se acumulam quando ninguém cuida deles. A manutenção predial resolve essas falhas do dia a dia com rotina, sem esperar um técnico avulso.",
      "Quando o problema exige um especialista, acompanhamos o prestador e avisamos a administração. Conte sua necessidade no pedido de orçamento para combinarmos o que entra no serviço.",
    ],
    inclui: [
      "pequenas trocas e reparos do dia a dia",
      "acompanhamento de prestadores especializados",
    ],
    duvidas: [
      {
        pergunta: "Que tipo de manutenção vocês fazem?",
        resposta:
          "Trocas e consertos do dia a dia. Conte sua necessidade no pedido de orçamento.",
      },
      { pergunta: "O orçamento tem custo?", resposta: orcamentoResposta },
    ],
    segmentos: ["condominios", "empresas"],
    relacionados: ["zeladoria", "limpeza-pos-obra", "alarmes-e-cameras"],
    provisorio: true,
  },
  {
    slug: "jardinagem",
    nome: "Jardinagem",
    h1: "Jardinagem",
    grupo: "facilities",
    descricao:
      "Serviço de Jardinagem, ajuda na priorização de insetos e ajuda a ter um ambiente mais elegante.",
    intro: "Áreas verdes podadas e cuidadas em uma frequência combinada.",
    detalhes: [
      "Poda, corte de grama, limpeza de canteiros e rega entram em uma frequência combinada com você. Áreas verdes cuidadas deixam o local mais agradável e bem apresentado.",
      "Atendemos condomínios, empresas, casas e escolas. A frequência e o tamanho da equipe dependem da área a cuidar.",
    ],
    inclui: [
      "poda e corte de grama",
      "limpeza de canteiros",
      "rega e cuidado das plantas",
    ],
    duvidas: [
      {
        pergunta: "A jardinagem atende casas?",
        resposta: "Atendemos condomínios, empresas e casas.",
      },
      { pergunta: "O orçamento tem custo?", resposta: orcamentoResposta },
    ],
    segmentos: ["condominios", "empresas", "casas", "escolas"],
    relacionados: ["zeladoria", "limpeza-e-conservacao", "manutencao"],
    provisorio: true,
  },
  {
    slug: "mensageiro-e-recepcionista",
    nome: "Mensageiro / Recepcionista",
    h1: "Mensageiro e recepcionista",
    grupo: "facilities",
    descricao:
      "Serviço de recepcionista/mensageiro facilita muito na necessidade do condomínio ou empresa.",
    intro:
      "Alguém na recepção para atender, anunciar e levar o que precisa ser levado.",
    detalhes: [
      "A recepção é o primeiro contato de quem chega. O recepcionista atende o visitante, anuncia a chegada e atende o telefone, e o mensageiro leva documentos e encomendas dentro do local.",
      "Em condomínios, empresas e hospitais, isso libera a equipe para o trabalho principal. Definimos com você o horário e as tarefas de cada posto.",
    ],
    inclui: [
      "atendimento de visitantes",
      "atendimento telefônico e recados",
      "entrega interna de documentos e encomendas",
    ],
    duvidas: [
      {
        pergunta: "O recepcionista atende empresas e condomínios?",
        resposta: "Sim, em condomínios e empresas.",
      },
      { pergunta: "O orçamento tem custo?", resposta: orcamentoResposta },
    ],
    segmentos: ["condominios", "empresas", "hospitais"],
    relacionados: [
      "portaria-24-horas",
      "controlador-de-acesso",
      "interinos",
    ],
    provisorio: true,
  },
  {
    slug: "interinos",
    nome: "Interinos",
    h1: "Interinos",
    grupo: "facilities",
    descricao:
      "Interinos na disposição para efetuar a cobertura do posto, do seu funcionário(a).",
    intro:
      "Quando seu funcionário sai de férias, um interino da Fort Protection assume o posto.",
    detalhes: [
      "Férias e faltas deixam o posto descoberto. O interino da Fort Protection assume o lugar do seu funcionário e segue a rotina do local.",
      "Combinamos as datas com antecedência, para organizar a cobertura. Atendemos portaria, zeladoria, limpeza e recepção.",
    ],
    inclui: [
      "interino para portaria, zeladoria, limpeza e recepção",
      "combinado com antecedência",
    ],
    duvidas: [
      {
        pergunta: "Como funcionam os interinos?",
        resposta:
          "Temos interinos para cobrir as férias do seu funcionário(a).",
      },
      {
        pergunta: "Posso combinar a cobertura com antecedência?",
        resposta: "Sim. Fale com a Fort Protection e combine as datas.",
      },
    ],
    segmentos: ["condominios", "empresas", "hospitais", "escolas"],
    relacionados: [
      "portaria-24-horas",
      "mensageiro-e-recepcionista",
      "zeladoria",
    ],
    provisorio: true,
  },
];

export function servicoPorSlug(slug: string) {
  return servicos.find((s) => s.slug === slug);
}

export function servicosDoGrupo(grupo: Grupo) {
  return servicos.filter((s) => s.grupo === grupo);
}
