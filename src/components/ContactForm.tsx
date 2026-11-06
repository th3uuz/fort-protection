"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { contato } from "@/lib/conteudo";
import { sendContact } from "@/lib/contact";
import { montarPedido } from "@/lib/orcamento";
import { segmentos } from "@/lib/segmentos";
import { servicos } from "@/lib/servicos";
import { site } from "@/lib/site";
import styles from "./ContactForm.module.css";

type Estado = "ocioso" | "enviando" | "sucesso" | "falha";
type Erros = Partial<Record<"nome" | "email" | "mensagem" | "outro", string>>;

const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const uid = useId();
  const [segmento, setSegmento] = useState("");
  const [outroLocal, setOutroLocal] = useState("");
  const [servicosSel, setServicosSel] = useState<string[]>([]);
  const [aberto, setAberto] = useState(false);
  const caixaServicos = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<Estado>("ocioso");
  const [motivo, setMotivo] = useState<"no-provider" | "error">("no-provider");
  const [erros, setErros] = useState<Erros>({});
  const [copia, setCopia] = useState({ nome: "", mensagem: "" });

  useEffect(() => {
    const aoEscolher = (evento: Event) => {
      const slug = (evento as CustomEvent<string>).detail;
      if (typeof slug === "string") setSegmento(slug);
    };
    window.addEventListener("segmento", aoEscolher);
    return () => window.removeEventListener("segmento", aoEscolher);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: MouseEvent) => {
      if (!caixaServicos.current?.contains(e.target as Node)) setAberto(false);
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    document.addEventListener("mousedown", fora);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", fora);
      document.removeEventListener("keydown", tecla);
    };
  }, [aberto]);

  const alternarServico = (slug: string) =>
    setServicosSel((atual) =>
      atual.includes(slug) ? atual.filter((s) => s !== slug) : [...atual, slug],
    );

  const resumoServicos =
    servicosSel.length === 0
      ? "Selecione um ou mais"
      : servicosSel.length === 1
        ? (servicos.find((s) => s.slug === servicosSel[0])?.nome ?? "")
        : `${servicosSel.length} serviços selecionados`;

  const pedido = useMemo(
    () => montarPedido(segmento, outroLocal, servicosSel),
    [segmento, outroLocal, servicosSel],
  );

  const validar = (nome: string, email: string, mensagem: string) => {
    const novos: Erros = {};
    if (nome.trim().length < 2) novos.nome = "Informe seu nome.";
    if (!padraoEmail.test(email.trim())) novos.email = "Informe um e-mail válido.";
    if (segmento === "outro" && outroLocal.trim().length < 2) novos.outro = "Informe onde você precisa do serviço.";
    if (mensagem.trim().length < 3) novos.mensagem = "Escreva sua mensagem.";
    return novos;
  };

  const aoEnviar = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    const nome = String(dados.get("nome") ?? "");
    const email = String(dados.get("email") ?? "");
    const telefone = String(dados.get("telefone") ?? "");
    const mensagem = String(dados.get("mensagem") ?? "");
    const armadilha = String(dados.get("empresa_site") ?? "");

    const novos = validar(nome, email, mensagem);
    setErros(novos);
    if (Object.keys(novos).length > 0) return;

    if (armadilha) {
      setEstado("sucesso");
      return;
    }

    setCopia({ nome, mensagem });
    setEstado("enviando");
    const resultado = await sendContact({ nome, email, telefone, mensagem, pedido });
    if (resultado.ok) {
      setEstado("sucesso");
      return;
    }
    setMotivo(resultado.reason ?? "error");
    setEstado("falha");
  };

  const textoFinal = [
    pedido,
    copia.mensagem ? `Mensagem: ${copia.mensagem}` : "",
    copia.nome ? `Nome: ${copia.nome}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const whatsapp = `${site.whatsapp}?text=${encodeURIComponent(textoFinal)}`;
  const email = `mailto:${site.email}?subject=${encodeURIComponent("Pedido de orçamento")}&body=${encodeURIComponent(textoFinal)}`;

  if (estado === "sucesso") {
    return (
      <div className={styles.status} role="status">
        <p className={styles.statusTitulo}>Pedido enviado.</p>
        <p>Recebemos sua solicitação e vamos responder no horário de atendimento.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={aoEnviar} noValidate>
      <div className={styles.campos}>
        <div className={styles.campo} data-reveal style={{ ["--d" as string]: 0 }}>
          <label htmlFor="cf-nome">Nome*</label>
          <input
            id="cf-nome"
            name="nome"
            type="text"
            autoComplete="name"
            placeholder={contato.placeholders.nome}
            required
            aria-invalid={erros.nome ? true : undefined}
            aria-describedby={erros.nome ? "cf-nome-erro" : undefined}
          />
          {erros.nome ? (
            <p className={styles.erro} id="cf-nome-erro">
              {erros.nome}
            </p>
          ) : null}
        </div>
        <div className={styles.campo} data-reveal style={{ ["--d" as string]: 1 }}>
          <label htmlFor="cf-email">E-mail*</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={contato.placeholders.email}
            required
            aria-invalid={erros.email ? true : undefined}
            aria-describedby={erros.email ? "cf-email-erro" : undefined}
          />
          {erros.email ? (
            <p className={styles.erro} id="cf-email-erro">
              {erros.email}
            </p>
          ) : null}
        </div>
        <div className={styles.campo} data-reveal style={{ ["--d" as string]: 2 }}>
          <label htmlFor="cf-telefone">Telefone (opcional)</label>
          <input
            id="cf-telefone"
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
          />
        </div>
        <div className={styles.campo} data-reveal style={{ ["--d" as string]: 3 }}>
          <label htmlFor={`${uid}-onde`}>Onde você precisa do serviço?</label>
          <div className={styles.selecao}>
            <select
              id={`${uid}-onde`}
              name="onde"
              value={segmento}
              onChange={(e) => setSegmento(e.target.value)}
            >
              <option value="">Selecione</option>
              {segmentos.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.singular}
                </option>
              ))}
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>
        {segmento === "outro" ? (
          <div className={`${styles.campo} ${styles.largo}`}>
            <label htmlFor={`${uid}-outro`}>Qual local?</label>
            <input
              id={`${uid}-outro`}
              name="outro"
              type="text"
              value={outroLocal}
              onChange={(e) => setOutroLocal(e.target.value)}
              placeholder="Digite o local"
              aria-invalid={erros.outro ? true : undefined}
              aria-describedby={erros.outro ? `${uid}-outro-erro` : undefined}
            />
            {erros.outro ? (
              <p className={styles.erro} id={`${uid}-outro-erro`}>
                {erros.outro}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className={`${styles.campo} ${styles.largo}`} data-reveal style={{ ["--d" as string]: 3 }}>
          <span className={styles.rotulo} id={`${uid}-servico-rotulo`}>
            Quais serviços você precisa?
          </span>
          <div className={styles.multi} ref={caixaServicos}>
            <button
              type="button"
              className={styles.multiBotao}
              aria-haspopup="true"
              aria-expanded={aberto}
              aria-controls={`${uid}-servico-lista`}
              aria-labelledby={`${uid}-servico-rotulo ${uid}-servico-botao`}
              id={`${uid}-servico-botao`}
              onClick={() => setAberto((v) => !v)}
              data-vazio={servicosSel.length === 0 ? "" : undefined}
            >
              {resumoServicos}
            </button>
            {aberto ? (
              <ul className={styles.multiLista} id={`${uid}-servico-lista`}>
                {servicos.map((s) => (
                  <li key={s.slug}>
                    <label className={styles.multiOpcao}>
                      <input
                        type="checkbox"
                        name="servicos"
                        value={s.slug}
                        checked={servicosSel.includes(s.slug)}
                        onChange={() => alternarServico(s.slug)}
                      />
                      <span>{s.nome}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <div className={`${styles.campo} ${styles.largo}`} data-reveal style={{ ["--d" as string]: 3 }}>
          <label htmlFor="cf-mensagem">Mensagem*</label>
          <textarea
            id="cf-mensagem"
            name="mensagem"
            rows={5}
            placeholder={contato.placeholders.mensagem}
            required
            aria-invalid={erros.mensagem ? true : undefined}
            aria-describedby={erros.mensagem ? "cf-mensagem-erro" : undefined}
          />
          {erros.mensagem ? (
            <p className={styles.erro} id="cf-mensagem-erro">
              {erros.mensagem}
            </p>
          ) : null}
        </div>
        <div className={styles.armadilha} aria-hidden="true">
          <label htmlFor="cf-site">Não preencha este campo</label>
          <input id="cf-site" name="empresa_site" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className={styles.rodape} data-reveal style={{ ["--d" as string]: 4 }}>
        <button className="btn" type="submit" disabled={estado === "enviando"}>
          {estado === "enviando" ? "Enviando…" : contato.botao}
        </button>
        <p className={styles.privacidade}>Usamos seus dados só para responder a este pedido.</p>
      </div>

      {estado === "falha" ? (
        <div className={styles.status} role="status">
          <p className={styles.statusTitulo}>
            {motivo === "no-provider"
              ? "O envio por formulário ainda não está disponível."
              : "Não foi possível enviar agora."}
          </p>
          <p>Envie seu pedido por um destes canais, já com a mensagem escrita:</p>
          <div className={styles.alternativas}>
            <a className="btn" href={whatsapp} rel="noopener noreferrer" target="_blank">
              Enviar pelo WhatsApp
            </a>
            <a className={styles.linkEmail} href={email}>
              Enviar por e-mail
            </a>
          </div>
        </div>
      ) : null}
    </form>
  );
}
