# Mãos que Ajudam

Plataforma web front-end para uma organização do terceiro setor (ONG fictícia), desenvolvida como Single Page Application (SPA) em HTML5, CSS3 e JavaScript puro (Vanilla JS, ES6 Modules), sem frameworks. O código de produção é gerado por um build com esbuild.

**Site publicado:** https://ongmaosqueajudam.netlify.app/

A aplicação permite apresentar a instituição, divulgar seus projetos sociais e captar cadastros de doadores e voluntários, com dados persistidos localmente no navegador.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Testes](#testes)
- [Arquitetura da aplicação](#arquitetura-da-aplicação)
- [Acessibilidade](#acessibilidade)
- [Versionamento](#versionamento)
- [Autoria](#autoria)

## Sobre o projeto

O "Mãos que Ajudam" é um projeto acadêmico que simula, de ponta a ponta, o desenvolvimento front-end de uma plataforma real para uma ONG: da estrutura HTML semântica e do design system em CSS até uma camada de interatividade completa em JavaScript, com roteamento client-side, formulários validados e persistência local dos dados.

Funcionalidades principais:

- Navegação em página única (SPA), sem recarregar o navegador
- Página inicial com apresentação da ONG e destaque dos projetos sociais
- Página de projetos sociais com detalhamento de cada iniciativa
- Cadastro de doadores e de voluntários, com máscaras de CPF/telefone/CEP e validação de consistência
- Doação por Pix: ao cadastrar uma doação, a aplicação gera o QR Code e o código "Pix Copia e Cola" (padrão BR Code do Banco Central, com CRC16), com o valor informado
- Histórico de cadastros enviados, restaurado automaticamente do navegador
- Menu responsivo com dropdown (desktop) e hambúrguer (mobile)
- Componentes de feedback: badges, alertas, modal e toast

## Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico |
| Estilo | CSS3 (Custom Properties, Grid, Flexbox) |
| Interatividade | JavaScript ES6+ (Modules, sem bundler) |
| Roteamento | Roteador próprio, baseado em hash (`#/rota`) |
| Persistência | `localStorage` (via `JSON.stringify`/`JSON.parse`) |
| Build | esbuild (bundle + minificação de JS/CSS) e html-minifier-terser |
| Hospedagem | Netlify (deploy contínuo a partir da branch `main`) |
| Data/hora | [Day.js](https://day.js.org/) (via CDN) |
| QR Code | qrcode-generator (incluído no bundle) |
| Versionamento | Git, seguindo o modelo GitFlow |

## Estrutura de pastas

```
projeto-terceiro-setor/
├── html/
│   └── index.html          # shell único da SPA
├── css/
│   └── style.css           # design system + componentes
├── images/                 # logotipo e imagens dos projetos (jpg/png/webp)
├── js/
│   ├── main.js              # ponto de entrada da aplicação
│   └── modules/
│       ├── router.js        # navegação SPA (hash routing)
│       ├── templates.js     # geração de HTML de cada view
│       ├── forms.js         # orquestração de eventos de formulário
│       ├── validation.js    # validação de consistência (RegEx + DOM)
│       ├── masks.js         # máscaras de CPF/telefone/CEP
│       ├── toast.js         # notificações temporárias
│       ├── a11y.js          # ARIA dinâmico, foco e teclado dos modais
│       ├── theme.js         # modo claro/escuro com preferência salva
│       ├── pix.js           # geração do código Pix (BR Code + CRC16)
│       ├── pagamento.js     # modal do Pix, QR Code e botão copiar
│       ├── config.js        # dados da ONG para o Pix (chave fictícia)
│       ├── historico.js     # leitura/restauração do localStorage
│       └── storage.js       # persistência (localStorage)
├── build.mjs                # build de produção (gera dist/)
├── netlify.toml             # configuração de deploy e cache
├── package.json
├── ISSUES.md                # issues, milestones e PRs documentados
└── README.md
```

## Pré-requisitos

- Um navegador atual (Chrome, Firefox, Edge ou Safari nas últimas versões)
- [Node.js](https://nodejs.org/) 18 ou superior, para instalar dependências e gerar o build
- Um servidor HTTP local simples: não é possível abrir o `index.html` direto pelo sistema de arquivos (`file://`), pois os módulos ES6 (`type="module"`) são bloqueados por CORS nesse protocolo

## Instalação e execução

1. Clone o repositório e instale as dependências:
   ```bash
   git clone https://github.com/bruna-dsmendes/ONG_MaosQueAjudam.git
   cd ONG_MaosQueAjudam
   npm install
   ```
2. **Desenvolvimento** (código-fonte, sem minificar): sirva a raiz do projeto por um servidor local:
   ```bash
   python3 -m http.server 8000
   ```
   e acesse `http://localhost:8000/html/index.html`.
3. **Build de produção**: gera a pasta `dist/` com JS e CSS minificados e com hash no nome (cache busting):
   ```bash
   npm run build
   ```
   Para conferir o resultado, sirva a pasta `dist/` (`cd dist && python3 -m http.server 8000`).

## Deploy

O deploy é feito na Netlify, ligada a este repositório. O arquivo `netlify.toml` define o comando de build (`npm run build`), a pasta publicada (`dist`), o redirecionamento da raiz para a SPA e os cabeçalhos de cache. Todo push na `main` publica automaticamente uma nova versão. A pasta `dist/` não é versionada, pois é gerada a cada deploy.

## Testes

Os módulos JavaScript foram validados com testes funcionais escritos com [jsdom](https://github.com/jsdom/jsdom), simulando o DOM em Node.js (roteamento, submissão de formulário, validação, máscara e persistência). Os scripts de teste não fazem parte do bundle de produção; para rodá-los localmente:

```bash
cd js
npm install jsdom --no-save
node caminho/para/o/script-de-teste.mjs
```

O HTML também foi validado com o [Nu Html Checker](https://validator.w3.org/nu/) (mesmo motor do W3C Validator), sem erros.

## Arquitetura da aplicação

A aplicação é uma SPA de página única (`html/index.html`), cujo `<main id="app">` é preenchido dinamicamente pelo `router.js` conforme a rota (`#/`, `#/projetos-sociais`, `#/cadastro`) muda, usando templates gerados como *template literals* em `templates.js`. Os módulos seguem responsabilidade única (ver árvore de pastas acima) e se comunicam só via `import`/`export`, sem variáveis globais.

## Acessibilidade

- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Hierarquia única de `<h1>` por view, sem saltos de nível
- Texto alternativo (`alt`) descritivo em todas as imagens
- Estados de foco visíveis (`:focus-visible`) em botões e campos
- Formulários com `<label>` associado a cada campo e mensagens de erro anunciadas no DOM

## Versionamento

O repositório segue o modelo **GitFlow**: `main` (versões estáveis, com tags `vMAJOR.MINOR.PATCH`), `develop` (integração contínua) e branches `feature/`/`hotfix/` por bloco de trabalho. Commits seguem o padrão de **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`). Veja `ISSUES.md` para o histórico de issues, milestones e pull requests mapeado aos commits.

## Autoria

Desenvolvido por Bruna Dos Santos Mendes como projeto prático da disciplina de Desenvolvimento Front-end.

## Pagamento por Pix

A chave Pix em `js/modules/config.js` é **fictícia** (projeto acadêmico). Para uso real, troque por a chave verdadeira da organização. Doação recorrente e pagamento por cartão exigem uma operadora de pagamento (ex.: Mercado Pago, Stripe) e um servidor, e não fazem parte deste projeto front-end.
