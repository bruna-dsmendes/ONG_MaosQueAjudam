/* ==========================================================================
   PIX.JS
   Responsabilidade única: montar o código "Pix Copia e Cola" (BR Code do
   Banco Central, padrão EMV) a partir dos dados da ONG e do valor. Não
   sabe nada de tela, formulário ou storage.
   ========================================================================== */

// Cada campo do BR Code é: ID (2 dígitos) + tamanho (2 dígitos) + valor
function campo(id, valor) {
    return id + String(valor.length).padStart(2, '0') + valor;
}

// CRC16-CCITT (polinômio 0x1021, valor inicial 0xFFFF), exigido no fim do código
export function crc16(texto) {
    let crc = 0xFFFF;
    for (let i = 0; i < texto.length; i++) {
        crc ^= texto.charCodeAt(i) << 8;
        for (let bit = 0; bit < 8; bit++) {
            crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
        }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function gerarPixPayload({ chave, nome, cidade, valor }) {
    const conta = campo('00', 'br.gov.bcb.pix') + campo('01', chave);

    let payload =
        campo('00', '01') +                       // versão do formato
        campo('01', '11') +                       // QR reutilizável
        campo('26', conta) +                      // dados da conta (chave Pix)
        campo('52', '0000') +                     // categoria do comerciante
        campo('53', '986');                       // moeda: real (BRL)

    if (valor > 0) {
        payload += campo('54', valor.toFixed(2)); // valor da doação
    }

    payload +=
        campo('58', 'BR') +
        campo('59', nome) +
        campo('60', cidade) +
        campo('62', campo('05', '***'));          // identificador da transação

    payload += '6304';                            // o CRC calcula sobre tudo, inclusive "6304"
    return payload + crc16(payload);
}
