export type Segmento = {
  slug: string;
  nome: string;
  singular: string;
  artigo: string;
  foto: string;
  alt: string;
};

export const segmentos: Segmento[] = [
  {
    slug: "condominios",
    nome: "Condomínios",
    singular: "Condomínio",
    artigo: "um condomínio",
    foto: "condominios-base.jpg",
    alt: "Fachada de vidro na entrada de um edifício",
  },
  {
    slug: "empresas",
    nome: "Empresas",
    singular: "Empresa",
    artigo: "uma empresa",
    foto: "empresas-base.jpg",
    alt: "Cadeira de escritório diante de uma mesa de reunião",
  },
  {
    slug: "casas",
    nome: "Casas",
    singular: "Casa",
    artigo: "uma casa",
    foto: "casas-topo.jpg",
    alt: "Casa moderna de dois andares com varanda de vidro",
  },
  {
    slug: "galpoes",
    nome: "Galpões",
    singular: "Galpão",
    artigo: "um galpão",
    foto: "galpoes-base.jpg",
    alt: "Piso de concreto de um galpão amplo",
  },
  {
    slug: "hospitais",
    nome: "Hospitais",
    singular: "Hospital",
    artigo: "um hospital",
    foto: "hospitais-base.jpg",
    alt: "Cadeiras de espera na recepção de um hospital",
  },
  {
    slug: "escolas",
    nome: "Escolas",
    singular: "Escola",
    artigo: "uma escola",
    foto: "escolas-base.jpg",
    alt: "Canteiros com árvores no pátio de uma escola",
  },
  {
    slug: "industrias",
    nome: "Indústrias",
    singular: "Indústria",
    artigo: "uma indústria",
    foto: "industrias-base.jpg",
    alt: "Tubulações e estrutura iluminada de uma planta industrial",
  },
];

export function segmentoPorSlug(slug: string) {
  return segmentos.find((s) => s.slug === slug);
}
