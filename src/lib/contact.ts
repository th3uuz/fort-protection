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

export async function sendContact(data: ContactData): Promise<ContactResult> {
  try {
    const resposta = await fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (resposta.ok) return { ok: true };
    return { ok: false, reason: resposta.status === 503 ? "no-provider" : "error" };
  } catch {
    return { ok: false, reason: "error" };
  }
}
