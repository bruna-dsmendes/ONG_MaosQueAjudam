/* ==========================================================================
   A11Y.JS
   Responsabilidade única: sincronizar atributos ARIA que dependem de estado
   dinâmico (coisas que o CSS puro consegue estilizar, mas não consegue
   anunciar corretamente pra tecnologia assistiva sozinho) e gerenciar foco
   em elementos que aparecem/desaparecem da tela (modal).
   ========================================================================== */

const APP_CONTAINER_ID = 'app';

// Mantém aria-expanded do botão hambúrguer sincronizado com o estado real
// do checkbox (aberto/fechado), pra leitores de tela saberem se o menu
// mobile está visível ou não
function sincronizarMenuMobile() {
    const toggle = document.getElementById('menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    if (!toggle || !hamburger) {
        return;
    }
    hamburger.setAttribute('aria-expanded', String(toggle.checked));
    toggle.addEventListener('change', () => {
        hamburger.setAttribute('aria-expanded', String(toggle.checked));
    });
}

// Mantém aria-expanded do link "Projetos sociais" sincronizado com a
// visibilidade real do submenu (controlada por :hover/:focus-within em CSS)
function sincronizarDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown) {
        return;
    }
    const trigger = dropdown.querySelector('a');

    const atualizar = () => {
        const aberto = dropdown.matches(':hover') || dropdown.matches(':focus-within');
        trigger.setAttribute('aria-expanded', String(aberto));
    };

    dropdown.addEventListener('mouseenter', atualizar);
    dropdown.addEventListener('mouseleave', atualizar);
    dropdown.addEventListener('focusin', atualizar);
    dropdown.addEventListener('focusout', atualizar);
}

// Gerencia o foco do modal de termos: ao abrir, manda o foco pra dentro
// dele (pro botão "Entendi"); ao fechar, devolve o foco pra quem abriu —
// sem isso, um usuário de teclado "perde" a posição na página
function gerenciarFocoModal() {
    const app = document.getElementById(APP_CONTAINER_ID);

    app.addEventListener('change', (evento) => {
        if (evento.target.id !== 'modal-termos-toggle') {
            return;
        }

        const modal = document.querySelector('.modal-overlay .modal');
        const gatilho = document.querySelector('label[for="modal-termos-toggle"].btn');

        if (evento.target.checked) {
            modal?.querySelector('.btn')?.focus();
        } else {
            gatilho?.focus();
        }
    });
}

// <label> não ativa com Enter/Espaço por padrão, só com clique — mas como
// demos tabindex="0" nelas (pra virarem alcançáveis por Tab), esse handler
// completa o comportamento, simulando o clique quando o foco está numa
// delas e o usuário aperta Enter ou Espaço
function handleTeclaEmLabelBotao(evento) {
    const alvo = evento.target;
    const éLabelBotao = alvo.tagName === 'LABEL' && alvo.hasAttribute('tabindex');
    if (!éLabelBotao) {
        return;
    }
    if (evento.key === 'Enter' || evento.key === ' ') {
        evento.preventDefault(); // evita rolar a página no caso do Espaço
        alvo.click();
    }
}

export function iniciarAcessibilidade() {
    // o header (menu, dropdown) fica fora do #app e nunca é recriado pelo
    // router, então esses listeners são presos uma única vez aqui
    sincronizarMenuMobile();
    sincronizarDropdown();
    gerenciarFocoModal();

    document.addEventListener('keydown', handleTeclaEmLabelBotao);
}
