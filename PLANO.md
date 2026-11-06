# PLANO — Fort Protection Patrimonial

Status: **APROVADO pelo usuário. Executado (subtarefas 1 a 8).**

Legenda de textos: **[C]** copiado do site antigo, intocável · **[T]** transcrito de imagem do site antigo, intocável · **[N]** novo, escrito por nós (passa pelo /humanizer) · **[P]** novo e provisório, para o cliente validar (passa pelo /humanizer).

---

## 1. Decisões fechadas

| Tema | Decisão |
|---|---|
| Stack | Next.js 16 (App Router, TS), já criado. Antes de cada API, ler `node_modules/next/dist/docs/` (Next 16 mudou APIs: `priority` do `next/image` foi substituído por `preload`/`fetchPriority`; `cacheComponents` ligado). |
| Subtarefa 1 | Concluída e commitada (`0f587d5`): projeto, tokens, header/footer, `NOTAS.md`. |
| Direção | editorial-report. Sheet da skill: "The printed annual", seed `1821439055` (`.taste-skill/direction.json`). |
| Paleta | Do logo: ink `#0b0d10`, paper `#f3efe6`, gold `#c9a24b`. A paleta do sheet (cinza/menta/laranja) não é usada: restrição de marca. |
| Tipografia | Newsreader (títulos) + Hanken Grotesk (texto), via `next/font`. O par do sheet (Gambarino/General Sans) não é usado: decisão do usuário. |
| Serviços (11) | Portaria 24 horas; Limpeza e Conservação; Instalação de alarmes e câmeras; Em caso de férias (interinos); Mensageiro/Recepcionista; Zeladoria; Manutenção; Jardinagem; Controlador de acesso; Manobrista; Limpeza pós-obra. |
| Textos de serviço | Descrição curta de cada serviço = texto [C] da página antiga de serviços (ver Anexo A). Todo o resto das páginas de serviço é [P]. |
| Endereço | "Rua, Jaracatia - São Paulo" [C], mantido. Sem endereço no JSON-LD até o cliente confirmar. |
| CNPJ | Placeholder `00.000.000/0000-00`. |
| Horário | Escritório 08:00–18:00 [C]. Portaria 24h é serviço, não horário da empresa. |
| Prova social | Depoimentos, nomes e indicadores mantidos como no site antigo [C]. |
| Formulário | `sendContact()` isolada em `src/lib/contact.ts`; provedor (EmailJS ou Resend) decidido depois. Sem provedor configurado: fallback `mailto:` + WhatsApp. |
| FAQ | Perguntas e respostas [P]. |
| Redes | Só Instagram e Facebook. |
| Copyright | Ano dinâmico. |
| Keywords | Sem ferramenta paga. Proxy: autocomplete do Google pt-BR (consultado em 2026-11-04) + SERP qualitativa. Não traz volume (limitação declarada). |
| Git | Commit por subtarefa, sem remoto. Vercel fica com o usuário. |

Mudanças em relação ao plano anterior que dependem do seu ok (padrão adotado se você não disser nada):

- **H1 da home: "Segurança patrimonial em São Paulo"** [N] (34 caracteres, quebra em "Segurança patrimonial" / "em São Paulo"). Decisão do usuário: só "Segurança patrimonial" é pouco para SEO. Palavra-chave + local no H1; "facilities" fica no title, na description e no H2. O slogan "Protegendo seu patrimônio com excelência." [C] continua na primeira tela, inteiro, como primeira frase do texto de apoio. O tamanho do H1 da home é calculado para a linha de 21 caracteres caber (ver §4.3).
- **Slugs:** `limpeza-e-conservacao` e `mensageiro-e-recepcionista`, com "e" (mais legíveis).
- **Wordmark do rodapé em paper, não em ouro:** o ouro fica para a ação, o campo dourado e o seletor do orçamento.

## 2. Arquitetura de informação, URLs e SEO por página

### 2.1 Mapa

```
/
/sobre                       (mantida, existia no site antigo)
/servicos
/servicos/[slug]             (11 páginas estáticas, generateStaticParams)
/faq
/contato
```

Navegação principal: Serviços · Sobre Nós · Perguntas · Contato + botão "Pedir orçamento". Os links levam rótulos de um substantivo só. O botão principal tem o mesmo nome no site inteiro.

### 2.2 Title, description, H1 e keywords

Title absoluto por página (sem template automático, porque "| Fort Protection Patrimonial" estoura 60). Contagem feita em caracteres.

| URL | Title (≤60) | Description (~150, com CTA) | H1 único | Keyword principal · secundárias |
|---|---|---|---|---|
| `/` | Segurança patrimonial e facilities em SP \| Fort Protection (58) | Portaria 24 horas, limpeza, zeladoria, controle de acesso e alarmes para condomínios, empresas e casas em São Paulo. Peça seu orçamento pelo WhatsApp. (150) | Segurança patrimonial em São Paulo | empresa de segurança patrimonial em São Paulo · portaria terceirizada em São Paulo · terceirizada portaria e limpeza · facilities SP |
| `/sobre` | Sobre a Fort Protection Patrimonial \| Segurança em SP (53) | Conheça a Fort Protection Patrimonial: segurança patrimonial e facilities com profissionais qualificados em São Paulo. Veja missão e valores e fale conosco. (156) | Sobre a Fort Protection | empresa de segurança patrimonial · segurança patrimonial empresas |
| `/servicos` | Serviços de segurança e facilities em SP \| Fort Protection (58) | Portaria 24 horas, controlador de acesso, alarmes e câmeras, limpeza, zeladoria, jardinagem e mais 5 serviços terceirizados. Escolha e peça seu orçamento. (154) | Serviços de Segurança e Facilities [C] | terceirização de serviços · empresa de facilities SP · terceirização de serviços limpeza |
| `/servicos/portaria-24-horas` | Portaria 24 horas terceirizada em SP \| Fort Protection (54) | Portaria 24 horas terceirizada para condomínios e empresas em São Paulo, com cobertura de férias por interinos. Peça um orçamento sem compromisso. (146) | Portaria 24 horas | portaria 24 horas terceirizada · portaria terceirizada em São Paulo · empresa de portaria |
| `/servicos/controlador-de-acesso` | Controle de acesso terceirizado em SP \| Fort Protection (55) | Controlador de acesso terceirizado para condomínios, empresas, hospitais e escolas em São Paulo. Conte como é o seu local e peça seu orçamento. (143) | Controlador de acesso | controle de acesso terceirizado · controlador de acesso para condomínio |
| `/servicos/alarmes-e-cameras` | Instalação de alarmes e câmeras de segurança em SP (50) | Instalação de alarmes e câmeras de segurança para casas, condomínios, empresas e galpões em São Paulo. Proteção contra invasões. Peça seu orçamento. (148) | Instalação de alarmes e câmeras | instalação de câmeras de segurança · instalação de alarme residencial · câmeras residencial |
| `/servicos/manobrista` | Serviço de manobrista para condomínios \| Fort Protection (56) | Manobrista terceirizado para condomínios e empresas em São Paulo: acesso mais rápido e atenção ao seu veículo. Peça um orçamento pelo WhatsApp. (143) | Manobrista | manobrista para condomínio · serviço de manobrista |
| `/servicos/limpeza-e-conservacao` | Limpeza e conservação para condomínios \| Fort Protection (56) | Limpeza e conservação terceirizada para condomínios, empresas, escolas e hospitais em São Paulo. Ambiente limpo e organizado. Peça seu orçamento. (145) | Limpeza e Conservação [C] | empresa de limpeza e conservação · limpeza e conservação predial · terceirização de limpeza |
| `/servicos/limpeza-pos-obra` | Limpeza pós-obra em São Paulo \| Fort Protection (47) | Limpeza pós-obra profissional para obras de pequeno e grande porte em São Paulo. Orçamento sem compromisso: fale com a Fort Protection pelo WhatsApp. (149) | Limpeza pós-obra | limpeza pós obra SP · limpeza pós obra valor · limpeza pós obra preço m2 |
| `/servicos/zeladoria` | Zeladoria condominial em São Paulo \| Fort Protection (52) | Zeladoria terceirizada para condomínios e empresas em São Paulo, com cuidado do patrimônio e de quem vive no local. Peça seu orçamento à Fort Protection. (153) | Zeladoria | zeladoria condominial · zelador terceirizado |
| `/servicos/manutencao` | Manutenção predial para condomínios \| Fort Protection (53) | Manutenção predial terceirizada para condomínios e empresas em São Paulo: trocas e consertos do dia a dia. Peça seu orçamento à Fort Protection. (144) | Manutenção predial | manutenção predial São Paulo · manutenção predial empresas |
| `/servicos/jardinagem` | Jardinagem para condomínios e empresas \| Fort Protection (56) | Jardinagem terceirizada para condomínios, empresas e casas em São Paulo: áreas verdes cuidadas e ambiente mais elegante. Peça seu orçamento. (140) | Jardinagem | jardinagem para condomínio · preço jardinagem condomínio |
| `/servicos/mensageiro-e-recepcionista` | Recepcionista e mensageiro terceirizados \| Fort Protection (58) | Recepcionista e mensageiro terceirizados para condomínios e empresas em São Paulo, com atendimento na recepção do seu prédio. Peça seu orçamento. (145) | Mensageiro e recepcionista | empresa terceirizada recepcionista SP · serviço de recepcionista terceirizada |
| `/servicos/cobertura-de-ferias` | Cobertura de férias de porteiro e equipe \| Fort Protection (58) | Interinos para cobrir as férias do porteiro, zelador ou recepcionista do seu condomínio ou empresa em São Paulo. O posto não fica vazio. Peça orçamento. (152) | Cobertura de férias | cobertura de férias portaria · interino portaria · portaria folguista |
| `/faq` | Perguntas frequentes \| Fort Protection Patrimonial (50) | Dúvidas sobre portaria 24 horas, limpeza pós-obra, cobertura de férias, horário e orçamento da Fort Protection Patrimonial. Veja as respostas e fale conosco. (157) | Perguntas frequentes | segurança patrimonial o que faz · cauda longa por serviço |
| `/contato` | Contato e orçamento \| Fort Protection Patrimonial (49) | Fale com a Fort Protection Patrimonial pelo WhatsApp (11) 96711-6990 ou por e-mail. Atendimento das 08:00 às 18:00. Peça seu orçamento de segurança. (148) | Entre em Contato Conosco [C] | orçamento segurança patrimonial · busca de marca |

