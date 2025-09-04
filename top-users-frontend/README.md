# Top Users Frontend

## Descrição do Serviço

O Top Users Frontend é um microfrontend desenvolvido em React.js com TypeScript e Vite.js que fornece uma interface completa para gerenciamento de usuários. Esta aplicação utiliza Module Federation para integração com o frontend principal e oferece operações CRUD completas para a entidade User.

### Funcionalidades

- CRUD completo de usuários
- Interface responsiva e moderna
- Validação de formulários
- Filtros e busca avançada
- Paginação de resultados
- Integração com Module Federation

### Entidade User

- **nome** (string): Nome completo do usuário
- **email** (string): Email único do usuário
- **rua** (string): Endereço - rua
- **numero** (string): Endereço - número
- **bairro** (string): Endereço - bairro
- **complemento** (string): Endereço - complemento
- **cidade** (string): Endereço - cidade
- **estado** (string): Endereço - estado
- **cep** (string): CEP do endereço
- **status** (enum): Status do usuário (ativo, inativo)

## Tecnologias Utilizadas

- **React.js**: Biblioteca para construção de interfaces
- **TypeScript**: Linguagem de programação tipada
- **Vite.js**: Build tool e dev server
- **Module Federation**: Sistema de microfrontends
- **Material-UI**: Biblioteca de componentes
- **React Hook Form**: Gerenciamento de formulários
- **React Query**: Gerenciamento de estado do servidor
- **Vitest**: Framework de testes

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker (opcional)

### Instalação Local

1. Clone o repositório:

```bash
git clone <url-do-repositorio-top-users-frontend>
cd top-users-frontend
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
docker build -t top-users-frontend .

# Execução do container
docker run -p 8081:80 top-users-frontend
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
      name: "top-users-frontend",
      exposes: {
        "./UsersPage": "./src/components/UsersPage.tsx",
        "./UserForm": "./src/components/UserForm.tsx",
        "./UsersList": "./src/components/UsersList.tsx",
      },
      shared: ["react", "react-dom", "@mui/material"],
    }),
  ],
});
```

### Componentes Expostos

- `UsersPage`: Página principal de gerenciamento de usuários
- `UserForm`: Formulário para criação/edição de usuários
- `UsersList`: Lista de usuários com filtros e paginação

## Estrutura do Projeto

```
src/
├── api/                  # Cliente da API
│   └── usersApi.ts
├── components/           # Componentes da aplicação
│   ├── UsersPage.tsx
│   ├── UserForm.tsx
│   ├── UsersList.tsx
│   ├── UserCard.tsx
│   └── DeleteConfirmation.tsx
├── hooks/               # Custom hooks
│   └── useUsers.ts
├── types/               # Definições de tipos
│   └── index.ts
├── main.tsx            # Ponto de entrada
└── vite-env.d.ts       # Tipos do Vite
```

## Páginas e Componentes

### UsersPage

- Página principal de gerenciamento de usuários
- Integração com Module Federation
- Navegação e layout responsivo

### UserForm

- Formulário para criação e edição de usuários
- Validação de campos
- Integração com API

### UsersList

- Lista de usuários com paginação
- Filtros de busca
- Ações de edição e exclusão

## API Integration

### Endpoints Utilizados

- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar usuário por ID
- `POST /users` - Criar usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Custom Hooks

```typescript
// useUsers.ts
export const useUsers = () => {
  // Hook para gerenciar estado dos usuários
  // Integração com React Query
  // Cache e sincronização automática
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

- Nome (mínimo 2 caracteres)
- Email (formato válido)
- Rua
- Número
- Bairro
- Cidade
- Estado
- CEP (formato válido)

### Validações Específicas

- Email único no sistema
- CEP válido (formato brasileiro)
- Status (ativo/inativo)

## Funcionalidades Avançadas

### Filtros

- Busca por nome
- Filtro por status
- Filtro por cidade
- Ordenação por campos

### Paginação

- Configurável (10, 25, 50 itens por página)
- Navegação entre páginas
- Indicador de total de registros

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
