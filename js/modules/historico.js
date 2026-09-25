/* ==========================================================================
   HISTORICO.JS
   Responsabilidade única: ler os cadastros salvos (via storage.js) e
   restaurar essa lista na tela, formatando a data de cada um. Não sabe
   nada sobre submit, validação ou máscara.
   ========================================================================== */

import { listarCadastros } from './storage.js';

const LISTA_ID = 'historico-cadastros';

// Formata a data de criação do cadastro. Usa o Day.js (via CDN) quando
// disponível, pra ter data absoluta + tempo relativo ("há 2 minutos");
// se por algum motivo o CDN não carregar, cai no Date nativo do navegador.
function formatarData(dataIso) {
    if (window.dayjs) {
        const data = window.dayjs(dataIso);
        return `${data.format('DD/MM/YYYY [às] HH:mm')} (${data.fromNow()})`;
    }
    return new Date(dataIso).toLocaleDateString('pt-BR');
}

function itemHistorico(cadastro) {
    const rotulo = cadastro.tipo === 'doador' ? 'Doador' : 'Voluntário';
    // defesa contra entradas corrompidas no localStorage (ex: editadas manualmente
    // via DevTools, ou gravadas por uma versão antiga do app sem o campo "dados")
    const dados = cadastro.dados || {};
    const nome = dados[`${cadastro.tipo}-nome`] || 'Sem nome informado';
    const data = formatarData(cadastro.criadoEm);

    return `
        <li>
            <span class="badge badge-neutral">${rotulo}</span>
            <span>${nome}</span>
            <span class="historico-data">${data}</span>
        </li>
    `;
}

// Lê o histórico salvo no localStorage e restaura essa lista na tela.
// Chamada tanto na carga inicial quanto logo após um novo cadastro ser salvo.
export function renderizarHistorico() {
    const lista = document.getElementById(LISTA_ID);
    if (!lista) {
        return; // usuário não está na tela de cadastro agora, nada a fazer
    }

    const cadastros = listarCadastros(); // já devolve os dados via JSON.parse

    lista.innerHTML = cadastros.length === 0
        ? '<li class="historico-vazio">Nenhum cadastro enviado neste navegador ainda.</li>'
        : cadastros.map(itemHistorico).join('');
}

export function iniciarHistorico() {
    // restaura o histórico assim que a aplicação carrega, caso a rota
    // inicial já seja a de cadastro (ex: usuário recarregou a página nela)
    renderizarHistorico();

    // e também sempre que o usuário navegar de volta pra tela de cadastro,
    // já que o router recria o <ul id="historico-cadastros"> vazio a cada rota
    window.addEventListener('hashchange', renderizarHistorico);
}
