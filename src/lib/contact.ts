export type ContactData = {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  pedido: string;
};

export type ContactResult = {
  ok: boolean;
  reason?: "no-provider" | "error";
};

async function enviarEmailJs(data: ContactData): Promise<ContactResult> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) {
    return { ok: false, reason: "no-provider" };
  }
  const resposta = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        mensagem: data.mensagem,
        pedido: data.pedido,
      },
    }),
  });
  return resposta.ok ? { ok: true } : { ok: false, reason: "error" };
}

async function enviarResend(data: ContactData): Promise<ContactResult> {
  const resposta = await fetch("/api/contato", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return resposta.ok ? { ok: true } : { ok: false, reason: "error" };
}

export async function sendContact(data: ContactData): Promise<ContactResult> {
  const provider = process.env.NEXT_PUBLIC_CONTACT_PROVIDER;
  try {
    if (provider === "emailjs") return await enviarEmailJs(data);
    if (provider === "resend") return await enviarResend(data);
  } catch {
    return { ok: false, reason: "error" };
  }
  return { ok: false, reason: "no-provider" };
}
