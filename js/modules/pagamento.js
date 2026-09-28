/* ==========================================================================
   PAGAMENTO.JS
   Responsabilidade única: mostrar o modal de doação por Pix (QR Code +
   código copia e cola) e tratar o botão de copiar. Usa pix.js para montar
   o código e config.js para os dados da ONG.
   ========================================================================== */

import qrcode from 'qrcode-generator';
import { PIX } from './config.js';
import { gerarPixPayload } from './pix.js';
import { mostrarToast } from './toast.js';

const APP_CONTAINER_ID = 'app';

function formatarReais(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Preenche o modal com o valor, o QR Code e o código, e abre o modal
export function mostrarPix(valor, forma) {
    const toggle = document.getElementById('modal-pix-toggle');
    if (!toggle) {
        return;
    }

    const payload = gerarPixPayload({ ...PIX, valor });

    const qr = qrcode(0, 'M'); // tipo automático, correção de erro média
    qr.addData(payload);
    qr.make();

    document.getElementById('pix-valor').textContent = formatarReais(valor);
    document.getElementById('pix-qr').innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
    document.getElementById('pix-codigo').value = payload;
    document.getElementById('pix-aviso-mensal').hidden = forma !== 'mensal';

    toggle.checked = true;
    toggle.dispatchEvent(new Event('change', { bubbles: true }));
}

async function copiarCodigo() {
    const campo = document.getElementById('pix-codigo');
    try {
        await navigator.clipboard.writeText(campo.value);
    } catch {
        campo.select(); // plano B para navegadores sem a API de área de transferência
        document.execCommand?.('copy');
    }
    mostrarToast('Código Pix copiado!');
}

export function iniciarPagamento() {
    // delegação no #app: o botão só existe depois que a rota de cadastro renderiza
    document.getElementById(APP_CONTAINER_ID).addEventListener('click', (evento) => {
        if (evento.target.closest('[data-acao="copiar-pix"]')) {
            copiarCodigo();
        }
    });
}
