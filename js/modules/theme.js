/* ==========================================================================
   THEME.JS
   Responsabilidade única: aplicar, alternar e persistir a preferência de
   tema (claro/escuro) do usuário. O CSS já sabe reagir ao atributo
   data-theme no <html> (ver style.css); este módulo só decide qual valor
   esse atributo deve ter, a cada momento.
   ========================================================================== */

const CHAVE_STORAGE = 'maos-que-ajudam:tema';

function lerTemaSalvo() {
    return localStorage.getItem(CHAVE_STORAGE); // 'dark' | 'light' | null
}

// Verifica se o sistema operacional está em modo escuro, com defesa caso
// matchMedia não exista (navegadores muito antigos, ou ambientes de teste)
function sistemaPrefereEscuro() {
    return typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function aplicarTema(tema) {
    const html = document.documentElement;
    const botao = document.getElementById('theme-toggle');

    if (tema) {
        html.setAttribute('data-theme', tema);
    } else {
        html.removeAttribute('data-theme'); // sem preferência manual: segue o sistema
    }

    if (botao) {
        const escuro = tema === 'dark' || (!tema && sistemaPrefereEscuro());
        botao.textContent = escuro ? '☀️' : '🌙';
        botao.setAttribute('aria-pressed', String(escuro));
    }
}

function alternarTema() {
    const atual = lerTemaSalvo();
    const escuroAgora = atual === 'dark' || (!atual && sistemaPrefereEscuro());

    const novoTema = escuroAgora ? 'light' : 'dark';
    localStorage.setItem(CHAVE_STORAGE, novoTema);
    aplicarTema(novoTema);
}

export function iniciarTema() {
    // aplica a preferência salva assim que a aplicação carrega, restaurando
    // a escolha do usuário mesmo depois de fechar e reabrir o navegador
    aplicarTema(lerTemaSalvo());

    const botao = document.getElementById('theme-toggle');
    botao?.addEventListener('click', alternarTema);
}
