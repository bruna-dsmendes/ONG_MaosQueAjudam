/* ==========================================================================
   ROUTER.JS
   Roteador simples baseado em hash (#/rota). Cada rota aponta para uma
   função do módulo Templates, que devolve uma string de HTML. O router
   troca o conteúdo de <main id="app"> sem recarregar a página, o que é
   a base de uma Single Page Application.
   ========================================================================== */

import { Templates } from './templates.js';

const APP_CONTAINER_ID = 'app';

// Mapa de rotas: cada chave é o hash da URL, cada valor descreve a view
const routes = {
    '/': {
        title: 'Mãos que Ajudam | Página Inicial',
        render: Templates.home
    },
    '/projetos-sociais': {
        title: 'Mãos que Ajudam | Projetos Sociais',
        render: Templates.projetos
    },
    '/cadastro': {
        title: 'Mãos que Ajudam | Cadastro',
        render: Templates.cadastro
    }
};

// Lê o hash atual da URL e devolve só o caminho da rota (ex: "#/cadastro" -> "/cadastro")
function getRotaAtual() {
    const hash = window.location.hash.replace('#', '');
    return hash === '' ? '/' : hash;
}

// Marca visualmente, no menu, qual link corresponde à rota ativa
function atualizarLinkAtivo(rota) {
    document.querySelectorAll('header nav a[href^="#/"]').forEach((link) => {
        const href = link.getAttribute('href').replace('#', '');
        const destino = href === '' ? '/' : href;
        link.classList.toggle('active', destino === rota);
    });
}

// Função principal de renderização: limpa o container alvo e injeta o
// fragmento HTML gerado pelo template correspondente à rota atual.
function renderizarView(container, htmlFragment) {
    // 1) limpa qualquer conteúdo anterior do container
    container.innerHTML = '';
    // 2) injeta o novo fragmento HTML retornado pelo template
    container.innerHTML = htmlFragment;
}

// Descobre a rota, busca o template correspondente e manda renderizar
function renderizarRota() {
    const rota = getRotaAtual();
    const view = routes[rota] || routes['/'];

    const app = document.getElementById(APP_CONTAINER_ID);
    renderizarView(app, view.render());

    document.title = view.title;

    atualizarLinkAtivo(rota);

    // fecha o menu mobile (se estiver aberto) ao trocar de rota
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.checked = false;
    }

    // volta o scroll para o topo a cada troca de "página"
    window.scrollTo(0, 0);
}

export function iniciarRouter() {
    // primeira renderização, assim que o script carrega
    renderizarRota();

    // toda vez que o hash da URL muda (clique em link ou botão voltar/avançar)
    window.addEventListener('hashchange', renderizarRota);
}
