/* ==========================================================================
   VALIDATION.JS
   Camada de verificação de consistência dos formulários. Roda em cima da
   validação nativa do HTML5 (required/pattern/type), mas reimplementa as
   mesmas regras em JS pra poder decidir, com mais controle, QUANDO mostrar
   feedback (no blur do campo, não a cada tecla) e COMO mostrar (classe CSS
   + mensagem de erro injetada no DOM, em vez do balão nativo do navegador).
   ========================================================================== */

const APP_CONTAINER_ID = 'app';

// Expressões regulares centralizadas — a mesma fonte de verdade usada
// nos atributos "pattern" do HTML, só que reaproveitada aqui em JS
const REGEX = {
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    telefone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    cep: /^\d{5}-\d{3}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

// Avalia UM campo e devolve o veredito: { valido, mensagem }
function validarCampo(campo) {
    const valor = campo.value.trim();

    // 1) campo obrigatório vazio
    if (campo.hasAttribute('required') && valor === '') {
        return { valido: false, mensagem: 'Este campo é obrigatório.' };
    }

    // 2) formatos específicos, verificados por RegEx conforme o id do campo
    if (campo.id.endsWith('-cpf') && !REGEX.cpf.test(valor)) {
        return { valido: false, mensagem: 'CPF deve seguir o formato 000.000.000-00.' };
    }
    if (campo.id.endsWith('-telefone') && !REGEX.telefone.test(valor)) {
        return { valido: false, mensagem: 'Telefone deve seguir o formato (00) 00000-0000.' };
    }
    if (campo.id.endsWith('-cep') && !REGEX.cep.test(valor)) {
        return { valido: false, mensagem: 'CEP deve seguir o formato 00000-000.' };
    }
    if (campo.type === 'email' && valor !== '' && !REGEX.email.test(valor)) {
        return { valido: false, mensagem: 'Digite um e-mail válido.' };
    }

    // 3) tamanho mínimo, quando o campo declarar minlength
    const minlength = campo.getAttribute('minlength');
    if (minlength && valor.length < Number(minlength)) {
        return { valido: false, mensagem: `Digite pelo menos ${minlength} caracteres.` };
    }

    return { valido: true, mensagem: '' };
}

// Aplica o resultado da validação no DOM: classe de estado + mensagem de erro
function aplicarEstadoCampo(campo, resultado) {
    campo.classList.remove('campo-valido', 'campo-invalido');
    campo.classList.add(resultado.valido ? 'campo-valido' : 'campo-invalido');

    // aria-invalid diz explicitamente pra tecnologia assistiva se o valor
    // atual é aceito ou não, independente da cor da borda (que um leitor
    // de tela não enxerga)
    campo.setAttribute('aria-invalid', String(!resultado.valido));

    const proximoIrmao = campo.nextElementSibling;
    const mensagemExistente = proximoIrmao && proximoIrmao.classList.contains('field-error')
        ? proximoIrmao
        : null;
    const idMensagem = `${campo.id}-erro`;

    if (!resultado.valido) {
        // injeta (ou reaproveita) um <span> de erro logo depois do campo
        const mensagemEl = mensagemExistente || document.createElement('span');
        mensagemEl.className = 'field-error';
        mensagemEl.id = idMensagem;
        mensagemEl.textContent = resultado.mensagem;
        if (!mensagemExistente) {
            campo.insertAdjacentElement('afterend', mensagemEl);
        }
        // liga o campo à mensagem: leitores de tela anunciam o erro junto
        // do campo, mesmo que ele não esteja visualmente ao lado
        campo.setAttribute('aria-describedby', idMensagem);
    } else if (mensagemExistente) {
        // campo ficou válido: remove a mensagem de erro e desfaz o vínculo
        mensagemExistente.remove();
        campo.removeAttribute('aria-describedby');
    }
}

// Dispara a cada vez que o usuário SAI de um campo (não a cada tecla)
function handleFocusOut(evento) {
    const campo = evento.target;
    const éCampoDeFormulario = campo.tagName === 'INPUT' || campo.tagName === 'SELECT';
    if (!éCampoDeFormulario || !campo.closest('form')) {
        return;
    }

    aplicarEstadoCampo(campo, validarCampo(campo));
}

// Valida o formulário inteiro de uma vez (usado no submit) e devolve se pode prosseguir
export function validarFormularioCompleto(form) {
    const campos = form.querySelectorAll('input, select');
    let formularioValido = true;

    campos.forEach((campo) => {
        const resultado = validarCampo(campo);
        aplicarEstadoCampo(campo, resultado);
        if (!resultado.valido) {
            formularioValido = false;
        }
    });

    return formularioValido;
}

export function iniciarValidacao() {
    const app = document.getElementById(APP_CONTAINER_ID);
    // "focusout" (diferente de "blur") borbulha pelo DOM, então dá pra usar
    // event delegation no #app mesmo com campos recriados a cada rota
    app.addEventListener('focusout', handleFocusOut);
}
