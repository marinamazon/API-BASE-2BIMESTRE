import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

// ========================================
// ROTAS REST - CRUD COMPLETO
// ========================================

const router = express.Router();

/**
 * GET /tasks - Listar todas as tarefas
 * @returns {Array} Lista de tarefas
 */
router.get("/tasks", TarefaController.listar);

/**
 * GET /tasks/:id - Buscar tarefa por ID
 * @param {number} id - ID da tarefa
 * @returns {Object} Tarefa encontrada
 */
router.get("/tasks/:id", TarefaController.buscarPorId);

/**
 * POST /tasks - Criar nova tarefa
 * @body {Object} { title, description?, completed? }
 * @returns {Object} Tarefa criada
 */
router.post("/tasks", TarefaController.criar);

/**
 * PUT /tasks/:id - Atualizar tarefa
 * @param {number} id - ID da tarefa
 * @body {Object} { title?, description?, completed? }
 * @returns {Object} Tarefa atualizada
 */
router.put("/tasks/:id", TarefaController.atualizar);

/**
 * DELETE /tasks/:id - Excluir tarefa
 * @param {number} id - ID da tarefa
 * @returns {Object} Tarefa deletada
 */
router.delete("/tasks/:id", TarefaController.excluir);

export default router;
