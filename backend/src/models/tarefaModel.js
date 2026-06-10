import { prisma } from '../config/prisma.js';

// ========================================
// MODEL - CRUD COMPLETO COM PRISMA
// ========================================

/**
 * Listar todas as tarefas
 * @returns {Promise<Array>} Array de tarefas ou array vazio
 */
export async function listar() {
  try {
    const tarefas = await prisma.task.findMany();
    return tarefas;
  } catch (erro) {
    console.error('Erro ao listar tarefas:', erro.message);
    return [];
  }
}

/**
 * Buscar tarefa por ID
 * @param {number} id - ID da tarefa
 * @returns {Promise<Object|null>} Tarefa encontrada ou null
 */
export async function buscarPorId(id) {
  try {
    const tarefa = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });
    return tarefa || null;
  } catch (erro) {
    // P2025 = Registro não encontrado
    if (erro.code === 'P2025') {
      return null;
    }
    console.error('Erro ao buscar tarefa:', erro.message);
    return null;
  }
}

/**
 * Criar nova tarefa
 * @param {Object} dados - { title, description }
 * @returns {Promise<Object|null>} Tarefa criada ou null
 */
export async function criar(dados) {
  try {
    // Valida campos obrigatórios
    if (!dados.title || dados.title.trim() === '') {
      console.error('Título é obrigatório');
      return null;
    }

    const novaTarefa = await prisma.task.create({
      data: {
        title: dados.title.trim(),
        description: dados.description ? dados.description.trim() : null,
        completed: dados.completed || false
      }
    });
    return novaTarefa;
  } catch (erro) {
    console.error('Erro ao criar tarefa:', erro.message);
    return null;
  }
}

/**
 * Atualizar tarefa existente
 * @param {number} id - ID da tarefa
 * @param {Object} dados - { title?, description?, completed? }
 * @returns {Promise<Object|null>} Tarefa atualizada ou null
 */
export async function atualizar(id, dados) {
  try {
    // Valida se tarefa existe
    const tarefaExistente = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!tarefaExistente) {
      console.error(`Tarefa com ID ${id} não encontrada`);
      return null;
    }

    // Prepara dados para atualização (apenas campos fornecidos)
    const dadosAtualizacao = {};
    if (dados.title !== undefined) {
      dadosAtualizacao.title = dados.title.trim();
    }
    if (dados.description !== undefined) {
      dadosAtualizacao.description = dados.description ? dados.description.trim() : null;
    }
    if (dados.completed !== undefined) {
      dadosAtualizacao.completed = dados.completed;
    }

    const tarefaAtualizada = await prisma.task.update({
      where: { id: parseInt(id) },
      data: dadosAtualizacao
    });
    return tarefaAtualizada;
  } catch (erro) {
    if (erro.code === 'P2025') {
      return null;
    }
    console.error('Erro ao atualizar tarefa:', erro.message);
    return null;
  }
}

/**
 * Excluir tarefa
 * @param {number} id - ID da tarefa
 * @returns {Promise<Object|null>} Tarefa deletada ou null
 */
export async function excluir(id) {
  try {
    // Valida se tarefa existe
    const tarefaExistente = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!tarefaExistente) {
      console.error(`Tarefa com ID ${id} não encontrada`);
      return null;
    }

    const tarefaDeletada = await prisma.task.delete({
      where: { id: parseInt(id) }
    });
    return tarefaDeletada;
  } catch (erro) {
    if (erro.code === 'P2025') {
      return null;
    }
    console.error('Erro ao excluir tarefa:', erro.message);
    return null;
  }
}
// ========================================

/**
 * Procura o índice de uma tarefa no array com base no id
 * @param {number} id - ID da tarefa a ser encontrada
 * @returns {number} - Índice da tarefa ou -1 se não encontrar
 */
function encontrarIndiceTarefa(id) {
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id === id) {
      return i;
    }
  }
  return -1;
}

/**
 * Gera um novo id para a próxima tarefa
 * Se o array estiver vazio, começa com 1
 * Caso contrário, pega o maior id existente e soma 1
 * @returns {number} - Novo ID gerado
 */
function gerarNovoId() {
  if (tarefas.length === 0) return 1;

  let maiorId = 0;
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id > maiorId) {
      maiorId = tarefas[i].id;
    }
  }

  return maiorId + 1;
}

// ========================================
// OPERAÇÕES CRUD
// ========================================

/**
 * Retorna todas as tarefas cadastradas
 * @returns {Array} - Array com todas as tarefas
 */
export function obterTodasTarefas() {
  return tarefas;
}

/**
 * Procura uma tarefa específica pelo id
 * @param {number} id - ID da tarefa a ser buscada
 * @returns {Object|null} - A tarefa encontrada ou null
 */
export function obterTarefaPorId(id) {
  const indice = encontrarIndiceTarefa(id);

  if (indice === -1) return null;

  return tarefas[indice];
}

/**
 * Cria uma nova tarefa
 * A descrição é limpa com trim() para remover espaços extras
 * Toda nova tarefa começa com concluida = false
 * @param {string} descricao - Descrição da nova tarefa
 * @returns {Object} - A tarefa criada
 */
export function criarNovaTarefa(descricao) {
  const novaTarefa = {
    id: gerarNovoId(),
    descricao: descricao.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

/**
 * Atualiza uma tarefa existente
 * Pode atualizar a descrição e/ou o status de conclusão
 * @param {number} id - ID da tarefa a ser atualizada
 * @param {string} novaDescricao - Nova descrição (opcional)
 * @param {boolean} novoStatus - Novo status de conclusão (opcional)
 * @returns {Object|null} - A tarefa atualizada ou null se não encontrar
 */
export function atualizarTarefa(id, novaDescricao, novoStatus) {
  const indice = encontrarIndiceTarefa(id);

  if (indice === -1) return null;

  const tarefa = tarefas[indice];

  // Atualiza a descrição apenas se ela foi enviada
  if (novaDescricao !== undefined) {
    tarefa.descricao = novaDescricao.trim();
  }

  // Atualiza o status apenas se ele foi enviado
  if (novoStatus !== undefined) {
    tarefa.concluida = novoStatus;
  }

  return tarefa;
}

/**
 * Exclui uma tarefa pelo id
 * @param {number} id - ID da tarefa a ser excluída
 * @returns {Object|null} - A tarefa removida ou null se não encontrar
 */
export function excluirTarefa(id) {
  const indice = encontrarIndiceTarefa(id);

  if (indice === -1) return null;

  const tarefaRemovida = tarefas[indice];

  // Remove 1 elemento do array na posição encontrada
  tarefas.splice(indice, 1);

  return tarefaRemovida;
}
