/* ==========================================================================
   MASKS.JS
   Responsabilidade única: formatar o valor de um campo de texto conforme o
   usuário digita (CPF, telefone, CEP). Não sabe nada sobre formulários,
   eventos ou validação — só recebe uma string e devolve outra formatada.
   ========================================================================== */

const mascaras = {
    cpf(valor) {
        return valor
            .replace(/\D/g, '')
            .slice(0, 11)
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    },
    telefone(valor) {
        return valor
            .replace(/\D/g, '')
            .slice(0, 11)
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    },
    cep(valor) {
        return valor
            .replace(/\D/g, '')
            .slice(0, 8)
            .replace(/(\d{5})(\d)/, '$1-$2');
    }
};

// Recebe o próprio campo (<input>), identifica qual máscara aplicar pelo
// final do seu id, e já devolve o valor formatado pronto pra atribuir
export function aplicarMascara(campo) {
    if (campo.id.endsWith('-cpf')) {
        return mascaras.cpf(campo.value);
    }
    if (campo.id.endsWith('-telefone')) {
        return mascaras.telefone(campo.value);
    }
    if (campo.id.endsWith('-cep')) {
        return mascaras.cep(campo.value);
    }
    return campo.value; // campo sem máscara conhecida: devolve como veio
}
