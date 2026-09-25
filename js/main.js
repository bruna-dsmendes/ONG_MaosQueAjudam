/* ==========================================================================
   MAIN.JS
   Ponto de entrada da aplicação. Importa os módulos de funcionalidade e
   inicializa a SPA. Novos módulos (validação de formulário, localStorage
   etc.) serão importados e iniciados aqui nas próximas etapas do projeto.
   ========================================================================== */

import { iniciarRouter } from './modules/router.js';
import { iniciarFormularios } from './modules/forms.js';
import { iniciarValidacao } from './modules/validation.js';
import { iniciarAcessibilidade } from './modules/a11y.js';
import { iniciarTema } from './modules/theme.js';

// Configura a biblioteca externa Day.js (carregada via CDN no index.html),
// só se ela realmente carregou — assim o app não quebra se o CDN falhar
if (window.dayjs && window.dayjs_plugin_relativeTime) {
    dayjs.extend(window.dayjs_plugin_relativeTime);
    dayjs.locale('pt-br');
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarRouter();
    iniciarFormularios();
    iniciarValidacao();
    iniciarAcessibilidade();
    iniciarTema();
});
