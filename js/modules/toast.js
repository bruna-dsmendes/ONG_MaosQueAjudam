/* ==========================================================================
   TOAST.JS
   Responsabilidade única: criar/reaproveitar o elemento .toast e controlar
   sua exibição temporária. Não sabe nada sobre formulários ou storage —
   só recebe uma mensagem de texto e mostra na tela.
   ========================================================================== */

const DURACAO_MS = 4000;

export function mostrarToast(mensagem) {
    let toast = document.querySelector('.toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = '<span class="toast-icon" aria-hidden="true">✓</span><span class="toast-texto"></span>';
        document.body.appendChild(toast);
    }

    toast.querySelector('.toast-texto').textContent = mensagem;
    toast.classList.add('is-visible');

    clearTimeout(toast._timeoutId);
    toast._timeoutId = setTimeout(() => {
        toast.classList.remove('is-visible');
    }, DURACAO_MS);
}