Regras: H1 com no máximo 34 caracteres (cabe em 2 linhas em todas as larguras, ver §4.3). Descriptions sem prometer preço, prazo, certificação ou vigilância armada.

### 2.3 H2 por página

- **/**: Segurança Eficaz [C] · Serviços de Segurança e Facilities [C] · Limpeza Pós-Obra Profissional [C] · Em caso de Férias [C] · Quem nós atendemos ? [C] · Depoimentos [N] · Peça seu orçamento [N] · Localização Segura [C]
- **/sobre**: Quem somos nós [C] · Missão, visão e valores [N] (H3: Missão, Visão, Valores [T]) · Quem nós atendemos? [C] · Localização Segura [C]
- **/servicos**: Segurança [N] · Facilities [N] · Peça seu orçamento [N]
- **/servicos/[slug]**: O que inclui [P] · Onde atendemos [N] · Dúvidas sobre {serviço} [N] · Peça orçamento de {serviço} [N] · Outros serviços [N]
- **/faq**: Contratação e orçamento · Serviços · Atendimento [N]
- **/contato**: Fale Conosco [C] · Peça seu orçamento [N] · Localização Segura [C]

### 2.4 Evidência de keywords (autocomplete Google pt-BR, 2026-11-04)

| Semente | Sugestões úteis | Uso |
|---|---|---|
| segurança patrimonial | o que faz, empresas, vagas, salário, curso | "o que faz" vira pergunta da FAQ; ignorar vagas/salário/curso |
| empresa de segurança patrimonial | em são paulo | title/H2 da home |
| portaria terceirizada | em são paulo, em guarulhos; "terceirizada portaria e limpeza"; "portaria remota terceirizada" | home e portaria; remota só se o cliente oferecer |
| limpeza pós obra | sp, valor, preço m2, guarulhos | página pós-obra; FAQ explica que o valor depende da obra, sem publicar preço |
| instalação de câmeras | de segurança preço, residencial, perto de mim | alarmes-e-cameras |
| instalação de alarme | automotivo (domina), residencial | mirar "alarme residencial", nunca automotivo |
| jardinagem condomínio | para condomínio, preço | jardinagem |
| zeladoria condominial | (termo exato) | zeladoria |
| controlador de acesso | vagas, salário, 12x36, curso (intenção de emprego) | textos falam com o contratante: "terceirizado", "para condomínio" |
| manobrista para | condomínio, eventos; vagas | mirar condomínio; eventos só se confirmado |
| recepcionista terceirizada | empresa terceirizada recepcionista sp, serviço de | mensageiro-e-recepcionista |
| manutenção predial | são paulo, empresas; salário, curso | manutencao |
| cobertura de férias | CLT, direitos, adicional (intenção trabalhista) | title usa "cobertura de férias de porteiro"; texto fala de interino para o posto |
| empresa de limpeza e conservação | predial | limpeza-e-conservacao |

Limitação: o autocomplete só mostra o que existe, não quanto é buscado. Depois da publicação, o Search Console (consultas e impressões) substitui esta tabela.

### 2.5 Linkagem interna

- Header: 4 links + botão. Footer: os 11 serviços em uma coluna, mais Sobre, Perguntas, Contato, WhatsApp, e-mail, Instagram, Facebook.
- Home: cada uma das 11 linhas de serviço é um link para a sua página. "Limpeza Pós-Obra" e "Em caso de Férias" levam às páginas deles. Clicar em um segmento de "Quem nós atendemos" já marca esse local no orçamento (`#orcamento`).
- Página de serviço: breadcrumb (Início › Serviços › Nome), 3 "Outros serviços" (2 do mesmo grupo e 1 do outro), link para /faq e CTA para WhatsApp com o serviço já escrito na mensagem.
- Grupos: **Segurança** = portaria-24-horas, controlador-de-acesso, alarmes-e-cameras, manobrista · **Facilities** = limpeza-e-conservacao, limpeza-pos-obra, zeladoria, manutencao, jardinagem, mensageiro-e-recepcionista, cobertura-de-ferias.
- FAQ: cada resposta que cita um serviço linka para a página dele.
- Texto âncora descritivo. Sem "Saiba mais" ou "Clique aqui": o Lighthouse marca esses textos e eles não dizem nada.

## 3. SEO técnico e dados estruturados

- **Domínio canônico:** `https://www.fortprotectionpatrimonial.com.br`, sem barra final. Hoje o apex já redireciona para www (Hostinger); manter isso na Vercel (configuração do usuário).
- **Metadata:** helper `pageMetadata(path)` em `src/lib/seo.ts` lê a tabela §2.2 e devolve `title` absoluto, `description`, `alternates.canonical`, `openGraph` (type, locale `pt_BR`, siteName, url, title, description, images) e `twitter` (`summary_large_image`). Sem `meta keywords`.
- **OG image:** `src/app/opengraph-image.jpg` 1200×630, gerada a partir de `banner-home.jpg` (arte da marca: escudo e nome). Só para compartilhamento, não aparece no site. Alt: "Fort Protection Patrimonial".
- **Ícones:** `src/app/icon.png` (512) e `apple-icon.png` (180) a partir de `logo-fort-protection.png`; remover o `favicon.ico` padrão do Next.
- **sitemap.ts:** 16 URLs (/, /sobre, /servicos, 11 serviços, /faq, /contato), `lastModified` = data do build.
- **robots.ts:** `allow: /`, `sitemap` e `host` com o domínio canônico.
- **Redirects** (`next.config.ts`, `permanent: true` = 308), a partir das URLs reais do sitemap e do menu do site antigo:
  - `/httpswwwfortprotectionpatrimonialcombrsegurancapatrimonial` → `/servicos`
  - `/httpscontatemefortprotection` → `/contato`
  - `/sobre` continua igual, sem redirect.
- **JSON-LD** (componente `<JsonLd>` que escapa `<`; dados em `src/lib/schema.ts`):
  - Em todas as páginas: `Organization` com `@id` `…/#organization`, name, url, logo, email, telephone `+55-11-96711-6990`, `sameAs` [Instagram, Facebook], `areaServed` São Paulo (City), `contactPoint` (customer service, pt-BR). Sem `address` e sem `openingHoursSpecification` até o cliente confirmar endereço e dias. Quando confirmar, vira `LocalBusiness` com `address`, `geo` e horário.
  - Home: `WebSite` (name, url, `publisher` → organization).
  - Páginas de serviço: `Service` (name, serviceType, description, url, `provider` → organization, `areaServed` São Paulo) + `BreadcrumbList`.
  - /sobre, /servicos, /faq, /contato: `BreadcrumbList`. /sobre também tem `AboutPage`, /contato tem `ContactPage`.
  - /faq: `FAQPage` com as perguntas da página. O Google hoje só mostra rich result de FAQ para sites de governo e saúde. O schema continua válido, mas não conte com o destaque.
  - **Sem `Review`/`AggregateRating`.** Avaliação publicada pela própria empresa não gera estrela no Google, e a autoria dos depoimentos é ambígua.
