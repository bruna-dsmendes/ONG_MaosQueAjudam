# Mãos que Ajudam

Plataforma web front-end para uma organização do terceiro setor (ONG fictícia), desenvolvida como Single Page Application (SPA) em HTML5, CSS3 e JavaScript puro (Vanilla JS, ES6 Modules), sem frameworks nem etapa de build.

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
| Data/hora | [Day.js](https://day.js.org/) (via CDN) |
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
│       ├── historico.js     # leitura/restauração do localStorage
│       └── storage.js       # persistência (localStorage)
├── ISSUES.md                # issues, milestones e PRs documentados
└── README.md
```

## Pré-requisitos

- Um navegador atual (Chrome, Firefox, Edge ou Safari nas últimas versões)
- Um servidor HTTP local simples (ver abaixo) — **não** é possível abrir o `index.html` direto pelo sistema de arquivos (`file://`), pois os módulos ES6 (`type="module"`) são bloqueados por CORS nesse protocolo

Não há dependências de build, `npm install` ou bundler: todo o JavaScript roda nativamente no navegador.

## Instalação e execução

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd projeto-terceiro-setor
   ```
2. Sirva a pasta por um servidor local. Qualquer uma das opções abaixo funciona:
   ```bash
   # Opção 1: Python
   python3 -m http.server 8000

   # Opção 2: Node (pacote "serve")
   npx serve .

   # Opção 3: extensão "Live Server" do VS Code
   # clique com o botão direito em html/index.html > "Open with Live Server"
   ```
3. Acesse `http://localhost:8000/html/index.html` (ajuste a porta conforme a opção escolhida).

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
