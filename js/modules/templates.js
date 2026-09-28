/* ==========================================================================
   TEMPLATES.JS
   Módulo responsável por gerar o HTML de cada "view" (página) da aplicação
   como uma string, a partir de template literals. O roteador (router.js)
   pega essa string e injeta dentro do <main id="app"> do index.html.
   Isso é o que permite reaproveitar o mesmo layout (header/footer fixos)
   trocando só o conteúdo central, sem recarregar a página inteira.
   ========================================================================== */

export const Templates = {

    home() {
        return `
            <section id="apresentacao">
                <h1>Transformando comunidades através da ação social</h1>
                <p>
                    A ONG Mãos que Ajudam atua há mais de 10 anos conectando voluntários,
                    doadores e famílias em situação de vulnerabilidade em todo o Brasil.
                </p>
                <div class="hero-acoes">
                    <a href="#/cadastro" class="btn">Quero ajudar</a>
                    <a href="#/projetos-sociais" class="btn btn-outline">Conheça os projetos</a>
                </div>
            </section>

            <section id="numeros" aria-label="A ONG em números">
                <ul class="numeros-lista">
                    <li><strong>10+</strong><span>anos de atuação</span></li>
                    <li><strong>5 mil</strong><span>famílias atendidas</span></li>
                    <li><strong>3</strong><span>projetos ativos</span></li>
                </ul>
            </section>

            <section id="sobre">
                <h2>Quem somos</h2>
                <p>
                    Somos uma organização da sociedade civil sem fins lucrativos dedicada
                    a ampliar o acesso à educação, alimentação e cultura em comunidades
                    vulneráveis.
                </p>

                <h3>Nossa missão</h3>
                <p>
                    Reduzir a desigualdade social por meio de projetos sustentáveis e
                    parcerias com a comunidade local.
                </p>

                <h3>Nossos números</h3>
                <p>
                    Mais de 5 mil famílias já foram beneficiadas pelos nossos programas
                    desde a fundação da organização.
                </p>
            </section>

            <section id="projetos-destaque">
                <h2>Projetos em destaque</h2>

                <div class="container">
                    <div class="row">
                        ${Object.keys(Templates._dadosProjetos)
                            .map((chave) => Templates._cardProjeto(chave))
                            .join('')}
                    </div>
                </div>
            </section>

            <section id="chamada-acao">
                <h2>Faça parte dessa transformação</h2>
                <p>
                    Sua doação ou seu tempo como voluntário podem mudar a realidade de
                    muitas famílias. Cadastre-se e venha ajudar.
                </p>
                <a href="#/cadastro" class="btn">Quero ajudar</a>
            </section>
        `;
    },

    projetos() {
        return `
            <section id="introducao">
                <h1>Nossos projetos sociais</h1>
                <p>
                    Conheça as iniciativas que mantemos ativas e descubra como cada uma
                    delas transforma a vida de famílias e comunidades.
                </p>
            </section>

            <section id="lista-projetos">
                <h2>Conheça cada projeto</h2>
                ${Object.keys(Templates._dadosProjetos)
                    .map((chave) => Templates._artigoProjeto(chave))
                    .join('')}
            </section>
        `;
    },

    cadastro() {
        return `
            <section id="introducao">
                <h1>Cadastre-se como doador ou voluntário</h1>
                <p>
                    Escolha como você quer ajudar e preencha o formulário
                    correspondente. Todos os campos marcados como obrigatórios
                    precisam ser preenchidos corretamente para enviar o cadastro.
                </p>

                <div class="alert alert-info">
                    <span aria-hidden="true">ℹ️</span>
                    <div>
                        <strong>Antes de começar</strong>
                        Tenha em mãos seu CPF, telefone e CEP. Os três campos usam
                        máscara automática, então digite só os números no formato
                        indicado abaixo de cada um.
                    </div>
                </div>
            </section>

            <section id="historico">
                <h2>Cadastros enviados neste navegador</h2>
                <p>
                    Esta lista é restaurada automaticamente do seu navegador,
                    mesmo que você feche a aba e volte depois.
                </p>
                <ul id="historico-cadastros" class="historico-lista">
                    <!-- Preenchido dinamicamente por forms.js, a partir do localStorage -->
                </ul>
            </section>

            <section id="cadastro-doadores">
                <h2>Cadastro de doadores</h2>

                <input type="checkbox" id="modal-termos-toggle" class="modal-toggle">
                <div class="modal-overlay">
                    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-termos-titulo">
                        <div class="modal-header">
                            <h3 id="modal-termos-titulo">Termos de doação</h3>
                            <label for="modal-termos-toggle" class="modal-close" aria-label="Fechar" tabindex="0">&times;</label>
                        </div>
                        <div class="modal-body">
                            <p>
                                As doações feitas à ONG Mãos que Ajudam são destinadas
                                integralmente aos projetos sociais em andamento. Doações
                                recorrentes podem ser canceladas a qualquer momento pelo
                                e-mail informado no cadastro, sem custo ou burocracia.
                            </p>
                        </div>
                        <label for="modal-termos-toggle" class="btn" tabindex="0">Entendi</label>
                    </div>
                </div>
                <p>
                    <label for="modal-termos-toggle" class="btn" style="background-color: var(--color-accent);" tabindex="0">
                        Ler termos de doação
                    </label>
                </p>

                <form id="form-doador" novalidate>

                    <fieldset>
                        <legend>Dados pessoais</legend>

                        <div class="campo"><label for="doador-nome">Nome completo</label>
                        <input type="text" id="doador-nome" name="doador-nome"
                               required minlength="3" maxlength="100"
                               placeholder="Digite seu nome completo"></div>

                        <div class="campo"><label for="doador-email">E-mail</label>
                        <input type="email" id="doador-email" name="doador-email"
                               required placeholder="seuemail@exemplo.com"></div>

                        <div class="campo"><label for="doador-nascimento">Data de nascimento</label>
                        <input type="date" id="doador-nascimento" name="doador-nascimento"
                               required></div>

                        <div class="campo"><label for="doador-cpf">CPF</label>
                        <input type="text" id="doador-cpf" name="doador-cpf"
                               required inputmode="numeric"
                               pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}"
                               placeholder="000.000.000-00"
                               title="Digite o CPF no formato 000.000.000-00"></div>

                        <div class="campo"><label for="doador-telefone">Telefone</label>
                        <input type="tel" id="doador-telefone" name="doador-telefone"
                               required inputmode="tel"
                               pattern="\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}"
                               placeholder="(00) 00000-0000"
                               title="Digite o telefone no formato (00) 00000-0000"></div>
                    </fieldset>

                    <fieldset>
                        <legend>Endereço</legend>

                        <div class="campo"><label for="doador-cep">CEP</label>
                        <input type="text" id="doador-cep" name="doador-cep"
                               required inputmode="numeric"
                               pattern="\\d{5}-\\d{3}"
                               placeholder="00000-000"
                               title="Digite o CEP no formato 00000-000"></div>

                        <div class="campo"><label for="doador-cidade">Cidade</label>
                        <input type="text" id="doador-cidade" name="doador-cidade"
                               required maxlength="60" placeholder="Digite sua cidade"></div>

                        <div class="campo"><label for="doador-estado">Estado</label>
                        <select id="doador-estado" name="doador-estado" required>
                            <option value="">Selecione</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="outro">Outro</option>
                        </select></div>
                    </fieldset>

                    <fieldset>
                        <legend>Dados da doação</legend>

                        <div class="campo"><label for="doador-valor">Valor da doação (R$)</label>
                        <input type="number" id="doador-valor" name="doador-valor"
                               required min="5" step="0.01" placeholder="0,00"></div>

                        <div class="campo"><label for="doador-forma">Forma de doação</label>
                        <select id="doador-forma" name="doador-forma" required>
                            <option value="">Selecione</option>
                            <option value="unica">Doação única</option>
                            <option value="mensal">Doação mensal recorrente</option>
                        </select></div>
                    </fieldset>

                    <button type="submit" class="btn">Enviar cadastro de doador</button>
                </form>
            </section>

            <section id="cadastro-voluntarios">
                <h2>Cadastro de voluntários</h2>
                <form id="form-voluntario" novalidate>

                    <fieldset>
                        <legend>Dados pessoais</legend>

                        <div class="campo"><label for="voluntario-nome">Nome completo</label>
                        <input type="text" id="voluntario-nome" name="voluntario-nome"
                               required minlength="3" maxlength="100"
                               placeholder="Digite seu nome completo"></div>

                        <div class="campo"><label for="voluntario-email">E-mail</label>
                        <input type="email" id="voluntario-email" name="voluntario-email"
                               required placeholder="seuemail@exemplo.com"></div>

                        <div class="campo"><label for="voluntario-nascimento">Data de nascimento</label>
                        <input type="date" id="voluntario-nascimento" name="voluntario-nascimento"
                               required></div>

                        <div class="campo"><label for="voluntario-telefone">Telefone</label>
                        <input type="tel" id="voluntario-telefone" name="voluntario-telefone"
                               required inputmode="tel"
                               pattern="\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}"
                               placeholder="(00) 00000-0000"
                               title="Digite o telefone no formato (00) 00000-0000"></div>
                    </fieldset>

                    <fieldset>
                        <legend>Endereço</legend>

                        <div class="campo"><label for="voluntario-cep">CEP</label>
                        <input type="text" id="voluntario-cep" name="voluntario-cep"
                               required inputmode="numeric"
                               pattern="\\d{5}-\\d{3}"
                               placeholder="00000-000"
                               title="Digite o CEP no formato 00000-000"></div>

                        <div class="campo"><label for="voluntario-cidade">Cidade</label>
                        <input type="text" id="voluntario-cidade" name="voluntario-cidade"
                               required maxlength="60" placeholder="Digite sua cidade"></div>

                        <div class="campo"><label for="voluntario-estado">Estado</label>
                        <select id="voluntario-estado" name="voluntario-estado" required>
                            <option value="">Selecione</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="outro">Outro</option>
                        </select></div>
                    </fieldset>

                    <fieldset>
                        <legend>Disponibilidade e interesse</legend>

                        <div class="campo"><label for="voluntario-area">Área de interesse</label>
                        <select id="voluntario-area" name="voluntario-area" required>
                            <option value="">Selecione</option>
                            <option value="educacao">Educação para Todos</option>
                            <option value="alimentacao">Prato Cheio</option>
                            <option value="arte">Arte na Comunidade</option>
                        </select></div>

                        <div class="campo"><label for="voluntario-disponibilidade">Disponibilidade semanal</label>
                        <select id="voluntario-disponibilidade" name="voluntario-disponibilidade" required>
                            <option value="">Selecione</option>
                            <option value="manha">Manhã</option>
                            <option value="tarde">Tarde</option>
                            <option value="noite">Noite</option>
                        </select></div>
                    </fieldset>

                    <button type="submit" class="btn">Enviar cadastro de voluntário</button>
                </form>
            </section>
        `;
    },

    /* ---------- Helpers privados de composição (reaproveitados entre views) ---------- */

    _dadosProjetos: {
        educacao: {
            titulo: 'Educação para Todos',
            badge: '<span class="badge badge-primary">Educação</span> <span class="badge badge-success">Vagas abertas</span>',
            imagem: 'projeto-educacao',
            alt: 'Selo ilustrado do projeto Educação para Todos, com um livro aberto e ícones de aprendizado',
            resumo: 'Reforço escolar gratuito para crianças e adolescentes de 6 a 14 anos em situação de vulnerabilidade social.',
            comoFunciona: 'Aulas de português e matemática três vezes por semana, com apoio pedagógico de voluntários formados em licenciatura.',
            comoAjudar: 'Doe material escolar ou torne-se voluntário como educador.'
        },
        alimentacao: {
            titulo: 'Prato Cheio',
            badge: '<span class="badge badge-secondary">Alimentação</span> <span class="badge badge-neutral">Contínuo</span>',
            imagem: 'projeto-alimentacao',
            alt: 'Selo ilustrado do projeto Prato Cheio, com um prato repleto de alimentos variados',
            resumo: 'Distribuição semanal de cestas básicas para famílias em comunidades carentes da região.',
            comoFunciona: 'Arrecadação mensal de alimentos não perecíveis, com entrega feita diretamente nas comunidades atendidas.',
            comoAjudar: 'Doe alimentos ou contribua financeiramente para a compra de itens em falta.'
        },
        arte: {
            titulo: 'Arte na Comunidade',
            badge: '<span class="badge badge-primary">Arte e cultura</span> <span class="badge badge-success">Vagas abertas</span>',
            imagem: 'projeto-arte',
            alt: 'Selo ilustrado do projeto Arte na Comunidade, com pincéis, paleta de cores e um aperto de mãos',
            resumo: 'Oficinas gratuitas de música, teatro e artes visuais para jovens da rede pública de ensino.',
            comoFunciona: 'Encontros semanais em espaços cedidos pela comunidade, com professores voluntários de cada linguagem artística.',
            comoAjudar: 'Doe instrumentos, materiais de arte ou seu tempo como voluntário.'
        }
    },

    // Imagem responsiva: o navegador escolhe entre 400w e 900w conforme a
    // largura em que ela realmente aparece (atributo sizes) e a densidade da tela.
    _imagemProjeto(p) {
        const sizes = '(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw';
        return `
                <picture>
                    <source type="image/webp" sizes="${sizes}"
                        srcset="../images/${p.imagem}-400.webp 400w, ../images/${p.imagem}.webp 900w">
                    <img src="../images/${p.imagem}.jpg" sizes="${sizes}"
                        srcset="../images/${p.imagem}-400.jpg 400w, ../images/${p.imagem}.jpg 900w"
                        alt="${p.alt}" width="900" height="491" loading="lazy">
                </picture>`;
    },

    // Card resumido usado na home (dentro do grid de 12 colunas)
    _cardProjeto(chave) {
        const p = Templates._dadosProjetos[chave];
        return `
            <article class="col-md-6 col-lg-4">
                ${Templates._imagemProjeto(p)}
                <div>${p.badge}</div>
                <h3>${p.titulo}</h3>
                <p>${p.resumo}</p>
            </article>
        `;
    },

    // Artigo completo usado na página de projetos sociais
    _artigoProjeto(chave) {
        const p = Templates._dadosProjetos[chave];
        return `
            <article id="${chave}">
                ${Templates._imagemProjeto(p)}
                <div>${p.badge}</div>
                <h2>${p.titulo}</h2>
                <p>${p.resumo}</p>

                <h3>Como funciona</h3>
                <p>${p.comoFunciona}</p>

                <h3>Como ajudar</h3>
                <p>${p.comoAjudar}</p>
            </article>
        `;
    }
};