- **Validação:** Rich Results Test e validator.schema.org em uma página de cada tipo (subtarefa 8).
- **Pós-publicação (usuário):** Search Console com propriedade de domínio, envio do sitemap, inspeção das 2 URLs redirecionadas e Perfil da Empresa no Google quando o endereço estiver completo.

## 4. Design

### 4.1 Inventário do assunto (o que só esta empresa tem)

1. O nome "Fort Protection" (forte, fortaleza) e o escudo dourado com leão coroado.
2. Preto e ouro do logo; "PATRIMONIAL" espaçado abaixo do nome.
3. Os 7 lugares atendidos, com foto própria do site antigo: Condomínios, Empresas, Casas, Galpões, Hospitais, Escolas, Indústrias.
4. Os 4 indicadores do site: +95%, +90%, 100%, 100%.
5. Portaria 24 horas contínua e escritório das 08:00 às 18:00.
6. "Interinos na disposição para efetuar a cobertura do posto": o posto nunca fica vazio.
7. Limpeza pós-obra "de grande e pequeno porte".
8. Missão, visão e valores (imagem do site antigo).
9. Rua Jaracatiá, São Paulo.
10. WhatsApp como canal principal.

### 4.2 Ideia central

> Nesta página, **os sete lugares que a Fort Protection atende e os quatro números do próprio site** viram **o masthead em mosaico e as figuras de um relatório anual impresso em duas cores, o preto e o ouro do escudo**.

Teste do concorrente: outra empresa de portaria pode copiar o formato de relatório, mas não tem estes 7 segmentos fotografados, estes 4 números nem este escudo. A ideia passa pelo material, não pelo formato. Os serviços entram como o sumário do relatório (as linhas escuras), e cada página interna abre com o seu próprio mosaico.

**Live thing: "Orçamento em duas escolhas"** (home `#orcamento` e /contato):
- Escolha 1: onde (7 opções, radio): Condomínio, Empresa, Casa, Galpão, Hospital, Escola, Indústria.
- Escolha 2: o quê (11 serviços, checkbox).
- Uma frase ao vivo, em tamanho de statement, monta a mensagem com o artigo certo: "Olá, sou de um condomínio e quero um orçamento de portaria 24 horas e zeladoria." (`aria-live="polite"`).
- Botão "Enviar pelo WhatsApp" (`wa.me/5511967116990?text=…`) e link "Prefiro e-mail" (`mailto:` com assunto e corpo).
- Usa só dados reais (segmentos e serviços). No celular, as opções são alvos de 48px ou mais, em 2 colunas. Sem JS: os controles aparecem, a frase mostra um texto padrão e os dois botões abrem WhatsApp e e-mail sem mensagem pronta.
- Em /contato o mesmo componente vira a primeira parte do formulário (`sendContact()`).

### 4.3 Tokens

Cores (existentes, mais duas):

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#0b0d10` | chão padrão (página escura), texto em campos claros |
| `--ink-2` | `#14181d` | degrau de superfície, linhas alternadas |
| `--ink-3` | `#1b2027` | **novo**, segunda linha alternada e tiles do mosaico |
| `--paper` | `#f3efe6` | texto no escuro, campo claro |
| `--paper-2` | `#e6e0d2` | degrau no campo claro, opção não marcada no orçamento |
| `--gold` | `#c9a24b` | botão, campo dourado (Segurança Eficaz, orçamento), tile do mosaico |
| `--gold-deep` | `#9c7a2c` | só preenchimento, nunca texto em paper |
| `--muted` | `#b9b4a6` | texto secundário **só no escuro** |
| `--muted-paper` | `#5c574c` | **novo**, texto secundário em paper e ouro |

Contraste calculado (WCAG):
- paper/ink 16,9:1 · gold/ink 8,1:1 (texto ok) · ink/gold 8,1:1 (botão ok) · muted/ink 9,4:1 · muted-paper/paper 6,3:1.
- **Proibido:** gold sobre paper (2,1:1), paper sobre gold (2,1:1), muted sobre paper (1,9:1), gold-deep como texto em paper (3,5:1).
- Foco: contorno gold de 3px no escuro; dentro de `.field-paper` e `.field-gold` o contorno passa a ser ink (o ouro sobre paper não chega a 3:1).

Tipografia (5 tamanhos, nada além):

| Passo | Valor | Uso |
|---|---|---|
| `--step--1` | clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem) | **novo**: legal, breadcrumb, legenda (mínimo 13px) |
| `--step-0` | já existe (17–20px) | texto corrido, links, botões |
| `--step-1` | já existe (20–26px) | standfirst, statement no celular, títulos de linha |
| `--step-2` | já existe (32–64px) | H2, statements grandes até 36px no desktop |
| `--step-3` | já existe (40–112px) | H1 das páginas internas, figuras do relatório |
| H1 da home | clamp(2.1rem, 5.2vw, 4.75rem) | variante do step-3, só no masthead da home; linha de 21 caracteres ("Segurança patrimonial"); ajustar por screenshot em 375/768/1440 |

Conta das 2 linhas: a partir do eixo, a medida é cerca de 800px a 1440 de largura. H1 da home: "Segurança patrimonial" (21 caracteres) com k≈0,45 a 75px ocupa cerca de 710px e cabe nos 800px; no celular (343px) a 9,5vw (≈36px) cabe a linha inteira. Se o screenshot mostrar 3 linhas, reduzir o tamanho, nunca cortar o texto. H1 de página interna de até 34 caracteres (17 por linha) pede no máximo 94px; usar clamp(2.5rem, 6vw, 6rem). No celular (343px úteis): home a 13vw (49px); internas a 10,5vw (até 40px).

Display em Newsreader 500–600, tracking -0.03 a -0.04em, entrelinha 0.92–1. Texto em Hanken 400/500, entrelinha 1.5, 45–75 caracteres por linha. `font-variant-numeric: tabular-nums` nas figuras.

Espaço: margens `--margin` 16–32px, iguais dos dois lados. Eixo `--axis: 42%`, único em todo o site (os 34% do blueprint "about" passam a ser 42%). Gap entre seções de 120–200px no desktop. Botão retangular de canto reto, 48px de altura, preenchimento gold e texto ink; uma forma só no site inteiro.

### 4.4 Regras da skill aplicadas

Sem eyebrow, mono, numeração 01/02, linha fina, gradiente, sombra em repouso, glass, emoji, card com ícone, fileira de cards iguais ou palavra destacada no título. Títulos em até 2 linhas em 375/768/1440. Um H1 por página e um título em toda seção. No mínimo 4 fotos reais por página (o mosaico garante isso). Statements como `<p>`/`<blockquote>`, com no máximo 36px no desktop e 24px no celular. Texto sobre foto só com scrim neutro, e nunca sobre headline.

Ajustes ao sheet, com motivo: tipo e paleta seguem a marca. O cabeçalho zigue-zague de 3 linhas do blueprint "features" passa a ter 2 linhas (regra de 2 linhas). O blueprint "intro" vira a página de figuras, porque as 4 colunas de 40–70 palavras não existem no conteúdo real e os 4 indicadores sim. O texto de 12px do footer passa para `--step--1`.

### 4.5 Imagens

**Tratamento único:** todas as fotos em preto e branco, com o greyscale aplicado no arquivo pelo script de recorte (`sharp`: `grayscale()`, `modulate({ brightness: 1.2 })`, `linear(1.05)`), então sem `filter` em CSS. Cantos retos, sem moldura, mosaico sem gutter. Proporções: tiles do mosaico em `cover`, retrato 4:5 e quadrado 1:1.

**Recortes:** as fotos `carrossel-atendimento-*.jpg` (1080×1920) têm o nome do segmento escrito no centro, com sombra. O script corta duas faixas sem o texto: **topo** (y 0–44%) e **base** (y 56–100%), cada uma com 1080×845. Saída em `public/images/` com no máximo 1600px de largura.

