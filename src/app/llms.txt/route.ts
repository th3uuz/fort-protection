import { paginas } from "@/lib/seo";
import { grupos, servicos } from "@/lib/servicos";
import { site } from "@/lib/site";

export function GET() {
  const home = paginas["/"];

  const principais = ["/", "/servicos", "/sobre", "/contato"]
    .filter((c) => paginas[c])
    .map((c) => {
      const url = c === "/" ? site.url : `${site.url}${c}`;
      return `- [${paginas[c].h1}](${url}): ${paginas[c].description}`;
    });

  const porGrupo = (Object.keys(grupos) as (keyof typeof grupos)[]).map((g) => {
    const itens = servicos
      .filter((s) => s.grupo === g)
      .map((s) => `- [${s.nome}](${site.url}/servicos/${s.slug}): ${s.descricao}`);
    return `## ${grupos[g]}\n\n${itens.join("\n")}`;
  });

  const corpo = [
    `# ${site.name}`,
    `> ${home.description}`,
    `Empresa de segurança patrimonial e facilities sediada em ${site.city}. CNPJ ${site.cnpj}. Atendimento: ${site.hours}.`,
    `## Páginas`,
    principais.join("\n"),
    ...porGrupo,
    `## Contato\n\n- Telefone/WhatsApp: ${site.phoneDisplay} (${site.whatsapp})\n- E-mail: ${site.email}\n- Instagram: ${site.instagram}`,
  ].join("\n\n");

  return new Response(`${corpo}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
