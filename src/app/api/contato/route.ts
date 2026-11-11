import { site } from "@/lib/site";

type Lead = { nome: string; email: string; telefone: string; mensagem: string; pedido: string };

const escapar = (valor: string) =>
  valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const linha = (rotulo: string, valor: string) =>
  `<tr><td style="padding:10px 0;border-bottom:1px solid #e6e8ee;width:110px;color:#6b7080;font-size:13px;vertical-align:top">${rotulo}</td><td style="padding:10px 0;border-bottom:1px solid #e6e8ee;color:#1f222e;font-size:15px;vertical-align:top">${valor}</td></tr>`;

function montarHtml(d: Lead) {
  const nome = escapar(d.nome);
  const email = escapar(d.email);
  const telefone = escapar(d.telefone);
  const mensagem = escapar(d.mensagem).replace(/\n/g, "<br>");
  const pedido = escapar(d.pedido);
  const digitos = d.telefone.replace(/\D/g, "");
  const wa = `https://wa.me/${digitos.startsWith("55") ? digitos : `55${digitos}`}`;
  return `<!doctype html><html lang="pt-BR"><body style="margin:0;padding:24px;background:#f3f4f7;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden">
<tr><td style="background:#1f222e;padding:24px 32px"><p style="margin:0;color:#ffffff;font-size:18px;font-weight:bold">${escapar(site.name)}</p><p style="margin:4px 0 0;color:#b8bccb;font-size:13px">Novo lead pelo site</p></td></tr>
<tr><td style="padding:28px 32px">
<p style="margin:0 0 16px;color:#1f222e;font-size:16px;font-weight:bold">${pedido}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${linha("Nome", nome)}
${linha("E-mail", `<a href="mailto:${email}" style="color:#1f222e">${email}</a>`)}
${linha("Telefone", `<a href="${wa}" style="color:#1f222e">${telefone}</a>`)}
${linha("Mensagem", mensagem)}
</table>
<p style="margin:24px 0 0"><a href="mailto:${email}" style="display:inline-block;background:#1f222e;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-size:14px">Responder lead</a></p>
</td></tr>
<tr><td style="padding:16px 32px;background:#f3f4f7;color:#6b7080;font-size:12px">Enviado pelo formulário de contato de ${escapar(site.url.replace("https://", ""))}</td></tr>
</table></body></html>`;
}

function montarTexto(d: Lead) {
  return `Novo lead pelo site\n\n${d.pedido}\n\nNome: ${d.nome}\nE-mail: ${d.email}\nTelefone: ${d.telefone}\nMensagem: ${d.mensagem}`;
}

export async function POST(request: Request) {
  const chave = process.env.RESEND_API_KEY;
  if (!chave) return Response.json({ ok: false }, { status: 503 });

  let corpo: Record<string, unknown>;
  try {
    corpo = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const texto = (campo: string, max: number) => String(corpo[campo] ?? "").trim().slice(0, max);
  const dados: Lead = {
    nome: texto("nome", 120),
    email: texto("email", 160),
    telefone: texto("telefone", 40),
    mensagem: texto("mensagem", 4000),
    pedido: texto("pedido", 500),
  };

  if (
    dados.nome.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email) ||
    dados.telefone.replace(/\D/g, "").length < 10 ||
    dados.mensagem.length < 3
  ) {
    return Response.json({ ok: false }, { status: 422 });
  }

  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? `${site.name} <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO ?? site.email],
      reply_to: dados.email,
      subject: `Novo lead: ${dados.nome}`,
      html: montarHtml(dados),
      text: montarTexto(dados),
    }),
  });

  if (!resposta.ok) {
    console.error("Resend recusou o envio:", resposta.status, await resposta.text());
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