| Arquivo gerado | Origem | Alt |
|---|---|---|
| `condominios-topo.jpg` | carrossel-atendimento-1 (topo) | Torres espelhadas de condomínio vistas de baixo |
| `condominios-base.jpg` | carrossel-atendimento-1 (base) | Fachada de vidro na entrada de um edifício |
| `empresas-topo.jpg` | carrossel-atendimento-2 (topo) | Teto e janelas de uma sala de escritório |
| `empresas-base.jpg` | carrossel-atendimento-2 (base) | Mesa de trabalho com computador em um escritório |
| `casas-topo.jpg` | carrossel-atendimento-3 (topo) | Casa moderna de dois andares com varanda de vidro |
| `casas-base.jpg` | carrossel-atendimento-3 (base) | Entrada de veículos pavimentada diante de uma casa |
| `galpoes-topo.jpg` | carrossel-atendimento-4 (topo) | Estrutura metálica e luminárias no teto de um galpão |
| `galpoes-base.jpg` | carrossel-atendimento-4 (base) | Piso de concreto de um galpão amplo |
| `hospitais-base.jpg` | carrossel-atendimento-5 (base) | Cadeiras de espera na recepção de um hospital |
| `escolas-topo.jpg` | carrossel-atendimento-6 (topo) | Prédio de dois andares em volta do pátio de uma escola |
| `escolas-base.jpg` | carrossel-atendimento-6 (base) | Canteiros com árvores no pátio de uma escola |
| `industrias-topo.jpg` | carrossel-atendimento-7 (topo) | Chaminé iluminada de uma indústria à noite |
| `industrias-base.jpg` | carrossel-atendimento-7 (base) | Tubulações e estrutura iluminada de uma planta industrial |
| `cameras-cidade.jpg` | cameras-na-cidade.jpg | Câmera de segurança voltada para a cidade iluminada à noite |
| `cameras-celular.jpg` | servico-cameras.jpg | Câmera de segurança no teto e celular com as imagens de quatro ambientes |
| `limpeza.jpg` | servico-interfone-1.jpg (o nome do arquivo engana: é limpeza) | Profissional de limpeza uniformizado passando mop no piso de um corredor envidraçado |
| `recepcao.jpg` | servico-seguranca-1.jpg (612×408, usar no máximo a 612px) | Atendente ao telefone em uma mesa de recepção |
| `controle-acesso.jpg` | stock-aeroporto-fila-seguranca.jpg (Unsplash) | Ponto de inspeção com esteira e câmeras na entrada de um terminal |

O topo de `hospitais` (luminárias borradas) fica de fora: é fraco.

**Arte da marca (não é foto):** `logo-fort-protection.png` vai no header (44px), em `icon.png` e em `apple-icon.png`. `banner-home.jpg` vira só a imagem OG.

**Não usar:**
- `apresentacao-fort-protection.png`: arte com gradiente, repete o banner.
- `depoimento-mulher.png`: rosto de banco de imagem; ao lado de um depoimento, parece cliente real.
- `missao-visao-valores.jpg` e `servico-interfone-2.jpeg`: texto embutido na imagem, que transcrevemos como [T].
- `qualidade.jpg`: marca d'água da Freepik (risco de licença).
- `qualidade-crescimento.jpg`: clichê de banco de imagem, com brilho.
- `post-instagram-publicacao.png`: tem texto embutido. Uso autorizado pelo usuário: o recorte da direita (x 66–100%) entra em limpeza-pos-obra, sem o texto embutido, se ficar bom no design.

**Crédito:** a foto `controle-acesso.jpg` (Unsplash) leva "Foto: Unsplash" em `--step--1` no rodapé da página onde aparece. Nenhuma legenda explica de onde vêm as fotos.

**Onde não há foto do serviço:** o mosaico usa as fotos dos lugares onde o serviço acontece, mais tiles de cor sólida (gold, paper, ink-3). Não entram ícone, desenho genérico, caixa de placeholder ou foto de pessoa fingindo ser equipe.

### 4.6 Header e footer (todas as páginas)

- **Header** (blueprint: encostado na borda de cima do mosaico). Desktop: bloco ink à esquerda com logo de 44px e "Fort Protection Patrimonial"; uma aba paper com os 4 links em ink, do bloco até 42%; botão gold "Pedir orçamento" na margem direita. ≤900px: uma linha só, com o bloco da marca e `<details>`/`<summary>` "Menu", que abre um painel ink com os links e o botão (sem JS, fecha ao navegar). Hoje os links somem abaixo de 900px sem menu nenhum: isso precisa ser corrigido.
- **Footer** (blueprint "colunas em cima, wordmark embaixo"): chão ink, `min-height: 72svh`, grid `auto 1fr auto`. Em cima, 4 colunas: (1) "Segurança" [C] + "Protegemos seu patrimônio com excelência e confiança." [C]; (2) Serviços (11 links); (3) Sobre Nós, Perguntas, Contato; (4) WhatsApp, e-mail, Instagram, Facebook, endereço [C], horário [C]. Embaixo, "Fort Protection" em paper, da margem esquerda à direita, sem quebrar (SVG com `viewBox` ajustado ao texto). Linha legal em `--step--1`: "© {ano} Fort Protection Patrimonial. Todos os direitos reservados. CNPJ 00.000.000/0000-00." [N]. No celular: colunas 2×2 e wordmark em 2 linhas ("Fort" / "Protection").

### 4.7 Home: composição por seção

Argumento (uma afirmação e uma prova por seção):
1. O que é: segurança patrimonial e facilities em SP → mosaico dos lugares atendidos.
2. Dá para confiar → os 4 números [C].
3. O que fazem → os 11 serviços, cada um com o seu texto [C].
4. Dois diferenciais do site antigo → pós-obra e férias [C].
5. Para quem → os 7 lugares, com foto.
6. Quem já contratou → depoimento [C].
7. Pedir → orçamento em duas escolhas.
8. Onde e quando → Localização Segura [C], horário, canais.

| # | Seção · chão | Desktop (1440) | Celular (375) |
|---|---|---|---|
| 1 | **Masthead** · ink | Faixa de 52svh: grid 6×2 sem gutter. Linha 1: `galpoes-topo` (col 1–2), tile gold (col 3, nas 2 linhas), tile paper, `condominios-topo`, tile ink-3. Linha 2: tile ink-3, `cameras-cidade`, (gold), `industrias-topo`, tile ink-2, tile paper. Header por cima da borda superior. Abaixo: à esquerda (0–42%), o standfirst em `--step-1`, até 34ch: "Protegendo seu patrimônio com excelência." [C] + "Oferecemos soluções completas em terceirização, garantindo excelência em segurança patrimonial para residências, empresas e instituições." [C]. No eixo, o H1 "Segurança / patrimonial" em 2 linhas autorais, com a 1ª linha de base cerca de 110px abaixo da faixa. Embaixo do standfirst, botão "Pedir orçamento" (→ `#orcamento`) e link "Ver os 11 serviços". | Mosaico 3×2 em 38svh: `galpoes-topo` (2 col), tile gold, tile paper, `condominios-topo`, tile ink-3. H1 a 13vw na margem, standfirst a 17px logo abaixo, botão de largura total. |
| 2 | **Segurança Eficaz** · campo gold | H2 [C] no eixo; lead [C] no eixo como `<p>` de 30px, em 3 linhas. 96px abaixo, 4 colunas em toda a largura: figura em `--step-3` (tabular, ink) e o rótulo [C] embaixo, em `--step-0`. Sem caixas ou divisórias. | H2 e lead empilhados; figuras em 2×2. |
| 3 | **Serviços de Segurança e Facilities** · split paper/ink | Duas metades de 50vw coladas. Esquerda, paper, `position: sticky` (100svh): H2 [C] em 2 linhas, alinhado em cima, com o texto [C] e o link "Ver todos os serviços" embaixo, na mesma linha de base. Direita: 11 linhas que alternam ink-2/ink-3, cada uma sendo um link inteiro para `/servicos/{slug}`: nome em `--step-1` (5 partes) e texto [C] em `--step-0` (7 partes). Hover e foco sobem um degrau de tom e sublinham o nome. | Célula paper primeiro (H2, texto, link); as linhas vêm depois em largura total, com nome e texto empilhados. |
| 4 | **Limpeza Pós-Obra / Em caso de Férias** · campo paper | Esquerda (0–42%): `limpeza.jpg` em 4:5, sangrando até a borda esquerda, com altura igual à dos dois blocos. A partir do eixo: H2 "Limpeza Pós-Obra Profissional" [C], texto [C], link "Limpeza pós-obra"; 120px abaixo, H2 "Em caso de Férias" [C], texto [C], link "Cobertura de férias". | Foto 4:5 em largura total e os 2 blocos embaixo. |
| 5 | **Quem nós atendemos ?** · ink | Esquerda: H2 [C] + "Explore nossas soluções em segurança patrimonial e facilities." [C], sticky. A partir do eixo: os 7 nomes em Newsreader `--step-2`, um por linha. Com o mouse em cima ou foco em um nome, a foto dele aparece ancorada na linha (receita "Index with preview"). Clicar marca o local no orçamento e rola até `#orcamento`. Fotos: `condominios-base`, `empresas-base`, `casas-topo`, `galpoes-base`, `hospitais-base`, `escolas-base`, `industrias-base`. | Grid de 2 colunas com foto 4:3 e nome embaixo; a 7ª ocupa a linha inteira. |
| 6 | **Depoimentos** · ink-2 | H2 [N] no eixo. Esquerda (0–42%), em pares rótulo/valor: "João Silva" + ★★★★★ e "Fernanda Lukerberg" + ★★★★★ (estrelas com `aria-label="5 de 5 estrelas"`). No eixo: a chamada [C] como `<p>` em `--step-1` e, 48px abaixo, o `<blockquote>` [C] a 28–32px, com o "Mais enfim" do original. | Tudo empilhado na margem; blockquote a 22px. |
| 7 | **Peça seu orçamento** (`#orcamento`) · campo gold | H2 [N] na margem esquerda. Esquerda: fieldset "Onde você precisa do serviço?" [N], com 7 opções quadradas (paper-2 sem marcar, ink com texto paper quando marcada). A partir do eixo: fieldset "Quais serviços?" [N], com 11 checkboxes em 2 colunas. Embaixo, em largura total: a frase ao vivo em `--step-1`, mais o botão ink "Enviar pelo WhatsApp" e o link "Prefiro e-mail". | Opções em 2 colunas de 48px; frase e botão no fim; botão de largura total. |
| 8 | **Localização Segura** · ink | Blueprint "frase, retrato, dois links" em 12 colunas. Col 1–5: H2 [C] + statement [C] ("Estamos localizados em uma área estratégica…") em `--step-1`. Col 8–9: `recepcao.jpg` quadrada de 160px. Col 10–12: "Prefere falar agora?" [N] e os links "WhatsApp (11) 96711-6990" e o e-mail; embaixo, em `--muted`, "Rua, Jaracatia - São Paulo · 08:00 - 18:00" [C]. | Statement primeiro; foto de 96px à esquerda e links ao lado; endereço e horário em largura total. |
| 9 | Footer | §4.6 | §4.6 |

