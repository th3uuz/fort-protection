# PROGRESSO

| # | Subtarefa | Status |
|---|---|---|
| 1 | Projeto Next.js, git, tokens, layout base, NOTAS.md | concluída |
| 2 | Dados e textos (servicos, segmentos, faq, seo, conteudo) | concluída |
| 3 | Imagens e componentes base | concluída |
| 4 | Home | concluída |
| 5 | Sobre, índice de serviços e template de serviço | concluída |
| 6 | Contato, formulário e FAQ | concluída |
| 7 | SEO técnico e performance | concluída |
| 8 | Validação e revisão de textos | concluída |

## Notas
- Subtarefa 2: textos [C]/[T] conferidos por script contra o Anexo A (0 divergências); titles com até 60 caracteres e descriptions com até 160.
- Subtarefa 3: recortes sem texto embutido (xícara com marca de terceiros e faixas brancas removidas por recorte); screenshot de 1440 conferido.
- Subtarefa 4: home em 1440 e 375 conferida por screenshot (sem overflow horizontal, 1 H1); seletor de orçamento testado (7 segmentos x 11 serviços; o índice de segmentos marca o local). Erros 404 no console são prefetch de /servicos/*, /sobre, /faq e /contato, que entram nas subtarefas 5 e 6.
- Subtarefa 5: /sobre, /servicos e as 11 páginas de serviço prerenderadas (build lista todas); H1 com no máximo 2 linhas em 1440 e 375, sem overflow horizontal. Com cacheComponents ligado, `dynamicParams` não é permitido; slug inválido cai em `notFound()`. Erros 404 restantes no console são /contato e /faq (subtarefa 6).
- Subtarefa 6: /contato e /faq prerenderadas; formulário testado no navegador (validação em pt-BR, estado sem provedor com WhatsApp e e-mail já escritos, honeypot); 0 erros no console nas páginas; sem overflow em 1440 e 375.
- Subtarefa 7: sitemap com 16 URLs, robots, 2 redirects 308, slug inválido 404, headers de segurança, JSON-LD (Organization, WebSite, Service, BreadcrumbList, AboutPage, ContactPage, FAQPage) válido como JSON em todas as páginas, canonical e OG em todas, title com até 60 e description com até 157 caracteres, 1 H1 por página e 0 imagens sem alt (script de verificação sobre o build de produção).
- Subtarefa 8, validação:
  - lint.mjs da skill de design: 0 FAIL, 0 WARN. inspect.mjs em 9 tipos de página (home, sobre, índice, 4 serviços, contato, FAQ): 0 FAIL em 1440, 768 e 390.
  - WARN defendidos: sem vídeo (o cliente não tem clipe próprio e um clipe de banco de imagem não mostraria a empresa); fontes diferentes das dealt (Newsreader e Hanken Grotesk foram escolha do usuário); /faq em 768 acusa margens 23 e 45 px, mas as caixas medem 23 px de cada lado (medido por getBoundingClientRect).
  - /web-design-guidelines: sem anti-padrões (sem transition: all, outline: none, zoom bloqueado, onClick em div, paste bloqueado). Adicionados theme-color, color-scheme, touch-action e text-wrap pretty.
  - Playwright (Chrome real) em 375, 768 e 1440 nas 16 URLs: 0 erros de console, 0 respostas 4xx, 0 overflow horizontal, 1 H1 por página, 0 imagens sem alt ou quebradas. Menu mobile abre e fecha ao navegar. Seletor de orçamento e formulário testados.
  - Lighthouse: 95 a 100 nas quatro categorias (lighthouse/RESUMO.md). LCP mobile de 2,6 a 2,9 s na simulação.
  - /humanizer: aplicado só aos textos novos; 0 travessões, 0 contrastes "não X, mas Y" e 0 palavras da lista; nenhuma alteração necessária. Textos copiados não foram tocados.
  - Crítica final: hierarquia forte (título grande no eixo, blocos de cor sólida, mosaico preto e branco com o ouro do escudo); pontos fracos: fotos de banco de imagem são genéricas e de baixa resolução, a home não tem foto da equipe ou dos postos, e o mosaico depende de tiles de cor.
- Regra de edição: arquivos do projeto são UTF-8 sem BOM. Editar com a ferramenta Edit/Write ou Node, nunca com Get-Content/Set-Content do PowerShell 5.1 sem -Encoding.
- Melhoria 1: indicadores da home contam de 0 até o valor (CountUp, ease-out, ao entrar na viewport; sem JS ou com prefers-reduced-motion mostra o valor final).
- Melhoria 2: depoimentos reorganizados em coluna única centralizada (título, foto redonda, nome, 5 estrelas, texto); foto recortada de imagens/depoimento-mulher.png; conferido em 1440 e 375, sem overflow.
- Melhoria 3: depoimentos separados em 2 (João Silva e Fernanda Lukerberg), lado a lado no desktop e empilhados no mobile; João com avatar de iniciais por falta de foto.
- Melhoria 4: seção Peça seu orçamento da home virou o ContactForm centralizado em caixa clara sobre o dourado; ContactForm (reutilizado em /contato) ganhou selects de local (com Outro + campo de texto) e de serviço; OrcamentoBuilder removido; validação, mensagem do WhatsApp com o pedido e 0 erros de console conferidos em 1440 e 375.
- Melhoria 5: nome marcado como obrigatório (Nome*, validação já existia); serviços viraram multiselect com checkboxes (abre/fecha por clique, clique fora e Esc); pedido lista todos os serviços marcados.
- Melhoria 6: rodapé reformulado sem o texto gigante: 4 colunas iguais e centralizadas (logo + Segurança + redes em ícones SVG na cor dourada + endereço e horário; Serviços; A empresa; Fale conosco com WhatsApp e e-mail) e faixa legal de largura total com texto centralizado; 2 colunas até 900 px e 1 coluna até 560 px; sem overflow em 1440, 1024, 768 e 375.
- Melhoria 7: e-mail e WhatsApp do rodapé com a mesma fonte reduzida (acompanha a largura da coluna) e sempre em uma linha; texto 'Fort Protection' centralizado verticalmente com o logo; rodapé passa para 2 colunas até 1100 px.
- Melhoria 8: rodapé com títulos semibold (600) em destaque e itens menores (15 px; Serviços, A empresa, Segurança, endereço e horário), WhatsApp e e-mail no mesmo tamanho dos itens.
- Melhoria 9: estrutura revisada em home, serviços (índice e páginas) e sobre para ocupar a tela: hero em duas metades (texto à esquerda, mosaico de fotos à direita) no lugar da faixa de fotos + área vazia; paddings de seção de 72–200 px para 32–56 px; colunas sticky e eixo de 42% removidos; serviços em grade de cards com foto (4 colunas no desktop, linhas compactas no celular); "Quem nós atendemos" em grade de fotos; depoimentos, orçamento (foto + formulário) e localização (foto) compactos; "O que inclui", "Onde atendemos", dúvidas + CTA e "Outros serviços" reorganizados com fotos. Sobre: "Missão, visão e valores" com título centralizado e 3 colunas em 1 linha, cada uma com ícone vetorial (alvo, olho, diamante); empilha só abaixo de 640 px. Altura da home em 1440: 9064 para 5446 px; sobre 5356 para 3067; serviços 4458 para 2487. Conferido em 375, 768 e 1440: 0 erros de console, 0 overflow, 1 H1, 0 imagens quebradas ou sem alt (build de produção). Lighthouse 92 a 100 (lighthouse/RESUMO.md).
- Melhoria 10: breadcrumb com link e página atual no mesmo centro vertical (itens flex, min-height de 40 px, separador alinhado).
- Melhoria 11: página /faq excluída. As 14 perguntas (3 grupos em 3 colunas, accordion) ficam no fim da home, antes do rodapé, em #perguntas, com JSON-LD FAQPage na home. Removidos o item do cabeçalho, o link do rodapé, a entrada do sitemap (15 URLs) e o schema da antiga página; /faq redireciona 308 para /#perguntas.
- Melhoria 12: cabeçalho refeito em uma barra única (logo, links e botão de orçamento na mesma altura e no mesmo ritmo, sublinhado dourado no hover e na página atual). "Serviços" abre um dropdown com os 11 serviços por grupo ao passar o mouse (também por foco, clique na seta e Esc fecha); no celular o menu vira ícone de hambúrguer e "Serviços" abre um acordeão ao toque.
- Melhoria 13: seção Localização Segura removida da home; permanece em Sobre Nós.

## Melhoria 14: banner-home no hero (desktop)
- Desktop (>800px): hero usa `public/images/banner-home.jpg` como fundo; H1 e textos de SEO mantidos em HTML, na coluna direita (eixo 42%). Mosaico oculto no desktop.
- Mobile (<=800px): mosaico mantido. Imagens do Masthead passaram a `loading="lazy"` para nao baixar no desktop.
- Decisao do usuario: substitui a regra anterior "banner-home so como imagem OG".

## Melhoria 15: FAQ, Interinos, indicadores e limpeza de informações
- FAQ da home em lista única, sem categorias e sem subtítulo, com 4 perguntas; título e perguntas centralizados; JSON-LD ajustado.
- Serviço "Em caso de Férias" virou "Interinos" (nome, H1, title, card da home, mensagem do orçamento); URL `/servicos/interinos` com redirect 308 da antiga.
- Horário e endereço mantidos só no rodapé e em /contato; removidos de FAQ, Sobre e páginas de serviço. Seção "Localização Segura" e "Atende N tipos de local" removidas da Sobre.
- Espaçamento maior na seção Limpeza Pós-Obra e Interinos (home) e no bloco "Quem nós atendemos?" da Sobre (variante `espacado`, fundo distinto do rodapé).
- Indicadores da home trocados por +5 anos, +100 clientes, 11 serviços e 7 tipos de locais (dados informados pelo usuário); info.md atualizado.

## Melhoria 16: tema claro (pedido do cliente)
- Paleta so branco, preto e azul-escuro (#0f2a52 / #0a1f3f); dourado removido. Fundos claros (#fff, #f4f7fb, #e6ecf5), texto preto, azul-escuro em botoes, destaques, indicadores, orcamento, Missao/Visao/Valores e rodape. Hero com banner sob veu azul. Tokens em globals.css (--bg, --bg-2, --bg-3, --navy).
- Melhoria 17: imagens coloridas (grayscale removido de scripts/crop-images.mjs; 18 imagens regeradas dos originais).
- Melhoria 18: seção Depoimentos removida da home (dados em conteudo.ts mantidos sem uso).

## Melhoria 19: container, home e arredondamento
- Container limitado a 1120px (var --margin calculada); indicadores sem "11 servicos" e "7 locais"; bloco de indicadores branco; bloco de servicos azul (--blue #1f4e9c) com cards brancos; --radius 8px em botoes, cards, paineis, FAQ e campos.

## Melhoria 20: fonte, carrossel, seções e marca
- Títulos em Plus Jakarta Sans (no lugar de Newsreader).
- Home: serviços em carrossel (5 por vez no desktop, 4/2,3/1,25 em telas menores), loop infinito, autoplay de 5s com pausa por botão, hover e foco; parado com prefers-reduced-motion; botão "Ver todos os serviços" abaixo. Card de CTA removido.
- Home: Área de atuação dentro do container (título e texto em cima, mosaico com Condomínios em destaque); painéis Pós-obra/Interinos com foto em cima; orçamento com formulário mais largo (4fr/8fr) e foto quadrada.
- Contato: formulário primeiro; Fale Conosco e Localização abaixo, em duas colunas.
- Marca: logo (500px original) e nome no bloco escuro do mosaico do topo de Sobre, Serviços, páginas de serviço e Contato.

## Melhoria 21: carrossel, orçamento e FAQ
- Carrossel de serviços: 3 cards por vez no desktop (2,3 até 800 px e 1,25 até 560 px), cards com fundo branco, autoplay de 3 s.
- Orçamento da home: título e subtítulo acima da foto e do formulário; foto acompanha a altura do formulário; botão de envio com fundo --navy.
- FAQ (home e páginas de serviço): perguntas de 26 para 22 px e respostas de 19 para 17 px no desktop.
- Conferido em 1440, 768 e 375: 0 erros de console, 0 overflow.

## Melhoria 22: fotos por serviço (imagens-candidatas)
- 16 fotos escolhidas pelo usuário (Unsplash, Pixabay, Pexels) tratadas em scripts/crop-images.mjs (1200 px, mesmo ajuste de brilho) e salvas em public/images.
- src/lib/fotos.ts: novas fotos em primeiro lugar no mosaico de cada serviço (a 1ª é a do card); `fotosInclui` usa a foto nova no bloco "O que inclui" dos serviços com uma foto só (Câmeras, Manobrista, Zeladoria, Interinos). Portaria 24 horas manteve as fotos anteriores (sem foto na lista).
- Home: painéis Pós-obra (posobra-aspirador) e Interinos (interinos-equipe); mosaico de /servicos com acesso-catracas, limpeza-aspirador e recepcao-balcao.
- Conferido em 1440 e 375 nas 13 páginas: 0 erros de console, 0 overflow, 0 imagens quebradas, 1 H1.
- Melhoria 23: carrossel de serviços com imagens nítidas (quality 85, sizes para telas 2x; antes servia 384 px q70 para cards de 358 px); /imagens-candidatas adicionada ao .gitignore.
