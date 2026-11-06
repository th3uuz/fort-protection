import { segmentos } from "./segmentos";
import { servicos } from "./servicos";

export function rotuloServico(slug: string, nome: string) {
  return nome.toLowerCase().replace(" / ", " e ");
}

function juntar(itens: string[]) {
  if (itens.length <= 1) return itens.join("");
  return `${itens.slice(0, -1).join(", ")} e ${itens[itens.length - 1]}`;
}

export function montarMensagem(segmentoSlug: string, servicosSlugs: string[]) {
  const segmento = segmentos.find((s) => s.slug === segmentoSlug);
  const lista = servicos
    .filter((s) => servicosSlugs.includes(s.slug))
    .map((s) => rotuloServico(s.slug, s.nome));
  if (!segmento && lista.length === 0) return "Olá, quero um orçamento.";
  const onde = segmento ? `sou de ${segmento.artigo} e ` : "";
  const oQue = lista.length > 0 ? ` de ${juntar(lista)}` : "";
  return `Olá, ${onde}quero um orçamento${oQue}.`;
}

export function montarPedido(segmentoSlug: string, outroLocal: string, servicosSlugs: string[]) {
  const outro = outroLocal.trim();
  if (segmentoSlug !== "outro") return montarMensagem(segmentoSlug, servicosSlugs);
  const lista = servicos
    .filter((s) => servicosSlugs.includes(s.slug))
    .map((s) => rotuloServico(s.slug, s.nome));
  const oQue = lista.length > 0 ? ` de ${juntar(lista)}` : "";
  const onde = outro ? `o local é ${outro} e ` : "";
  return `Olá, ${onde}quero um orçamento${oQue}.`;
}
