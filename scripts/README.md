# Scripts

Este diretório contém scripts utilitários para o projeto.

## 🗄️ Database Scripts

### `seed-test-user.ts` / `seed-test-user.js`

Cria um usuário de teste no banco de dados para desenvolvimento e testes.

**Credenciais do usuário de teste:**
- **Email**: `test@example.com`
- **Password**: `password123`
- **Role**: `user`

**Uso:**
```bash
# Versão TypeScript (recomendado)
npm run seed:test-user

# Versão JavaScript (fallback)
npm run seed:test-user:js
```

**Pré-requisitos:**
1. Banco PostgreSQL rodando
2. Variável `DATABASE_URL` configurada
3. Migrations aplicadas (`npm run drizzle:migrate`)

**Exemplo de DATABASE_URL:**
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### `setup-dev.sh`

Script de setup completo para ambiente de desenvolvimento.

**O que faz:**
1. Verifica se `.env` existe (cria do `.env.example` se não existir)
2. Instala dependências
3. Executa migrations do banco
4. Cria usuário de teste
5. Executa verificações (typecheck, lint, tests)

**Uso:**
```bash
./scripts/setup-dev.sh
```

## 🔧 Troubleshooting

### "tsx: not found"
- **Solução**: O script usa `npx tsx` que baixa automaticamente se necessário
- **Alternativa**: Use `npm run seed:test-user:js` (versão Node.js pura)

### "DATABASE_URL environment variable is required"
- **Solução**: Configure a variável `DATABASE_URL` no seu `.env`
- **Exemplo**: `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb"`

### "Database table 'user' does not exist"
- **Solução**: Execute as migrations primeiro: `npm run drizzle:migrate`

### "Cannot connect to database"
- **Solução**: Verifique se PostgreSQL está rodando
- **Verificar**: `pg_isready` ou conecte via `psql`

## 📝 Desenvolvimento

Para adicionar novos scripts:

1. Crie o arquivo na pasta `scripts/`
2. Adicione ao `package.json` em `scripts`
3. Documente aqui no README
4. Torne executável se for shell script: `chmod +x scripts/nome-do-script.sh`