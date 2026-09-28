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

// Gerencia o foco de QUALQUER modal (.modal-toggle): ao abrir, manda o foco
// pra dentro dele (primeiro campo ou botão); ao fechar, devolve o foco pra
// quem abriu. Sem isso, um usuário de teclado "perde" a posição na página.
function gerenciarFocoModal() {
    const app = document.getElementById(APP_CONTAINER_ID);

    app.addEventListener('change', (evento) => {
        const toggle = evento.target;
        if (!toggle.classList?.contains('modal-toggle')) {
            return;
        }

        const modal = toggle.closest('.modal-wrap')?.querySelector('.modal');

        if (toggle.checked) {
            modal?.querySelector('input:not([type="checkbox"]), select, .btn')?.focus();
        } else {
            // o gatilho é a label (fora do modal) ligada a esse checkbox
            const gatilho = [...document.querySelectorAll(`label[for="${toggle.id}"]`)]
                .find((l) => !l.closest('.modal'));
            gatilho?.focus();
        }
    });
}

// Esc fecha o modal aberto mais recente (o último no DOM fica por cima)
function fecharModalComEsc(evento) {
    if (evento.key !== 'Escape') {
        return;
    }
    const abertos = [...document.querySelectorAll('.modal-toggle:checked')];
    const topo = abertos[abertos.length - 1];
    if (topo) {
        topo.checked = false;
        topo.dispatchEvent(new Event('change', { bubbles: true }));
    }
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
    document.addEventListener('keydown', fecharModalComEsc);
}
