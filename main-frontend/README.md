# Main Frontend

## O que é esta aplicação?

Esta é a aplicação principal do sistema, feita com React, TypeScript e Vite. Ela cuida do login do administrador e compartilha informações do usuário logado com os outros módulos (microfrontends) usando Module Federation.

### O que ela faz?

- Cuidar do login do administrador
- Manter as informações do usuário logado
- Compartilhar dados com os outros módulos
- Navegar entre diferentes partes do sistema
- Interface moderna que funciona em qualquer tela

## Tecnologias Utilizadas

- **React.js**: Biblioteca para construção de interfaces
- **TypeScript**: Linguagem de programação tipada
- **Vite.js**: Build tool e dev server
- **Module Federation**: Sistema de microfrontends
- **Material-UI**: Biblioteca de componentes
- **Zustand**: Gerenciamento de estado
- **React Router**: Roteamento
- **Vitest**: Framework de testes

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker (opcional)

### Instalação Local

1. Clone o repositório:

```bash
git clone <url-do-repositorio-main-frontend>
cd main-frontend
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
VITE_USERS_FRONTEND_URL=http://localhost:8081
VITE_FINANCE_FRONTEND_URL=http://localhost:8082
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
docker build -t main-frontend .

# Execução do container
docker run -p 8080:80 main-frontend
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

O Module Federation está configurado para compartilhar componentes e dados com os microfrontends:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    federation({
      name: "main-frontend",
      remotes: {
        "users-frontend": "http://localhost:8081/assets/remoteEntry.js",
        "finance-frontend": "http://localhost:8082/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "@mui/material"],
    }),
  ],
});
```

### Componentes Compartilhados

- Layout principal
- Sistema de autenticação
- Contexto de usuário
- Componentes de navegação

## Estrutura do Projeto

```
src/
├── api/                  # Cliente da API
│   └── apiClient.ts
├── components/           # Componentes compartilhados
│   ├── Layout.tsx
│   └── PrivateRoute.tsx
├── pages/               # Páginas da aplicação
│   ├── Dashboard.tsx
│   └── LoginPage.tsx
├── stores/              # Gerenciamento de estado
│   └── authStore.ts
├── styles/              # Estilos e temas
│   ├── index.css
│   └── theme.ts
├── types/               # Definições de tipos
│   ├── auth.ts
│   └── remote.d.ts
├── App.tsx              # Componente principal
└── main.tsx            # Ponto de entrada
```

## Páginas Disponíveis

### Login

- Autenticação de administrador
- Validação de credenciais
- Redirecionamento após login

### Dashboard

- Visão geral do sistema
- Navegação para microfrontends
- Informações do usuário logado

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

## Configuração do Module Federation

### Exposição de Componentes

```typescript
// Componentes expostos para microfrontends
export { Layout } from "./components/Layout";
export { PrivateRoute } from "./components/PrivateRoute";
export { useAuthStore } from "./stores/authStore";
```

### Importação de Microfrontends

```typescript
// Importação dinâmica de microfrontends
const UsersPage = lazy(() => import("users-frontend/UsersPage"));
const FinancePage = lazy(() => import("finance-frontend/FinancePage"));
```

## Autenticação

### Fluxo de Login

1. Usuário acessa a página de login
2. Credenciais são validadas contra a API
3. Token JWT é armazenado no estado global
4. Usuário é redirecionado para o dashboard

### Gerenciamento de Estado

- Zustand para gerenciamento de estado
- Persistência do token de autenticação
- Compartilhamento do estado com microfrontends

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
