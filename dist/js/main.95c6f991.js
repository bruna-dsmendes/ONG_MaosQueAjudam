var s={home(){return`
            <section id="apresentacao">
                <h1>Transformando comunidades atrav\xE9s da a\xE7\xE3o social</h1>
                <p>
                    A ONG M\xE3os que Ajudam atua h\xE1 mais de 10 anos conectando volunt\xE1rios,
                    doadores e fam\xEDlias em situa\xE7\xE3o de vulnerabilidade em todo o Brasil.
                </p>
                <div class="hero-acoes">
                    <a href="#/cadastro" class="btn">Quero ajudar</a>
                    <a href="#/projetos-sociais" class="btn btn-outline">Conhe\xE7a os projetos</a>
                </div>
            </section>

            <section id="numeros" aria-label="A ONG em n\xFAmeros">
                <ul class="numeros-lista">
                    <li><strong>10+</strong><span>anos de atua\xE7\xE3o</span></li>
                    <li><strong>5 mil</strong><span>fam\xEDlias atendidas</span></li>
                    <li><strong>3</strong><span>projetos ativos</span></li>
                </ul>
            </section>

            <section id="sobre">
                <h2>Quem somos</h2>
                <p>
                    Somos uma organiza\xE7\xE3o da sociedade civil sem fins lucrativos dedicada
                    a ampliar o acesso \xE0 educa\xE7\xE3o, alimenta\xE7\xE3o e cultura em comunidades
                    vulner\xE1veis.
                </p>

                <h3>Nossa miss\xE3o</h3>
                <p>
                    Reduzir a desigualdade social por meio de projetos sustent\xE1veis e
                    parcerias com a comunidade local.
                </p>

                <h3>Nossos n\xFAmeros</h3>
                <p>
                    Mais de 5 mil fam\xEDlias j\xE1 foram beneficiadas pelos nossos programas
                    desde a funda\xE7\xE3o da organiza\xE7\xE3o.
                </p>
            </section>

            <section id="projetos-destaque">
                <h2>Projetos em destaque</h2>

                <div class="container">
                    <div class="row">
                        ${Object.keys(s._dadosProjetos).map(e=>s._cardProjeto(e)).join("")}
                    </div>
                </div>
            </section>

            <section id="chamada-acao">
                <h2>Fa\xE7a parte dessa transforma\xE7\xE3o</h2>
                <p>
                    Sua doa\xE7\xE3o ou seu tempo como volunt\xE1rio podem mudar a realidade de
                    muitas fam\xEDlias. Cadastre-se e venha ajudar.
                </p>
                <a href="#/cadastro" class="btn">Quero ajudar</a>
            </section>
        `},projetos(){return`
            <section id="introducao">
                <h1>Nossos projetos sociais</h1>
                <p>
                    Conhe\xE7a as iniciativas que mantemos ativas e descubra como cada uma
                    delas transforma a vida de fam\xEDlias e comunidades.
                </p>
            </section>

            <section id="lista-projetos">
                <h2>Conhe\xE7a cada projeto</h2>
                ${Object.keys(s._dadosProjetos).map(e=>s._artigoProjeto(e)).join("")}
            </section>
        `},cadastro(){return`
            <section id="introducao">
                <h1>Cadastre-se como doador ou volunt\xE1rio</h1>
                <p>
                    Escolha como voc\xEA quer ajudar. Ao clicar no bot\xE3o, abre um
                    formul\xE1rio r\xE1pido, e todos os campos s\xE3o obrigat\xF3rios.
                </p>

                <div class="alert alert-info">
                    <span aria-hidden="true">\u2139\uFE0F</span>
                    <div>
                        <strong>Antes de come\xE7ar</strong>
                        Tenha em m\xE3os seu CPF, telefone e CEP. Os tr\xEAs campos usam
                        m\xE1scara autom\xE1tica, ent\xE3o digite s\xF3 os n\xFAmeros no formato
                        indicado abaixo de cada um.
                    </div>
                </div>
            </section>

            <section id="escolha-cadastro" aria-label="Escolha como quer ajudar">
                <div class="opcoes-cadastro">
                    <article class="opcao-cadastro">
                        <span class="opcao-icone" aria-hidden="true">\u{1F49A}</span>
                        <h2>Quero doar</h2>
                        <p>Contribua com um valor \xFAnico ou mensal e ajude a manter os projetos em funcionamento.</p>
                        <label for="modal-doador-toggle" class="btn" tabindex="0" role="button" aria-haspopup="dialog">Cadastrar como doador</label>
                    </article>
                    <article class="opcao-cadastro">
                        <span class="opcao-icone" aria-hidden="true">\u{1F91D}</span>
                        <h2>Quero ser volunt\xE1rio</h2>
                        <p>Doe seu tempo e seus talentos em educa\xE7\xE3o, alimenta\xE7\xE3o ou arte na comunidade.</p>
                        <label for="modal-voluntario-toggle" class="btn" tabindex="0" role="button" aria-haspopup="dialog">Cadastrar como volunt\xE1rio</label>
                    </article>
                </div>
            </section>

            <section id="historico">
                <h2>Cadastros enviados neste navegador</h2>
                <p>
                    Esta lista \xE9 restaurada automaticamente do seu navegador,
                    mesmo que voc\xEA feche a aba e volte depois.
                </p>
                <ul id="historico-cadastros" class="historico-lista">
                    <!-- Preenchido dinamicamente por forms.js, a partir do localStorage -->
                </ul>
            </section>

            <div class="modal-wrap">
                <input type="checkbox" id="modal-doador-toggle" class="modal-toggle" tabindex="-1">
                <div class="modal-overlay">
                    <div class="modal modal-grande" role="dialog" aria-modal="true" aria-labelledby="modal-doador-titulo">
                        <div class="modal-header">
                            <h2 id="modal-doador-titulo">Cadastro de doador</h2>
                            <label for="modal-doador-toggle" class="modal-close" aria-label="Fechar" tabindex="0">&times;</label>
                        </div>
                        <p class="modal-termos-aviso">
                            Ao enviar, voc\xEA concorda com os
                            <label for="modal-termos-toggle" class="link-label" tabindex="0" role="button" aria-haspopup="dialog">termos de doa\xE7\xE3o</label>.
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
                        <legend>Endere\xE7o</legend>

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
                            <option value="SP">S\xE3o Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="outro">Outro</option>
                        </select></div>
                    </fieldset>

                    <fieldset>
                        <legend>Dados da doa\xE7\xE3o</legend>

                        <div class="campo"><label for="doador-valor">Valor da doa\xE7\xE3o (R$)</label>
                        <input type="number" id="doador-valor" name="doador-valor"
                               required min="5" step="0.01" placeholder="0,00"></div>

                        <div class="campo"><label for="doador-forma">Forma de doa\xE7\xE3o</label>
                        <select id="doador-forma" name="doador-forma" required>
                            <option value="">Selecione</option>
                            <option value="unica">Doa\xE7\xE3o \xFAnica</option>
                            <option value="mensal">Doa\xE7\xE3o mensal recorrente</option>
                        </select></div>
                    </fieldset>

                    <button type="submit" class="btn">Enviar cadastro de doador</button>
                </form>
                    </div>
                </div>
            </div>

            <div class="modal-wrap">
                <input type="checkbox" id="modal-voluntario-toggle" class="modal-toggle" tabindex="-1">
                <div class="modal-overlay">
                    <div class="modal modal-grande" role="dialog" aria-modal="true" aria-labelledby="modal-voluntario-titulo">
                        <div class="modal-header">
                            <h2 id="modal-voluntario-titulo">Cadastro de volunt\xE1rio</h2>
                            <label for="modal-voluntario-toggle" class="modal-close" aria-label="Fechar" tabindex="0">&times;</label>
                        </div>
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
                        <legend>Endere\xE7o</legend>

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
                            <option value="SP">S\xE3o Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="outro">Outro</option>
                        </select></div>
                    </fieldset>

                    <fieldset>
                        <legend>Disponibilidade e interesse</legend>

                        <div class="campo"><label for="voluntario-area">\xC1rea de interesse</label>
                        <select id="voluntario-area" name="voluntario-area" required>
                            <option value="">Selecione</option>
                            <option value="educacao">Educa\xE7\xE3o para Todos</option>
                            <option value="alimentacao">Prato Cheio</option>
                            <option value="arte">Arte na Comunidade</option>
                        </select></div>

                        <div class="campo"><label for="voluntario-disponibilidade">Disponibilidade semanal</label>
                        <select id="voluntario-disponibilidade" name="voluntario-disponibilidade" required>
                            <option value="">Selecione</option>
                            <option value="manha">Manh\xE3</option>
                            <option value="tarde">Tarde</option>
                            <option value="noite">Noite</option>
                        </select></div>
                    </fieldset>

                    <button type="submit" class="btn">Enviar cadastro de volunt\xE1rio</button>
                </form>
                    </div>
                </div>
            </div>

            <div class="modal-wrap">
                <input type="checkbox" id="modal-termos-toggle" class="modal-toggle" tabindex="-1">
                <div class="modal-overlay">
                    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-termos-titulo">
                        <div class="modal-header">
                            <h2 id="modal-termos-titulo">Termos de doa\xE7\xE3o</h2>
                            <label for="modal-termos-toggle" class="modal-close" aria-label="Fechar" tabindex="0">&times;</label>
                        </div>
                        <div class="modal-body">
                            <p>
                                As doa\xE7\xF5es feitas \xE0 ONG M\xE3os que Ajudam s\xE3o destinadas
                                integralmente aos projetos sociais em andamento. Doa\xE7\xF5es
                                recorrentes podem ser canceladas a qualquer momento pelo
                                e-mail informado no cadastro, sem custo ou burocracia.
                            </p>
                        </div>
                        <label for="modal-termos-toggle" class="btn" tabindex="0" role="button">Entendi</label>
                    </div>
                </div>
            </div>
        `},_dadosProjetos:{educacao:{titulo:"Educa\xE7\xE3o para Todos",badge:'<span class="badge badge-primary">Educa\xE7\xE3o</span> <span class="badge badge-success">Vagas abertas</span>',imagem:"projeto-educacao",alt:"Selo ilustrado do projeto Educa\xE7\xE3o para Todos, com um livro aberto e \xEDcones de aprendizado",resumo:"Refor\xE7o escolar gratuito para crian\xE7as e adolescentes de 6 a 14 anos em situa\xE7\xE3o de vulnerabilidade social.",comoFunciona:"Aulas de portugu\xEAs e matem\xE1tica tr\xEAs vezes por semana, com apoio pedag\xF3gico de volunt\xE1rios formados em licenciatura.",comoAjudar:"Doe material escolar ou torne-se volunt\xE1rio como educador."},alimentacao:{titulo:"Prato Cheio",badge:'<span class="badge badge-secondary">Alimenta\xE7\xE3o</span> <span class="badge badge-neutral">Cont\xEDnuo</span>',imagem:"projeto-alimentacao",alt:"Selo ilustrado do projeto Prato Cheio, com um prato repleto de alimentos variados",resumo:"Distribui\xE7\xE3o semanal de cestas b\xE1sicas para fam\xEDlias em comunidades carentes da regi\xE3o.",comoFunciona:"Arrecada\xE7\xE3o mensal de alimentos n\xE3o perec\xEDveis, com entrega feita diretamente nas comunidades atendidas.",comoAjudar:"Doe alimentos ou contribua financeiramente para a compra de itens em falta."},arte:{titulo:"Arte na Comunidade",badge:'<span class="badge badge-primary">Arte e cultura</span> <span class="badge badge-success">Vagas abertas</span>',imagem:"projeto-arte",alt:"Selo ilustrado do projeto Arte na Comunidade, com pinc\xE9is, paleta de cores e um aperto de m\xE3os",resumo:"Oficinas gratuitas de m\xFAsica, teatro e artes visuais para jovens da rede p\xFAblica de ensino.",comoFunciona:"Encontros semanais em espa\xE7os cedidos pela comunidade, com professores volunt\xE1rios de cada linguagem art\xEDstica.",comoAjudar:"Doe instrumentos, materiais de arte ou seu tempo como volunt\xE1rio."}},_imagemProjeto(e){let o="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw";return`
                <picture>
                    <source type="image/webp" sizes="${o}"
                        srcset="../images/${e.imagem}-400.webp 400w, ../images/${e.imagem}.webp 900w">
                    <img src="../images/${e.imagem}.jpg" sizes="${o}"
                        srcset="../images/${e.imagem}-400.jpg 400w, ../images/${e.imagem}.jpg 900w"
                        alt="${e.alt}" width="900" height="491" loading="lazy">
                </picture>`},_cardProjeto(e){let o=s._dadosProjetos[e];return`
            <article class="col-md-6 col-lg-4">
                ${s._imagemProjeto(o)}
                <div>${o.badge}</div>
                <h3>${o.titulo}</h3>
                <p>${o.resumo}</p>
            </article>
        `},_artigoProjeto(e){let o=s._dadosProjetos[e];return`
            <article id="${e}">
                ${s._imagemProjeto(o)}
                <div>${o.badge}</div>
                <h2>${o.titulo}</h2>
                <p>${o.resumo}</p>

                <h3>Como funciona</h3>
                <p>${o.comoFunciona}</p>

                <h3>Como ajudar</h3>
                <p>${o.comoAjudar}</p>
            </article>
        `}};var L="app",m={"/":{title:"M\xE3os que Ajudam | P\xE1gina Inicial",render:s.home},"/projetos-sociais":{title:"M\xE3os que Ajudam | Projetos Sociais",render:s.projetos},"/cadastro":{title:"M\xE3os que Ajudam | Cadastro",render:s.cadastro}};function N(){let e=window.location.hash.replace("#","");return e===""?"/":e}function _(e){document.querySelectorAll('header nav a[href^="#/"]').forEach(o=>{let a=o.getAttribute("href").replace("#",""),t=a===""?"/":a;o.classList.toggle("active",t===e)})}function I(e,o){e.innerHTML="",e.innerHTML=o}function u(){let e=N(),o=m[e]||m["/"],a=document.getElementById(L);I(a,o.render()),document.title=o.title,_(e);let t=document.getElementById("menu-toggle");t&&(t.checked=!1),window.scrollTo(0,0)}function p(){u(),window.addEventListener("hashchange",u)}var v="maos-que-ajudam:cadastros";function f(){let e=localStorage.getItem(v);if(!e)return[];try{return JSON.parse(e)}catch(o){return console.error("N\xE3o foi poss\xEDvel ler os cadastros salvos:",o),[]}}function g(e,o){let a=f();a.push({tipo:e,dados:o,criadoEm:new Date().toISOString()}),localStorage.setItem(v,JSON.stringify(a))}function b(e){let o=f();return e?o.filter(a=>a.tipo===e):o}var d={cpf:/^\d{3}\.\d{3}\.\d{3}-\d{2}$/,telefone:/^\(\d{2}\)\s\d{4,5}-\d{4}$/,cep:/^\d{5}-\d{3}$/,email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/};function h(e){let o=e.value.trim();if(e.hasAttribute("required")&&o==="")return{valido:!1,mensagem:"Este campo \xE9 obrigat\xF3rio."};if(e.id.endsWith("-cpf")&&!d.cpf.test(o))return{valido:!1,mensagem:"CPF deve seguir o formato 000.000.000-00."};if(e.id.endsWith("-telefone")&&!d.telefone.test(o))return{valido:!1,mensagem:"Telefone deve seguir o formato (00) 00000-0000."};if(e.id.endsWith("-cep")&&!d.cep.test(o))return{valido:!1,mensagem:"CEP deve seguir o formato 00000-000."};if(e.type==="email"&&o!==""&&!d.email.test(o))return{valido:!1,mensagem:"Digite um e-mail v\xE1lido."};let a=e.getAttribute("minlength");return a&&o.length<Number(a)?{valido:!1,mensagem:`Digite pelo menos ${a} caracteres.`}:{valido:!0,mensagem:""}}function E(e,o){e.classList.remove("campo-valido","campo-invalido"),e.classList.add(o.valido?"campo-valido":"campo-invalido"),e.setAttribute("aria-invalid",String(!o.valido));let a=e.nextElementSibling,t=a&&a.classList.contains("field-error")?a:null,i=`${e.id}-erro`;if(o.valido)t&&(t.remove(),e.removeAttribute("aria-describedby"));else{let r=t||document.createElement("span");r.className="field-error",r.id=i,r.textContent=o.mensagem,t||e.insertAdjacentElement("afterend",r),e.setAttribute("aria-describedby",i)}}function M(e){let o=e.target;!(o.tagName==="INPUT"||o.tagName==="SELECT")||!o.closest("form")||E(o,h(o))}function y(e){let o=e.querySelectorAll("input, select"),a=!0;return o.forEach(t=>{let i=h(t);E(t,i),i.valido||(a=!1)}),a}function A(){document.getElementById("app").addEventListener("focusout",M)}var l={cpf(e){return e.replace(/\D/g,"").slice(0,11).replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2")},telefone(e){return e.replace(/\D/g,"").slice(0,11).replace(/(\d{2})(\d)/,"($1) $2").replace(/(\d{4,5})(\d{4})$/,"$1-$2")},cep(e){return e.replace(/\D/g,"").slice(0,8).replace(/(\d{5})(\d)/,"$1-$2")}};function j(e){return e.id.endsWith("-cpf")?l.cpf(e.value):e.id.endsWith("-telefone")?l.telefone(e.value):e.id.endsWith("-cep")?l.cep(e.value):e.value}function C(e){let o=document.querySelector(".toast");o||(o=document.createElement("div"),o.className="toast",o.setAttribute("role","status"),o.setAttribute("aria-live","polite"),o.innerHTML='<span class="toast-icon" aria-hidden="true">\u2713</span><span class="toast-texto"></span>',document.body.appendChild(o)),o.querySelector(".toast-texto").textContent=e,o.classList.add("is-visible"),clearTimeout(o._timeoutId),o._timeoutId=setTimeout(()=>{o.classList.remove("is-visible")},4e3)}var O="historico-cadastros";function k(e){if(window.dayjs){let o=window.dayjs(e);return`${o.format("DD/MM/YYYY [\xE0s] HH:mm")} (${o.fromNow()})`}return new Date(e).toLocaleDateString("pt-BR")}function R(e){let o=e.tipo==="doador"?"Doador":"Volunt\xE1rio",t=(e.dados||{})[`${e.tipo}-nome`]||"Sem nome informado",i=k(e.criadoEm);return`
        <li>
            <span class="badge badge-neutral">${o}</span>
            <span>${t}</span>
            <span class="historico-data">${i}</span>
        </li>
    `}function n(){let e=document.getElementById(O);if(!e)return;let o=b();e.innerHTML=o.length===0?'<li class="historico-vazio">Nenhum cadastro enviado neste navegador ainda.</li>':o.map(R).join("")}function x(){n(),window.addEventListener("hashchange",n)}var F="app";function z(e){return e.id==="form-doador"?"doador":"voluntario"}function B(e){let a=[...new FormData(e).entries()].map(([t,i])=>[t,typeof i=="string"?i.trim():i]);return Object.fromEntries(a)}function H(e){let o=e.target;if(o.id!=="form-doador"&&o.id!=="form-voluntario"||(e.preventDefault(),!y(o)))return;let a=z(o),t=B(o);g(a,t),n(),C(a==="doador"?"Cadastro de doador enviado com sucesso!":"Cadastro de volunt\xE1rio enviado com sucesso!"),o.reset();let i=o.closest(".modal-wrap")?.querySelector(".modal-toggle");i&&(i.checked=!1,i.dispatchEvent(new Event("change",{bubbles:!0})))}function G(e){let o=e.target;if(o.tagName!=="INPUT")return;let a=o.value,t=o.selectionStart,i=a.slice(0,t).replace(/\D/g,"").length;o.value=j(o);let r=0,c=0;for(;r<o.value.length&&c<i;)/\d/.test(o.value[r])&&c++,r++;o.setSelectionRange(r,r)}function D(){let e=document.getElementById(F);e.addEventListener("submit",H),e.addEventListener("input",G),x()}function V(){let e=document.getElementById("menu-toggle"),o=document.querySelector(".hamburger");!e||!o||(o.setAttribute("aria-expanded",String(e.checked)),e.addEventListener("change",()=>{o.setAttribute("aria-expanded",String(e.checked))}))}function J(){let e=document.querySelector(".dropdown");if(!e)return;let o=e.querySelector("a"),a=()=>{let t=e.matches(":hover")||e.matches(":focus-within");o.setAttribute("aria-expanded",String(t))};e.addEventListener("mouseenter",a),e.addEventListener("mouseleave",a),e.addEventListener("focusin",a),e.addEventListener("focusout",a)}function W(){document.getElementById("app").addEventListener("change",o=>{let a=o.target;if(!a.classList?.contains("modal-toggle"))return;let t=a.closest(".modal-wrap")?.querySelector(".modal");a.checked?t?.querySelector('input:not([type="checkbox"]), select, .btn')?.focus():[...document.querySelectorAll(`label[for="${a.id}"]`)].find(r=>!r.closest(".modal"))?.focus()})}function Q(e){if(e.key!=="Escape")return;let o=[...document.querySelectorAll(".modal-toggle:checked")],a=o[o.length-1];a&&(a.checked=!1,a.dispatchEvent(new Event("change",{bubbles:!0})))}function U(e){let o=e.target;o.tagName==="LABEL"&&o.hasAttribute("tabindex")&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),o.click())}function w(){V(),J(),W(),document.addEventListener("keydown",U),document.addEventListener("keydown",Q)}var S="maos-que-ajudam:tema";function P(){return localStorage.getItem(S)}function $(){return typeof window.matchMedia=="function"&&window.matchMedia("(prefers-color-scheme: dark)").matches}function q(e){let o=document.documentElement,a=document.getElementById("theme-toggle");if(e?o.setAttribute("data-theme",e):o.removeAttribute("data-theme"),a){let t=e==="dark"||!e&&$();a.textContent=t?"\u2600\uFE0F":"\u{1F319}",a.setAttribute("aria-pressed",String(t))}}function Y(){let e=P(),a=e==="dark"||!e&&$()?"light":"dark";localStorage.setItem(S,a),q(a)}function T(){q(P()),document.getElementById("theme-toggle")?.addEventListener("click",Y)}window.dayjs&&window.dayjs_plugin_relativeTime&&(dayjs.extend(window.dayjs_plugin_relativeTime),dayjs.locale("pt-br"));document.addEventListener("DOMContentLoaded",()=>{p(),D(),A(),w(),T()});
