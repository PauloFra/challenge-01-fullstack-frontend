# Top Finance Frontend

## Descrição do Serviço

O Top Finance Frontend é um microfrontend desenvolvido em React.js com TypeScript e Vite.js que fornece uma interface completa para gerenciamento financeiro. Esta aplicação utiliza Module Federation para integração com o frontend principal e oferece operações CRUD completas para a entidade Finance.

### Funcionalidades

- CRUD completo de finanças
- Interface responsiva e moderna
- Validação de formulários
- Filtros e busca avançada
- Paginação de resultados
- Relacionamento com usuários
- Gráficos e relatórios
- Integração com Module Federation

### Entidade Finance

- **user_id** (foreign key): ID do usuário relacionado
- **valor** (decimal): Valor da transação financeira
- **descricao** (string): Descrição da transação
- **is_deleted** (boolean): Flag de exclusão lógica
- **created** (timestamp): Data de criação
- **updated** (timestamp): Data da última atualização
- **deleted** (timestamp): Data de exclusão

## Tecnologias Utilizadas

- **React.js**: Biblioteca para construção de interfaces
- **TypeScript**: Linguagem de programação tipada
- **Vite.js**: Build tool e dev server
- **Module Federation**: Sistema de microfrontends
- **Material-UI**: Biblioteca de componentes
- **React Hook Form**: Gerenciamento de formulários
- **React Query**: Gerenciamento de estado do servidor
- **Recharts**: Biblioteca de gráficos
- **Vitest**: Framework de testes

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker (opcional)

### Instalação Local

1. Clone o repositório:

```bash
git clone <url-do-repositorio-top-finance-frontend>
cd top-finance-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com as configurações:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_MAIN_FRONTEND_URL=http://localhost:8080
```

4. Execute a aplicação:

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Execução com Docker

```bash
# Build da imagem
docker build -t top-finance-frontend .

# Execução do container
docker run -p 8082:80 top-finance-frontend
```

## Testes

### Executar Todos os Testes

```bash
npm run test
```

### Executar Testes em Modo Watch

```bash
npm run test:watch
```

### Executar Testes com Cobertura

```bash
npm run test:coverage
```

### Executar Testes de UI

```bash
npm run test:ui
```

## Module Federation

### Configuração

O Module Federation está configurado para expor componentes e importar dependências compartilhadas:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    federation({
      name: "top-finance-frontend",
      exposes: {
        "./FinancePage": "./src/components/FinancePage.tsx",
        "./FinanceForm": "./src/components/FinanceForm.tsx",
        "./FinancesList": "./src/components/FinancesList.tsx",
      },
      shared: ["react", "react-dom", "@mui/material"],
    }),
  ],
});
```

### Componentes Expostos

- `FinancePage`: Página principal de gerenciamento financeiro
- `FinanceForm`: Formulário para criação/edição de finanças
- `FinancesList`: Lista de finanças com filtros e paginação

## Estrutura do Projeto

```
src/
├── api/                  # Cliente da API
│   ├── financeApi.ts
│   └── usersApi.ts
├── components/           # Componentes da aplicação
│   ├── FinancePage.tsx
│   ├── FinanceForm.tsx
│   ├── FinancesList.tsx
│   ├── FinanceCard.tsx
│   ├── DeleteConfirmation.tsx
│   └── FinanceChart.tsx
├── hooks/               # Custom hooks
│   ├── useFinances.ts
│   └── useUsers.ts
├── types/               # Definições de tipos
│   └── index.ts
├── main.tsx            # Ponto de entrada
└── vite-env.d.ts       # Tipos do Vite
```

## Páginas e Componentes

### FinancePage

- Página principal de gerenciamento financeiro
- Integração com Module Federation
- Dashboard com gráficos e resumos
- Navegação e layout responsivo

### FinanceForm

- Formulário para criação e edição de finanças
- Seleção de usuário relacionado
- Validação de campos
- Integração com API

### FinancesList

- Lista de finanças com paginação
- Filtros de busca
- Ações de edição e exclusão
- Ordenação por valor e data

## API Integration

### Endpoints Utilizados

- `GET /finances` - Listar finanças
- `GET /finances/:id` - Buscar finança por ID
- `POST /finances` - Criar finança
- `PUT /finances/:id` - Atualizar finança
- `DELETE /finances/:id` - Deletar finança
- `GET /users` - Listar usuários (para relacionamento)

### Custom Hooks

```typescript
// useFinances.ts
export const useFinances = () => {
  // Hook para gerenciar estado das finanças
  // Integração com React Query
  // Cache e sincronização automática
};

// useUsers.ts
export const useUsers = () => {
  // Hook para gerenciar estado dos usuários
  // Necessário para relacionamentos
};
```

## Scripts Disponíveis

- `npm run dev` - Iniciar servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build
- `npm run lint` - Executar linter
- `npm run lint:fix` - Corrigir problemas do linter
- `npm run test` - Executar testes
- `npm run test:watch` - Executar testes em modo watch
- `npm run test:coverage` - Executar testes com cobertura
- `npm run test:ui` - Executar testes de UI

## Validação de Formulários

### Campos Obrigatórios

- Usuário (seleção obrigatória)
- Valor (número positivo)
- Descrição (mínimo 3 caracteres)

### Validações Específicas

- Valor deve ser maior que zero
- Usuário deve existir no sistema
- Descrição não pode estar vazia

## Funcionalidades Avançadas

### Filtros

- Busca por descrição
- Filtro por usuário
- Filtro por faixa de valor
- Filtro por período
- Ordenação por valor, data, usuário

### Paginação

- Configurável (10, 25, 50 itens por página)
- Navegação entre páginas
- Indicador de total de registros

### Gráficos e Relatórios

- Gráfico de receitas vs despesas
- Distribuição por usuário
- Evolução temporal
- Resumo financeiro

## Relacionamentos

### Com Usuários

- Seleção de usuário ao criar/editar finança
- Exibição do nome do usuário na lista
- Filtros por usuário específico
- Relatórios por usuário

### Operações Relacionadas

- Buscar finanças por usuário
- Calcular totais por usuário
- Validação de existência do usuário

## Dashboard Financeiro

### Métricas Principais

- Total de receitas
- Total de despesas
- Saldo atual
- Número de transações

### Gráficos Disponíveis

- Gráfico de pizza por categoria
- Gráfico de linha temporal
- Gráfico de barras por usuário

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