Total de fotos na home: 4 (mosaico) + 1 + 7 + 1 = 13.

### 4.8 Templates das páginas internas

**Masthead interno (todas):** faixa de 34svh, grid 6×1: foto principal (col 1–2), tile gold, 3 fotos. No celular: 3×2 em 26svh, com a principal (2 col), tile gold, 2 fotos e tile ink-3. Abaixo, H1 no eixo; à esquerda, breadcrumb em `--step--1` na mesma linha de base do H1 (nunca acima dele) e o standfirst.

| Página | Foto principal | Outras 3 |
|---|---|---|
| /sobre | condominios-base | empresas-topo, casas-topo, escolas-topo |
| /servicos | cameras-celular | limpeza, controle-acesso, recepcao |
| /contato | cameras-cidade | casas-topo, empresas-base, hospitais-base |
| /faq | escolas-base | galpoes-base, casas-base, industrias-base |
| portaria-24-horas | condominios-topo | condominios-base, empresas-topo, casas-topo |
| controlador-de-acesso | controle-acesso | hospitais-base, escolas-topo, galpoes-base |
| alarmes-e-cameras | cameras-celular | cameras-cidade, casas-topo, galpoes-topo |
| manobrista | casas-base | condominios-base, empresas-base, industrias-base |
| limpeza-e-conservacao | limpeza (foco nas mãos, em cima) | hospitais-base, escolas-base, empresas-base |
| limpeza-pos-obra | limpeza (foco no mop e no piso, embaixo) | casas-topo, galpoes-base, condominios-base |
| zeladoria | condominios-base | escolas-base, casas-base, empresas-topo |
| manutencao | galpoes-topo | industrias-base, condominios-topo, hospitais-base |
| jardinagem | escolas-base | casas-topo, condominios-base, empresas-topo |
| mensageiro-e-recepcionista | recepcao | empresas-topo, condominios-topo, hospitais-base |
| cobertura-de-ferias | empresas-topo | recepcao, condominios-base, escolas-topo |

**/servicos/[slug]** (dados em `src/lib/servicos.ts`, 11 páginas SSG):
1. Masthead + H1 + standfirst = descrição [C] do serviço.
2. **O que inclui** [P] · ink: página de texto, com H2 no eixo e lista `<ul>` de 4–5 itens em 2 colunas de 36ch; um parágrafo de introdução [P] com cerca de 50 palavras.
3. **Onde atendemos** · ink-2: à esquerda, pares rótulo/valor (Atendimento: 08:00 - 18:00 [C]; Cidade: São Paulo [C]); no eixo, os segmentos aplicáveis em Newsreader `--step-1`.
4. **Dúvidas sobre {serviço}** · ink: 2–3 `<details>` [P], sem schema.
5. **Peça orçamento de {serviço}** · campo gold: H2 + botão ink "Enviar pelo WhatsApp" com a mensagem "Olá, quero um orçamento de {serviço}." e link "Ver todas as opções" → `/contato`.
6. **Outros serviços** · ink: 3 links em `--step-2`, um por linha.

**/servicos:** masthead; H1 [C] e standfirst [C] ("Oferecemos soluções completas para proteção patrimonial e segurança de instalações empresariais e residenciais."). Depois, H2 **Segurança** e H2 **Facilities**: índice tipográfico (blueprint "nomes em colunas"), com o H2 nas colunas 1–3 e os serviços a partir do eixo, cada um com o nome em `--step-2` (link) e a descrição [C] embaixo. Fecha com um campo gold "Peça seu orçamento" (link para `/contato`).

**/sobre:**
1. Masthead; H1; standfirst "Protegendo seu patrimônio com excelência" [C] + "Na Fort Protection Patrimonial, oferecemos soluções de segurança…" [C].
2. **Quem somos nós** · ink: à esquerda, `condominios-topo` em 4:5 e, embaixo, pares rótulo/valor (Sede: São Paulo; Horário: 08:00 - 18:00; Atende: 7 tipos de local). A partir do eixo, os 3 parágrafos [C] em 2 colunas de 38ch.
3. **Missão, visão e valores** · campo gold: 3 blocos empilhados no eixo, cada um com H3 (Missão / Visão / Valores) e texto [T] em `--step-1`. Sem cards.
4. **Quem nós atendemos?** · ink: texto [C] + os 7 nomes em colunas + link "Ver os serviços".
5. **Localização Segura** · ink-2: texto [C], endereço [C], horário [C] e botão "Pedir orçamento".

**/contato:**
1. Masthead; H1 "Entre em Contato Conosco" [C]; standfirst [C] ("Estamos prontos para atender…").
2. Duas zonas. Esquerda (0–42%): H2 **Fale Conosco** [C], "(11) 9 6711-6990" [C] (link WhatsApp), "Suporte" [C] + e-mail; H2 **Localização Segura** [C] + texto [C], Endereço [C], Horário [C]. Direita (a partir do eixo, campo paper): H2 **Peça seu orçamento** [N] com o seletor de duas escolhas e mais Nome, E-mail, Telefone (opcional), Mensagem. Os labels são visíveis e ficam fora do placeholder; os placeholders vêm do site antigo [C]. Botão "Enviar solicitação de contato" [C]. Aviso curto de privacidade [P] embaixo do botão.
3. Estados: enviando (botão desabilitado, com "Enviando…"), sucesso (mensagem com `role="status"`), erro ou sem provedor (mensagem e botões WhatsApp e e-mail com o pedido já escrito). Honeypot contra spam.

**/faq:** masthead; H1; à esquerda, uma navegação sticky com os 3 grupos (âncoras); a partir do eixo, os grupos com H2 e perguntas em `<details>`/`<summary>` nativos (pergunta em `--step-1` e resposta em `--step-0`). Fecha com um campo gold "Não achou sua dúvida?" + WhatsApp.

### 4.9 Motion

