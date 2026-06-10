import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

// Teste de conexão com o banco de dados
export async function testarConexao() {
  try {
    // Executa uma query simples para testar a conexão
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    return true;
  } catch (erro) {
    console.error('❌ Erro ao conectar ao banco de dados:', erro.message);
    return false;
  }
}

export { prisma };