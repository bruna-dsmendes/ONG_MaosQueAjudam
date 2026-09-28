/* ==========================================================================
   FORMS.JS
   Orquestra os eventos de interação com os formulários de cadastro, mas
   delega cada responsabilidade auxiliar a um módulo próprio (máscaras,
   toast, histórico, persistência, validação). Como os formulários são
   injetados dinamicamente pelo router (não existem no DOM quando a página
   carrega), os listeners usam event delegation, presos uma única vez no
   #app (que sempre existe), escutando eventos que "borbulham" (bubbling)
   dos elementos filhos, mesmo que esses filhos sejam recriados a cada
   troca de rota.
   ========================================================================== */

import { salvarCadastro } from './storage.js';
import { validarFormularioCompleto } from './validation.js';
import { aplicarMascara } from './masks.js';
import { mostrarToast } from './toast.js';
import { renderizarHistorico, iniciarHistorico } from './historico.js';

const APP_CONTAINER_ID = 'app';

// Descobre o "tipo" do cadastro (doador ou voluntario) a partir do id do form
function tipoDoFormulario(form) {
    return form.id === 'form-doador' ? 'doador' : 'voluntario';
}

// Converte o FormData do formulário num objeto simples { nome: valor },
// removendo espaços nas pontas de cada valor antes de persistir
function formularioParaObjeto(form) {
    const formData = new FormData(form);
    const entradas = [...formData.entries()].map(([chave, valor]) => [
        chave,
        typeof valor === 'string' ? valor.trim() : valor
    ]);
    return Object.fromEntries(entradas);
}

// Handler central de submit: valida, persiste e dá feedback ao usuário
function handleSubmit(evento) {
    const form = evento.target;

    // só reage se o elemento que disparou o evento for um dos nossos formulários
    if (form.id !== 'form-doador' && form.id !== 'form-voluntario') {
        return;
    }

    // impede o comportamento padrão do navegador (recarregar/navegar),
    // já que quem controla a jornada aqui é a lógica da SPA
    evento.preventDefault();

    // valida com a camada própria em JS (classes + mensagens no DOM);
    // reforça a validação nativa do HTML5, que continua ativa como
    // primeira barreira (required/pattern/type já impedem submits óbvios)
    if (!validarFormularioCompleto(form)) {
        return; // interrompe: nenhum dado inconsistente chega ao storage
    }

    const tipo = tipoDoFormulario(form);
    const dados = formularioParaObjeto(form);

    salvarCadastro(tipo, dados);
    renderizarHistorico();

    mostrarToast(
        tipo === 'doador'
            ? 'Cadastro de doador enviado com sucesso!'
            : 'Cadastro de voluntário enviado com sucesso!'
    );

    form.reset();

    // fecha o modal que continha o formulário (o foco volta pro botão que o abriu)
    const toggle = form.closest('.modal-wrap')?.querySelector('.modal-toggle');
    if (toggle) {
        toggle.checked = false;
        toggle.dispatchEvent(new Event('change', { bubbles: true }));
    }
}

// Handler central de input: delega a formatação em tempo real pro masks.js,
// e recoloca o cursor na posição equivalente depois de reformatar — sem
// isso, toda vez que o valor é reatribuído via campo.value = ..., o
// navegador joga o cursor pro final do campo, atrapalhando quem edita
// no meio de um CPF/telefone/CEP já preenchido
function handleInput(evento) {
    const campo = evento.target;
    if (campo.tagName !== 'INPUT') {
        return;
    }

    const valorAntes = campo.value;
    const cursorAntes = campo.selectionStart;
    const digitosAntesDoCursor = valorAntes.slice(0, cursorAntes).replace(/\D/g, '').length;

    campo.value = aplicarMascara(campo);

    // avança pelo valor já formatado até contar a mesma quantidade de dígitos
    // que existiam antes do cursor, pra "recolocá-lo" no lugar certo
    let posicao = 0;
    let digitosContados = 0;
    while (posicao < campo.value.length && digitosContados < digitosAntesDoCursor) {
        if (/\d/.test(campo.value[posicao])) {
            digitosContados++;
        }
        posicao++;
    }
    campo.setSelectionRange(posicao, posicao);
}

export function iniciarFormularios() {
    const app = document.getElementById(APP_CONTAINER_ID);

    // um único listener no container fixo, cobrindo qualquer form presente
    // ou futuro dentro dele — é isso que caracteriza event delegation
    app.addEventListener('submit', handleSubmit);
    app.addEventListener('input', handleInput);

    iniciarHistorico();
}
