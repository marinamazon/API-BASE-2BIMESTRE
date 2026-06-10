import * as TarefaModel from "../models/tarefaModel.js";

// ========================================
// CONTROLLER - CRUD COM VALIDAÇÕES
// ========================================

/**
 * Listar todas as tarefas
 * @route GET /tasks
 * @returns {Array} Lista de tarefas
 */
export async function listar(req, res) {
  try {
    const tarefas = await TarefaModel.listar();
    res.json({
      sucesso: true,
      total: tarefas.length,
      tarefas: tarefas
    });
  } catch (erro) {
    console.error('Erro ao listar tarefas:', erro);
    res.status(500).json({ erro: 'Erro ao listar tarefas' });
  }
}

/**
 * Buscar tarefa por ID
 * @route GET /tasks/:id
 * @param {number} id - ID da tarefa
 * @returns {Object} Tarefa encontrada
 */
export async function buscarPorId(req, res) {
  try {
    const { id } = req.params;

    // Valida se o ID é um número válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }

    const tarefa = await TarefaModel.buscarPorId(id);

    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    res.json({
      sucesso: true,
      tarefa: tarefa
    });
  } catch (erro) {
    console.error('Erro ao buscar tarefa:', erro);
    res.status(500).json({ erro: 'Erro ao buscar tarefa' });
  }
}

/**
 * Criar nova tarefa
 * @route POST /tasks
 * @body {Object} { title, description? }
 * @returns {Object} Tarefa criada
 */
export async function criar(req, res) {
  try {
    const { title, description, completed } = req.body;

    // Valida campos obrigatórios
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ erro: 'Title é obrigatório e deve ser string' });
    }

    const tarefa = await TarefaModel.criar({
      title,
      description,
      completed
    });

    if (!tarefa) {
      return res.status(400).json({ erro: 'Erro ao criar tarefa' });
    }

    res.status(201).json({
      sucesso: true,
      mensagem: 'Tarefa criada com sucesso',
      tarefa: tarefa
    });
  } catch (erro) {
    console.error('Erro ao criar tarefa:', erro);
    res.status(500).json({ erro: 'Erro ao criar tarefa' });
  }
}

/**
 * Atualizar tarefa
 * @route PUT /tasks/:id
 * @param {number} id - ID da tarefa
 * @body {Object} { title?, description?, completed? }
 * @returns {Object} Tarefa atualizada
 */
export async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Valida se o ID é válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }

    // Valida se pelo menos um campo foi fornecido
    if (!title && description === undefined && completed === undefined) {
      return res.status(400).json({ erro: 'Forneça pelo menos um campo para atualizar' });
    }

    // Valida o title, se fornecido
    if (title && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({ erro: 'Title deve ser uma string não vazia' });
    }

    const tarefa = await TarefaModel.atualizar(id, {
      title,
      description,
      completed
    });

    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    res.json({
      sucesso: true,
      mensagem: 'Tarefa atualizada com sucesso',
      tarefa: tarefa
    });
  } catch (erro) {
    console.error('Erro ao atualizar tarefa:', erro);
    res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
  }
}

/**
 * Excluir tarefa
 * @route DELETE /tasks/:id
 * @param {number} id - ID da tarefa
 * @returns {Object} Tarefa deletada
 */
export async function excluir(req, res) {
  try {
    const { id } = req.params;

    // Valida se o ID é válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }

    const tarefa = await TarefaModel.excluir(id);

    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    res.json({
      sucesso: true,
      mensagem: 'Tarefa excluída com sucesso',
      tarefa: tarefa
    });
  } catch (erro) {
    console.error('Erro ao excluir tarefa:', erro);
    res.status(500).json({ erro: 'Erro ao excluir tarefa' });
  }
}
