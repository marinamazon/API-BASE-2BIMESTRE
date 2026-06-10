## 📋 EXEMPLOS DE REQUISIÇÕES PARA TESTAR NO INSOMNIA

Todos os exemplos assumem que a API está rodando em: `http://localhost:3000`

### 1️⃣ LISTAR TODAS AS TAREFAS
```
GET http://localhost:3000/tasks
```

**Resposta esperada (200 OK):**
```json
{
  "sucesso": true,
  "total": 0,
  "tarefas": []
}
```

---

### 2️⃣ CRIAR NOVA TAREFA
```
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Estudar JavaScript",
  "description": "Revisar conceitos de async/await",
  "completed": false
}
```

**Resposta esperada (201 Created):**
```json
{
  "sucesso": true,
  "mensagem": "Tarefa criada com sucesso",
  "tarefa": {
    "id": 1,
    "title": "Estudar JavaScript",
    "description": "Revisar conceitos de async/await",
    "completed": false,
    "createdAt": "2026-05-26T08:30:00.000Z"
  }
}
```

---

### 3️⃣ BUSCAR TAREFA POR ID
```
GET http://localhost:3000/tasks/1
```

**Resposta esperada (200 OK):**
```json
{
  "sucesso": true,
  "tarefa": {
    "id": 1,
    "title": "Estudar JavaScript",
    "description": "Revisar conceitos de async/await",
    "completed": false,
    "createdAt": "2026-05-26T08:30:00.000Z"
  }
}
```

**Se ID não existir (404 Not Found):**
```json
{
  "erro": "Tarefa não encontrada"
}
```

---

### 4️⃣ ATUALIZAR TAREFA (atualização parcial)
```
PUT http://localhost:3000/tasks/1
Content-Type: application/json

{
  "completed": true
}
```

**Resposta esperada (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Tarefa atualizada com sucesso",
  "tarefa": {
    "id": 1,
    "title": "Estudar JavaScript",
    "description": "Revisar conceitos de async/await",
    "completed": true,
    "createdAt": "2026-05-26T08:30:00.000Z"
  }
}
```

**Exemplo atualizando múltiplos campos:**
```
PUT http://localhost:3000/tasks/1
Content-Type: application/json

{
  "title": "Estudar TypeScript",
  "description": "Entender types e interfaces",
  "completed": false
}
```

---

### 5️⃣ EXCLUIR TAREFA
```
DELETE http://localhost:3000/tasks/1
```

**Resposta esperada (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Tarefa excluída com sucesso",
  "tarefa": {
    "id": 1,
    "title": "Estudar JavaScript",
    "description": "Revisar conceitos de async/await",
    "completed": true,
    "createdAt": "2026-05-26T08:30:00.000Z"
  }
}
```

---

## 🧪 SEQUÊNCIA COMPLETA DE TESTES

### Passo 1: Criar 3 tarefas

**Requisição 1:**
```json
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Tarefa 1",
  "description": "Primeira tarefa"
}
```

**Requisição 2:**
```json
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Tarefa 2",
  "description": "Segunda tarefa",
  "completed": true
}
```

**Requisição 3:**
```json
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Tarefa 3"
}
```

### Passo 2: Listar todas
```
GET http://localhost:3000/tasks
```
✅ Deve retornar array com 3 tarefas

### Passo 3: Buscar uma específica
```
GET http://localhost:3000/tasks/2
```
✅ Deve retornar a tarefa com ID 2

### Passo 4: Atualizar uma tarefa
```
PUT http://localhost:3000/tasks/1
Content-Type: application/json

{
  "title": "Tarefa 1 ATUALIZADA",
  "completed": true
}
```
✅ Deve retornar a tarefa com os dados atualizados

### Passo 5: Deletar uma tarefa
```
DELETE http://localhost:3000/tasks/3
```
✅ Deve retornar a tarefa deletada

### Passo 6: Verificar exclusão
```
GET http://localhost:3000/tasks/3
```
❌ Deve retornar 404 Not Found

### Passo 7: Listar novamente
```
GET http://localhost:3000/tasks
```
✅ Deve retornar apenas 2 tarefas (as outras foram deletadas)

---

## ⚠️ CASOS DE ERRO PARA TESTAR

### 1. ID Inválido
```
GET http://localhost:3000/tasks/abc
```
**Resposta: 400 Bad Request**
```json
{
  "erro": "ID inválido"
}
```

### 2. Campo Obrigatório Faltando
```
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "description": "Sem título"
}
```
**Resposta: 400 Bad Request**
```json
{
  "erro": "Title é obrigatório e deve ser string"
}
```

### 3. Tarefa Inexistente
```
GET http://localhost:3000/tasks/999
```
**Resposta: 404 Not Found**
```json
{
  "erro": "Tarefa não encontrada"
}
```

### 4. Atualizar Tarefa Inexistente
```
PUT http://localhost:3000/tasks/999
Content-Type: application/json

{
  "title": "Não existe"
}
```
**Resposta: 404 Not Found**
```json
{
  "erro": "Tarefa não encontrada"
}
```

---

## 💡 DICAS PARA USAR NO INSOMNIA

1. **Importe as requisições:** Você pode copiar e colar cada bloco acima diretamente no Insomnia
2. **Use variáveis de ambiente:** Crie uma variável `API_URL = http://localhost:3000`
3. **Use collections:** Organize as requisições em uma collection chamada "Tasks CRUD"
4. **Salve respostas:** Use a aba "Response" para visualizar respostas e validar
5. **Use o histórico:** Insomnia mantém histórico de requisições anteriores

---

## 🚀 PRÓXIMOS PASSOS

Após validar o CRUD funcionando:
1. ✅ Testar no Insomnia (como acima)
2. ✅ Verificar os logs no terminal do servidor
3. ✅ Conectar ao frontend (se houver)
4. ✅ Adicionar autenticação (JWT) - se necessário
5. ✅ Implementar paginação - se necessário