- **Assinatura:** masked headline no H1 de todas as páginas: cada linha sobe por trás da própria linha de base em 700ms, com 90ms entre as linhas e 60ms de atraso inicial. O standfirst e o botão aparecem juntos depois. Só transform, e nunca `opacity: 0` no H1 (para não atrasar o LCP).
- **Mosaico:** os tiles entram em cascata (opacity + scale 1.04 → 1, 60ms entre eles) no carregamento. A maior foto do mosaico faz um scale lento de 1 → 1.06 em 20s, alternado (a imagem que se move).
- **Entradas:** `[data-reveal]` com IntersectionObserver uma vez por elemento: título → texto → foto, 70ms entre eles, subindo 24px. Atrás do gate `html.js`, que é posto por um script inline no `<head>`. Nunca em conteúdo acima da dobra.
- **Feedback:** botão com `:active` scale .97; hover (só com `hover: hover`) troca o fundo gold → paper; linhas de serviço sobem um degrau de tom; links ganham sublinhado; opções do orçamento mudam de fundo em 150ms.
- **Preview dos segmentos:** a foto entra com clip-path em 300ms.
- **`prefers-reduced-motion: reduce`:** sem deslocamento, sem scale e sem cascata. Todo o conteúdo fica visível e estático (o globals.css já zera as durações).
- Meta do inspector: 8 ou mais elementos em movimento na home (o ideal é 16 ou mais).

### 4.10 Celular

O celular tem composição própria: o eixo cai para a margem de 16px; as notas laterais (rótulo/valor, breadcrumb) entram em linha acima do parágrafo; os stickies são desligados; o split de serviços empilha; as figuras ficam 2×2; o menu é `<details>`; todo alvo de toque tem 44px ou mais; nada rola na horizontal em 375px.

## 5. Cópia (esboço)

### 5.1 Home

| Bloco | Texto | Tipo |
|---|---|---|
| H1 | Segurança patrimonial em São Paulo | N |
| Standfirst | Protegendo seu patrimônio com excelência. Oferecemos soluções completas em terceirização, garantindo excelência em segurança patrimonial para residências, empresas e instituições. | C |
| Botão / link | Pedir orçamento · Ver os 11 serviços | N |
| Segurança Eficaz | H2, parágrafo e os 4 indicadores com rótulos ("+95% Qualidade aumentada ao ano", "+90% Dos Clientes satisfeitos", "100% De Comprometimento com os nossos clientes", "100% De aceite com nosso orçamento") | C |
| Serviços | H2 "Serviços de Segurança e Facilities", texto e os 11 textos curtos do Anexo A | C |
| Link do split | Ver todos os serviços | N |
| Pós-obra | H2 "Limpeza Pós-Obra Profissional" + "Nossa empresa se responsabiliza em deixar o seu patrimônio, mais confortável e aconchegante após uma obra de grande e pequeno porte." | C |
| Férias | H2 "Em caso de Férias" + "Interinos na disposição para efetuar a cobertura do posto, do seu funcionário(a)." | C |
| Quem atendemos | H2 "Quem nós atendemos ?" + "Explore nossas soluções em segurança patrimonial e facilities." + 7 nomes do carrossel | C |
| Depoimentos | H2 "Depoimentos" | N |
| Depoimentos | Chamada, depoimento e nomes, como estão no Anexo A | C |
| Orçamento | H2 "Peça seu orçamento"; "Onde você precisa do serviço?"; "Quais serviços?"; frase "Olá, sou de {um condomínio} e quero um orçamento de {lista}."; padrão sem escolha: "Olá, quero um orçamento."; "Enviar pelo WhatsApp"; "Prefiro e-mail" | N |
| Localização | H2 "Localização Segura", texto, endereço e horário | C |
| Localização | "Prefere falar agora?" | N |

### 5.2 Páginas de serviço

Cada página: descrição [C] do Anexo A como standfirst, mais introdução, lista "O que inclui" e dúvidas [P]. Esboço:

| Serviço | Introdução [P] (rascunho) | O que inclui [P] |
|---|---|---|
| Portaria 24 horas | Um porteiro no posto em todos os turnos, inclusive madrugadas, fins de semana e feriados. Nas férias dele, um interino assume. | controle de entrada de moradores, visitantes e prestadores; recebimento de encomendas e correspondências; registro das ocorrências do turno; contato com síndico ou administração quando algo sai da rotina |
| Controlador de acesso | Quem entra passa por alguém que confere. Para recepções, portões e entradas de serviço com movimento. | identificação e registro de visitantes e prestadores; conferência da autorização antes de liberar; organização do fluxo na entrada; comunicação com a portaria |
| Instalação de alarmes e câmeras | Câmeras e alarmes instalados nos pontos por onde alguém entraria. | visita para avaliar entradas e áreas a cobrir; instalação de câmeras e alarmes; orientação de uso para moradores ou equipe |
| Manobrista | O carro é recebido na entrada e estacionado, sem fila no portão. | recepção do veículo; estacionamento e retirada; atenção ao veículo enquanto está no local |
| Limpeza e Conservação | Limpeza diária das áreas comuns em uma escala combinada com você. | limpeza de áreas comuns, recepções e escritórios; conservação de pisos, vidros e superfícies; reposição de materiais de higiene |
| Limpeza pós-obra | Depois da reforma, sobra poeira fina em tudo. A equipe deixa o lugar pronto para uso, seja a obra pequena ou grande. | remoção de poeira e resíduos; limpeza de pisos, vidros, esquadrias e azulejos; ambiente pronto para uso |
| Zeladoria | Alguém que conhece o prédio e cuida dele no dia a dia. | verificação das áreas comuns; acompanhamento de prestadores; aviso ao síndico sobre o que precisa de reparo |
| Manutenção | As trocas e os consertos que o condomínio precisa, sem esperar um técnico avulso. | pequenas trocas e reparos do dia a dia; acompanhamento de prestadores especializados |
| Jardinagem | Áreas verdes podadas e cuidadas em uma frequência combinada. | poda e corte de grama; limpeza de canteiros; rega e cuidado das plantas |
| Mensageiro e recepcionista | Alguém na recepção para atender, anunciar e levar o que precisa ser levado. | atendimento de visitantes; atendimento telefônico e recados; entrega interna de documentos e encomendas |
| Cobertura de férias | Quando seu funcionário sai de férias, um interino da Fort Protection assume o posto. | interino para portaria, zeladoria, limpeza e recepção; combinado com antecedência |

Dúvidas por serviço [P], 2–3 cada: por exemplo "Atendem condomínios pequenos?", "O orçamento tem custo?" e "Posso contratar junto com outro serviço?". As respostas usam só dados reais ou ficam marcadas [P].

### 5.3 Sobre, Serviços, Contato

Quase tudo [C]/[T] (ver §4.8 e o Anexo A). Novos: H1 "Sobre a Fort Protection" [N]; H2 "Missão, visão e valores" [N]; H2 "Segurança" e "Facilities" [N]; H2 "Peça seu orçamento" [N]; labels do formulário [N]; aviso de privacidade [P]: "Usamos seus dados só para responder a este pedido."

### 5.4 FAQ [P] (as respostas saem de dados reais; onde não há dado, a resposta fica marcada)

**Contratação e orçamento**
1. O que faz uma empresa de segurança patrimonial? → lista os 11 serviços e os 7 tipos de local, com links.
2. Como peço um orçamento? → WhatsApp, e-mail ou formulário, das 08:00 às 18:00.
3. O orçamento tem custo? → "É sem compromisso" (do post de pós-obra [T]; confirmar se vale para todos).
4. Posso contratar mais de um serviço? → sim; no pedido você marca todos.

**Serviços**
5. A portaria funciona 24 horas mesmo? → "portaria 24 horas contínua" [C].
6. Como funciona a cobertura de férias? → interinos cobrem o posto do seu funcionário(a) [C].
7. Fazem limpeza pós-obra de obra pequena? → "obra de grande e pequeno porte" [C].
8. Vocês instalam alarmes e câmeras? → sim [C]; sem falar de monitoramento até confirmar.
9. Quanto custa a limpeza pós-obra por m²? → depende da obra; peça orçamento (sem preço).

**Atendimento**
10. Quais locais vocês atendem? → os 7 segmentos [C].
11. Em quais regiões de São Paulo vocês atendem? → **pendente do cliente**.
12. Qual o horário de atendimento? → 08:00–18:00; a portaria contratada funciona 24h.
13. Onde fica a empresa? → "Rua, Jaracatia - São Paulo" [C] (pendente de endereço completo).

## 6. Metas de performance e acessibilidade (Lighthouse 90+ nas 4 categorias)

