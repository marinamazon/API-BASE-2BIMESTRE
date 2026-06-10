import { testarConexao } from './src/config/prisma.js';

async function main() {
  console.log('🔍 Testando conexão com o banco de dados...\n');
  const conexaoOk = await testarConexao();
  
  if (conexaoOk) {
    console.log('\n✨ Tudo pronto! O backend está pronto para usar.');
  } else {
    console.log('\n⚠️  Verifique suas variáveis de ambiente (.env)');
    process.exit(1);
  }
}

main();
