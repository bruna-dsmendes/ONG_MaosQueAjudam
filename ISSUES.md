# Gestão do projeto — Issues, Milestones e Pull Requests

> Nota: este repositório foi desenvolvido localmente nesta etapa, sem push para
> um GitHub remoto real. Este documento registra issues, milestones e pull
> requests da forma como seriam abertos/geridos no GitHub, cada um mapeado a
> um commit ou merge real e verificável no histórico do `git log`.

## Milestones

### `v1.0.0` — MVP da plataforma
Agrupa todas as issues das quatro features principais (estrutura HTML, design
system, SPA/JavaScript, modularização). Fechado no commit `554ae7e` (release
v1.0.0), quando `develop` foi mergeada em `main`.

### `v1.0.1` — Correções pós-testes
Agrupa as 3 issues de bug encontradas na fase de testes exaustivos. Fechado no
commit `afc7e72` (merge do hotfix em `main`).

---

## Issues

**#1 — feat: estruturar HTML5 semântico das páginas**
Descrição: Criar `header`/`nav`/`main`/`section`/`article`/`footer` para as
telas de início, projetos sociais e cadastro, com hierarquia de headings
correta. Resolvida pelos commits `3dd06a7` e `56e0e90`, branch
`feature/estrutura-html-semantica`.

**#2 — feat: construir design system e componentes visuais**
Descrição: Variáveis CSS, grid de 12 colunas com 5 breakpoints, menu
responsivo com dropdown/hambúrguer, e componentes de feedback (badge, alerta,
modal, toast). Resolvida pelos commits `28746f3`..`5cff6cf`, branch
`feature/design-system-css`.

**#3 — feat: transformar em SPA com formulários e persistência**
Descrição: Roteador por hash, templates dinâmicos, formulários com máscara e
validação, `localStorage` e integração do Day.js. Resolvida pelos commits
`e715cdf`..`0dabb64`, branch `feature/spa-javascript`.

**#4 — refactor: modularizar forms.js e adicionar testes**
Descrição: `forms.js` acumulou responsabilidade demais (máscara, toast,
histórico, submit). Separar em módulos menores e cobrir com testes
automatizados. Resolvida pelos commits `8dbb330` e `9a4c2d6`, branch
`feature/modularizacao`.

**#5 — bug: crash ao ler cadastro corrompido no localStorage**
Descrição: `renderizarHistorico()` lançava `TypeError` quando um registro do
`localStorage` não tinha o campo `dados` (ex: editado manualmente). Corrigida
pelo commit `169f5d4`.

**#6 — bug: espaços em branco não removidos antes de persistir**
Descrição: Campos como "nome" eram salvos no `localStorage` com espaços nas
pontas, mesmo passando pela validação (que já dava trim). Corrigida pelo
commit `ec6723b`.

**#7 — bug: cursor pula pro final ao editar campo com máscara**
Descrição: Reatribuir `campo.value` sempre reposiciona o cursor no fim,
impedindo edição no meio de um CPF/telefone/CEP já preenchido. Corrigida pelo
commit `695de4a`.

---

## Pull Requests

**PR #1 — `feature/estrutura-html-semantica` → `develop`**
Contexto: Primeira entrega do projeto, HTML semântico das 3 telas e assets
otimizados. Sem conflitos, merge `--no-ff` em `5831be0`, preservando o
histórico da feature separado da `develop`.

**PR #2 — `feature/design-system-css` → `develop`**
Contexto: Entrega do design system e dos componentes visuais, construída em
cima da estrutura HTML já mergeada. Merge `--no-ff` em `7446b85`.

**PR #3 — `feature/spa-javascript` → `develop`**
Contexto: Maior entrega do projeto, converte a aplicação estática em SPA.
Revisão focou em confirmar que os testes manuais de navegação, submit e
persistência (documentados nas etapas anteriores) continuavam passando.
Merge `--no-ff` em `a7cced1`.

**PR #4 — `feature/modularizacao` → `develop`**
Contexto: PR de refatoração pura, sem mudança de comportamento visível ao
usuário, por isso a descrição enfatiza "por que" (responsabilidade única) e
não "o que" mudou na tela. Merge `--no-ff` em `605fc96`.

**PR #5 — `develop` → `main` (release v1.0.0)**
Contexto: PR de release, juntando as 4 features anteriores. Título e corpo
seguem o padrão de changelog, listando cada feature incluída. Merge `--no-ff`
em `554ae7e`, seguido da tag `v1.0.0`.

**PR #6 — `hotfix/correcoes-pos-testes` → `main`**
Contexto: PR de hotfix, aberto direto contra `main` (não contra `develop`),
com os 3 bugs encontrados na fase de testes exaustivos. Merge `--no-ff` em
`afc7e72`, seguido da tag `v1.0.1`.

**PR #7 — `hotfix/correcoes-pos-testes` → `develop`**
Contexto: Mesmo conteúdo do PR #6, aberto também contra `develop` pra ela não
ficar desatualizada em relação à correção já publicada em `main`. Merge
`--no-ff` em `676c99b`.
