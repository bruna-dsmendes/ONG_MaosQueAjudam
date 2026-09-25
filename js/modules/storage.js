/* ==========================================================================
   STORAGE.JS
   Camada de persistência. Isola todo o acesso ao localStorage num só lugar,
   pra o resto da aplicação nunca chamar localStorage.getItem/setItem
   diretamente, só através destas funções.
   ========================================================================== */

const CHAVE_STORAGE = 'maos-que-ajudam:cadastros';

// Lê o array de cadastros já salvo, ou devolve um array vazio na primeira vez
function lerTodos() {
    const bruto = localStorage.getItem(CHAVE_STORAGE);
    if (!bruto) {
        return [];
    }
    try {
        return JSON.parse(bruto);
    } catch (erro) {
        console.error('Não foi possível ler os cadastros salvos:', erro);
        return [];
    }
}

// Adiciona um novo cadastro (doador ou voluntário) e regrava a lista inteira
export function salvarCadastro(tipo, dados) {
    const cadastros = lerTodos();

    cadastros.push({
        tipo,
        dados,
        criadoEm: new Date().toISOString()
    });

    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(cadastros));
}

// Devolve todos os cadastros, opcionalmente filtrando por tipo ('doador' | 'voluntario')
export function listarCadastros(tipo) {
    const todos = lerTodos();
    return tipo ? todos.filter((c) => c.tipo === tipo) : todos;
}