**Performance** (mobile do Lighthouse, que é o mais difícil):
- LCP < 2,5s, CLS < 0,1, TBT < 200ms.
- Todas as rotas estáticas (○/● no `next build`); com `cacheComponents`, nada de API dinâmica nas páginas. O ano do copyright não pode tornar rotas dinâmicas.
- `next/image` com `sizes` exato por posição (por exemplo, tile do mosaico com `(max-width: 900px) 34vw, 17vw`), `images.formats: ['image/avif','image/webp']` e `images.qualities: [70, 75]` no `next.config.ts`. Só a maior foto do mosaico leva `fetchPriority="high"` e `loading="eager"`; as outras do mosaico ficam eager com prioridade normal e o resto da página em lazy. `priority` não é usado (descontinuado no Next 16).
- Fontes: `next/font` com subset `latin` (já cobre ç, ã, õ, é), `display: swap`, fallback ajustado e só os pesos usados.
- JS: só 3 ilhas client (seletor de orçamento, formulário de contato, IntersectionObserver de reveal, este com menos de 1KB). Menu sem JS. Sem bibliotecas, analytics, mapa embutido ou vídeo.
- CSS: globals + CSS Modules, sem Tailwind.
- Imagens de origem já recortadas e com no máximo 1600px (pipeline da subtarefa 3).

**Acessibilidade:** contraste conforme §4.3, com as combinações proibidas fora do código; foco visível em ink ou gold conforme o campo; skip link (já existe); `lang="pt-BR"`; landmarks; ordem de títulos sem pular nível; alt em toda foto e `aria-hidden` nos tiles de cor; formulário com `<label>`, `fieldset`/`legend`, `autocomplete`, `inputmode="tel"`, erro ligado por `aria-describedby` e status com `aria-live`; alvos de 44px ou mais; links do texto corrido sublinhados; tudo operável pelo teclado (inclusive o preview dos segmentos com `:focus-visible` e o seletor); `prefers-reduced-motion`.

**Boas práticas:** zero erro no console, imagens na proporção certa, sem APIs descontinuadas, `rel="noopener noreferrer"` nos links externos e headers básicos (`X-Content-Type-Options`, `Referrer-Policy`) em `next.config.ts`.

**SEO:** title e description únicos, canonical, links rastreáveis, texto âncora descritivo, robots e sitemap válidos, `hreflang` não se aplica.

**Como medir:** sempre em `next build && next start`. Lighthouse mobile e desktop em /, /servicos/portaria-24-horas, /contato e /faq, salvos em `lighthouse/` (`.html` e `.json`).

## 7. Subtarefas 2 a 8

Cada uma: Sonnet, effort medium, `/clear` antes de começar. Começa lendo `PLANO.md` (seções indicadas), `NOTAS.md`, `PROGRESSO.md` e o guia do Next 16 da API envolvida. Termina com `npm run build` sem erro, `npm run lint` limpo, atualização do `PROGRESSO.md` e um commit (`Subtarefa N: …` + linha Co-Authored-By).

**2. Dados e textos** (§1, §2, §5, Anexo A)
- Arquivos: `src/lib/servicos.ts` (11 itens: slug, nome, grupo, descrição [C], intro [P], inclui [P], dúvidas [P], segmentos, relacionados, fotos), `src/lib/segmentos.ts` (7, com artigo "um/uma"), `src/lib/faq.ts`, `src/lib/seo.ts` (tabela §2.2 + `pageMetadata()`); `src/lib/site.ts` (horário mantém "Segunda a sexta, 08:00 às 18:00", confirmado pelo usuário; nav); `info.md` (acrescentar o Anexo A como "Coleta complementar"); `PROGRESSO.md` (nova lista 2–8); `NOTAS.md` (pendências novas).
- Pronto quando: os dados estão tipados, os textos [C]/[T] batem caractere por caractere com o Anexo A, todo [P] tem a marca `provisorio: true` e o build passa.

**3. Imagens e componentes base** (§4.3–4.6, §4.9)
- Arquivos: `scripts/crop-images.mjs` (sharp: recortes, greyscale, saídas da tabela §4.5, OG 1200×630, ícones); `public/images/*`; `src/app/icon.png`, `apple-icon.png`, `opengraph-image.jpg`; `src/components/Masthead.tsx` (variantes home e interna), `Header.tsx` (layout do blueprint + menu `<details>`, `priority` → `preload`), `Footer.tsx` (colunas + wordmark SVG), `Reveal.tsx` (IO), `Breadcrumb.tsx`; tokens novos no `globals.css` (`--ink-3`, `--muted-paper`, `--step--1`, foco por campo, masked headline, cascata do mosaico, reduced motion).
- Pronto quando: o script roda de novo e gera tudo de forma idêntica, nenhum recorte tem texto embutido, o header funciona com teclado em 375px e o build passa.

**4. Home** (§4.7, §5.1)
- Arquivos: `src/app/page.tsx` + `page.module.css`; `src/components/OrcamentoBuilder.tsx` (client; modos `whatsapp` e `form`); `SegmentIndex.tsx`.
- Pronto quando: as 9 seções existem na ordem certa, há 13 fotos, todo H1 e H2 tem até 2 linhas em 375/768/1440 (conferir com screenshot), o seletor gera a mensagem certa para os 7×11 casos e funciona sem JS, e `metadata` vem de `pageMetadata('/')`.

**5. Sobre, índice de serviços e template de serviço** (§4.8, §5.2–5.3)
- Arquivos: `src/app/sobre/page.tsx`, `src/app/servicos/page.tsx`, `src/app/servicos/[slug]/page.tsx` (`generateStaticParams`, `dynamicParams = false`, `notFound`), CSS Modules.
- Pronto quando: as 13 páginas saem estáticas no build, cada uma com H1 único, masthead de 4 fotos e links "Outros serviços", e um slug inválido dá 404.

**6. Contato, formulário e FAQ** (§4.8, §5.4, §1 Formulário)
- Arquivos: `src/lib/contact.ts` (`sendContact(data): Promise<{ ok: boolean; reason?: 'no-provider' | 'error' }>`, que lê `NEXT_PUBLIC_CONTACT_PROVIDER`; sem provedor, devolve `no-provider`), `src/components/ContactForm.tsx`, `src/app/contato/page.tsx`, `src/app/faq/page.tsx`, `.env.example`.
- Pronto quando: os estados enviando, sucesso, erro e sem provedor funcionam (testados com provedor ausente), o fallback abre WhatsApp e e-mail com o pedido já escrito, há validação nativa com mensagens em pt-BR, existe honeypot e as `<details>` abrem pelo teclado.

**7. SEO técnico e performance** (§3, §6)
- Arquivos: `src/lib/schema.ts`, `src/components/JsonLd.tsx`, JSON-LD em todas as páginas, `src/app/sitemap.ts`, `src/app/robots.ts`, `next.config.ts` (redirects, `images.formats`/`qualities`, headers), remoção do `favicon.ico` padrão e do title template do layout.
- Pronto quando: `/sitemap.xml` lista 16 URLs, `/robots.txt` está certo, os 2 redirects respondem 308, o JSON-LD valida (validator.schema.org) em uma página de cada tipo, toda página tem canonical e OG e o build mostra todas as rotas estáticas.

**8. Validação e revisão de textos** (§4.4, §6)
- Ordem: `lint.mjs` e `inspect.mjs` da skill sobre o build de produção (0 FAIL em 1440/768/390, ler os screenshots e escrever a crítica no formato `references/critique.md`) → `/web-design-guidelines` → `/playwright-cli` em 375, 768 e 1440 (home, 1 serviço, contato, FAQ, menu, seletor, formulário) → Lighthouse (§6) salvo em `lighthouse/` → `/humanizer` só nos textos [N]/[P] → correções → nova rodada de inspector e Lighthouse.
- Arquivos: correções pontuais, `lighthouse/*`, `.taste-skill/inspect/*`, `PROGRESSO.md` com as notas finais e `NOTAS.md` com a lista final de [P] para o cliente.
- Pronto quando: as 4 categorias têm 90 ou mais nas 4 páginas medidas (mobile e desktop), o inspector dá 0 FAIL, nenhum texto [C]/[T] foi alterado (diff contra o Anexo A) e há o commit final.

## 8. Riscos e pendências do cliente

