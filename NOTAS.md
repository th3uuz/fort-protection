# NOTAS — Fort Protection Patrimonial

## Stack
- Next.js (App Router, TypeScript). Regra do usuário: sites sempre em Next.js.
- Fontes via `next/font`: Newsreader (títulos) e Hanken Grotesk (texto).
- Publicação na Vercel feita pelo usuário. Sem remoto git.

## Dados da empresa
- Fonte única: `src/lib/site.ts`.
- Ano do copyright é dinâmico (`new Date().getFullYear()`).

## Pendências do cliente
- Endereço completo (hoje: "Rua, Jaracatia - São Paulo"). JSON-LD sem endereço até confirmar.
- CNPJ: placeholder `00.000.000/0000-00` em `src/lib/site.ts`.
- Provedor de e-mail do formulário: EmailJS ou Resend (decisão do usuário).
- Textos provisórios para validação: FAQ e serviços sem base em `info.md` (Mensageiro/Recepcionista, Zeladoria, Manutenção, Jardinagem, Controlador de acesso, Manobrista).
- Depoimentos: atribuição nome/texto ambígua no site antigo, mantida como está por decisão do usuário.

## Direção de design
- `editorial-report`: faixa de imagem no topo, título grande, eixo vertical a 42%, blocos de cor sólida, sem gradientes, sombras, eyebrows ou mono.
- Paleta (do logo): ink `#0b0d10`, paper `#f3efe6`, gold `#c9a24b`.

## Dados e textos (subtarefa 2)
- `src/lib/servicos.ts`: 11 serviços. `descricao` é texto copiado do site antigo (não alterar). `intro`, `inclui` e `duvidas` são provisórios (`provisorio: true`).
- `src/lib/conteudo.ts`: textos copiados ou transcritos do site antigo (home, sobre, contato, depoimentos, indicadores). Não alterar.
- `src/lib/faq.ts`: perguntas e respostas provisórias; `pendente: true` marca resposta que depende do cliente.
- `src/lib/seo.ts`: title, description e H1 por página; `pageMetadata(path)`.
- Textos copiados mantêm os erros do original por decisão do usuário ("concerto", "priorização de insetos", "Mais enfim").
- Termos novos como "armada" e "escolta" não entram. "Vigilância" só se já existir no site antigo.
- Não mencionar portaria remota, manobrista para eventos nem monitoramento de câmeras.

## Respostas provisórias para o cliente validar
- FAQ: "O orçamento tem custo?", "Quanto custa a limpeza pós-obra por m²?", "Em quais regiões de São Paulo vocês atendem?", "Onde fica a empresa?".
- Intro, "O que inclui" e dúvidas de todos os 11 serviços.

## Formulário de contato (subtarefa 6)
- `src/lib/contact.ts` expõe `sendContact()`. Provedor escolhido por `NEXT_PUBLIC_CONTACT_PROVIDER` (`emailjs` ou `resend`). Variáveis em `.env.example`.
- EmailJS: preencher `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` e `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. O template recebe `nome`, `email`, `telefone`, `mensagem` e `pedido`.
- Resend: chave secreta não pode ir para o navegador. Ao escolher Resend, criar a rota `src/app/api/contato/route.ts` (o formulário já envia POST JSON para `/api/contato`) com a chave em variável de ambiente do servidor.
- Sem provedor configurado, o formulário mostra os botões de WhatsApp e e-mail com o pedido já escrito.

## Para o cliente validar (lista final)
- Textos provisórios: introdução, "O que inclui" e dúvidas das 11 páginas de serviço (`src/lib/servicos.ts`, campo `provisorio`); todas as respostas do FAQ (`src/lib/faq.ts`); respostas marcadas `pendente` (custo do orçamento, região, endereço, preço de pós-obra).
- Textos copiados do site antigo mantêm erros de digitação do original ("concerto", "priorização de insetos", "Mais enfim"). Depoimentos não podem ser alterados.
- "Vigilância" não aparece no site; só termos que já existiam no site antigo são usados.
- Fotos: todas de banco de imagem do material enviado. Foto real da equipe e dos postos melhoraria o site.
- Foto `controle-acesso.jpg` vem do Unsplash (stock): trocar por foto própria quando houver.
- `imagens/post-instagram-publicacao.png` ficou sem uso: o recorte só entraria se o design pedisse, e não pediu.
- Publicação (Vercel, feita pelo usuário): domínio canônico `https://www.fortprotectionpatrimonial.com.br`; os 2 redirects só valem depois que o DNS apontar para a Vercel; depois, enviar o sitemap ao Search Console.

## Layout compacto (Melhoria 9)
- Componentes novos: `ServiceCard` (card com foto, nome e descrição), `SegmentIndex` (grade 4 colunas com célula de título; `interativo` na home leva ao formulário, `tom` troca dourado por escuro), `SegmentTiles` (fotos dos locais atendidos nas páginas de serviço), `Icones` (alvo, olho, diamante).
- `Masthead` agora é só o mosaico (3 colunas x 2 linhas: 4 fotos + 1 bloco dourado) e preenche o container pai; `PageHero` e o hero da home usam duas metades (6fr/5fr).
- Tokens: `--gap-section` clamp(32px, 4vw, 56px), `--gap` clamp(12px, 1.4vw, 20px), `--margin` clamp(16px, 2.2vw, 32px). `--axis` segue só no cabeçalho, em /contato e em /faq.
- Performance: não usar `data-reveal` em fotos ou textos da primeira dobra (o item fica invisível até a hidratação e atrasa o LCP). Fotos de card usam `sizes` com 120px no celular.
- Aviso de hidratação no `next dev` (classe `is-in` aplicada antes da hidratação) é só de desenvolvimento; no build de produção o console fica limpo.

## FAQ e cabeçalho (Melhorias 11 e 12)
- FAQ vive só na home (`#perguntas`), dados em `src/lib/faq.ts`; o schema `perguntasFrequentes()` entra no JSON-LD da home. Respostas continuam provisórias e as marcadas `pendente` dependem do cliente.
- Cabeçalho: `Header` (servidor, monta a lista de serviços), `HeaderNav` (dropdown desktop) e `MobileMenu` (acordeão). Itens de menu em `nav` de `src/lib/site.ts`.