**Riscos**
- **Vigilância e autorização:** decisão do usuário: termos que já existem no site atual (inclusive "vigilância") continuam, independente de autorização da Polícia Federal. Termos novos que não existem no site antigo (ex.: "armada", "escolta") não entram. Risco de conformidade assumido pelo usuário: vale o cliente confirmar a autorização.
- **Texto copiado com erro:** "Troca e concerto", "priorização de insetos", "Mais enfim", "Entra em contato", "Rua, Jaracatia". Regra: textos copiados não mudam; depoimentos nunca mudam. Pendente: o usuário só respondeu sobre depoimentos; nos demais textos copiados, manter igual.
- **Atribuição ambígua no site antigo:** o texto "Análise de riscos e elaboração de estratégias personalizadas…" aparece entre Zeladoria e Manutenção e parece sobra de template. Padrão: Zeladoria = "Análise de riscos…" e Manutenção = "Troca e concerto…", na ordem do DOM.
- **Depoimento:** "Segurança" logo depois de "Fernanda Lukerberg" provavelmente é o título do rodapé antigo, não o cargo dela. Padrão: mostrar só o nome e as estrelas.
- **Paper `#f3efe6`:** o inspector pode classificá-lo como "creme" (matiz ~42°, saturação ~35%). Com ouro, e não terracota, o par em tese passa. Se der FAIL, a proposta é reduzir a saturação para `#f2f0eb` e avisar antes de commitar.
- **Fotos de banco de imagem com rótulo embutido:** os recortes evitam o rótulo, mas as fotos continuam genéricas. Fotos reais da equipe e dos postos melhorariam muito o site.
- **`recepcao.jpg`** tem só 612px: nunca exibir maior que isso.
- **Indicadores** (+95%, 100% de aceite) sem fonte verificável: mantidos por decisão do usuário; vale o cliente confirmar que pode sustentá-los.
- **Migração:** os redirects só valem depois que o DNS apontar para a Vercel. Até lá, as URLs antigas continuam no Hostinger.
- **Next 16:** APIs diferentes do que os modelos conhecem; ler os docs locais antes de cada uso.

**Pendências do cliente** (vão para `NOTAS.md`): endereço completo; CNPJ; provedor de e-mail; regiões atendidas além de São Paulo; validação de todos os textos [P] (lista final na subtarefa 8); confirmação de missão, visão e valores [T]; fotos reais da equipe e dos locais (opcional).

## Perguntas

Respondidas pelo usuário:

1. Textos de depoimentos nunca são alterados. Demais textos copiados: manter igual.
2. Termos que já existem no site atual (inclusive "vigilância") ficam, independente da autorização da PF.
3. Escritório: segunda a sexta, 08:00 às 18:00.
4. Regiões: só "São Paulo" por enquanto.
5. Zeladoria e Manutenção: sem resposta; padrão (ordem do DOM) mantido.
6. `post-instagram-publicacao.png` e demais fotos: pode usar se o design achar que fica bom.
7. Portaria remota, manobrista para eventos e monitoramento das câmeras: não mencionar.
8. H1 da home precisa ser mais completo: "Segurança patrimonial em São Paulo".

---

## Anexo A — Textos do site antigo que não estão no info.md (coleta de 2026-11-04)

Fontes: `/httpswwwfortprotectionpatrimonialcombrsegurancapatrimonial` (title "Serviços-segurança patrimonial | FORT PROTECTION PATRIMONIAL", indexada no sitemap antigo) e `/httpscontatemefortprotection` (contato). Mais as transcrições de imagens. Todos são [C] ou [T]: copiar sem alterar.

**Página de serviços [C]**
- H1/título: Serviços de Segurança
- Oferecemos soluções completas para proteção patrimonial e segurança de instalações empresariais.
- Portaria 24 horas — Serviço de portaria 24 horas contínua para garantir a segurança de sua propriedade e ativos.
- Limpeza e Preservação — Serviço de limpeza e preservação, mantém um ambiente bem mais aconchegante. *(a home diz "Limpeza e Conservação" com outro texto; o site usa a versão da home, por decisão do usuário)*
- Sistemas de segurança eletrônica para beneficiar ainda mais seu patrimônio. Instalação de alarmes e câmeras para proteção eficaz contra invasões.
- Em caso de Férias — Interinos na disposição para efetuar a cobertura do posto, do seu funcionário(a) .
- Mensageiro / Recepcionista — Serviço de recepcionista/mensageiro facilita muito na necessidade do condomínio ou empresa.
- Zeladoria — Análise de riscos e elaboração de estratégias personalizadas para proteger seu patrimônio. *(atribuição ambígua)*
- Manutenção — Troca e concerto de uma necessidade do condomínio. *(atribuição ambígua)*
- Jardinagem — Serviço de Jardinagem, ajuda na priorização de insetos e ajuda a ter um ambiente mais elegante.
- Controlador de acesso — Ajuda, auxilia e elabora organizações no local.
- Manobrista — O manobrista vai facilitar que seu acesso seja mais rápido no local e com toda certeza vai monitorar o seu patrimônio (Veículo).

**Texto curto de cada serviço no site novo** (home, standfirst e /servicos):

| Serviço | Texto [C] | Origem |
|---|---|---|
| Portaria 24 horas | Serviço de portaria 24 horas contínua para garantir a segurança de sua propriedade e ativos. | home e serviços |
| Limpeza e Conservação | Serviço de limpeza e Conservação, mantém um ambiente bem mais aconchegante e organizado. | home |
| Instalação de alarmes e câmeras | Sistemas de segurança eletrônica para beneficiar ainda mais seu patrimônio. Instalação de alarmes e câmeras para proteção eficaz contra invasões. | home e serviços |
| Em caso de férias | Interinos na disposição para efetuar a cobertura do posto, do seu funcionário(a). | home |
| Mensageiro/Recepcionista | Serviço de recepcionista/mensageiro facilita muito na necessidade do condomínio ou empresa. | serviços |
| Zeladoria | Análise de riscos e elaboração de estratégias personalizadas para proteger seu patrimônio. | serviços (ambíguo) |
| Manutenção | Troca e concerto de uma necessidade do condomínio. | serviços (ambíguo) |
| Jardinagem | Serviço de Jardinagem, ajuda na priorização de insetos e ajuda a ter um ambiente mais elegante. | serviços |
| Controlador de acesso | Ajuda, auxilia e elabora organizações no local. | serviços |
| Manobrista | O manobrista vai facilitar que seu acesso seja mais rápido no local e com toda certeza vai monitorar o seu patrimônio (Veículo). | serviços |
| Limpeza pós-obra | Nossa empresa se responsabiliza em deixar o seu patrimônio, mais confortável e aconchegante após uma obra de grande e pequeno porte. | home |

**Página de contato [C]**
- Entre em Contato Conosco
- Estamos prontos para atender suas necessidades de segurança e preservação patrimonial. Entre em contato para mais informações sobre nossos serviços e soluções.
- Fale Conosco · (11) 9 6711-6990 · Suporte · contato@fortprotectionpatrimonial.com.br
- Placeholders: Seu nome completo aqui · Seu e-mail de contato* · Mensagem ou solicitação aqui* · Botão: Enviar solicitação de contato
- Localização Segura · Estamos localizados em uma área estratégica para oferecer segurança patrimonial de qualidade e proteção para sua empresa. · Endereço: Rua, Jaracatia  - São Paulo · Horário: 08:00 - 18:00

**Depoimentos (home e serviços) [C]**
- Chamada: A Fort Protection Patrimonial transformou nossa segurança, trazendo tranquilidade e confiança para nossos negócios.
- João Silva · ★★★★★ · "Sou grata a vocês por sempre fazerem um serviço verdadeiramente qualificado, a outra empresa que estava aqui vocês dão de 10 a 0" / "Mais enfim, parabéns pelos serviços que prestam."
- Fernanda Lukerberg · ★★★★★

**Transcrições de imagens [T]**
- `missao-visao-valores.jpg`: Missão — Inovar e atender com excelência as demandas e necessidades dos clientes oferecendo a melhor experiência em serviços de Segurança Patrimonial. · Visão — Manter o diferencial na criação e desenvolvimento de soluções voltadas a segurança e preservação de pessoas e seus patrimônios. · Valores — Qualidade, comprometimento com os resultados, respeito, qualificações, foco nas necessidades dos clientes.
- `servico-interfone-2.jpeg`: FÉRIAS — Temos Interinos para cobrir as férias do seu funcionário(a).
- `post-instagram-publicacao.png`: Fez uma construção no seu patrimônio? Entra em contato com um de nossos representantes e faça um orçamento sem compromisso, para uma limpeza Pós Obra Profissional
- Carrossel "Quem nós atendemos": Condomínios · Empresas · Casas · Galpões · Hospitais · Escolas · Indústrias
