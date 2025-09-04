# Main Frontend -

Frontend principal da aplicação , responsável pelo login de administrador e por hospedar os microfrontends.

## Tecnologias Utilizadas

- React 18 com TypeScript
- Vite.js
- Module Federation para microfrontends
- Material UI para componentes
- Zustand para gerenciamento de estado
- React Router para navegação

## Estrutura do Projeto

```
src/
├── api/            # Configuração do cliente de API
├── components/     # Componentes reutilizáveis
├── pages/          # Páginas da aplicação
├── stores/         # Stores para gerenciamento de estado
├── styles/         # Estilos globais e temas
└── types/          # Definições de tipos
```

## Requisitos

- Node.js 18+
- npm ou yarn

## Instalação

```bash
# Instalar dependências
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as variáveis:

```
VITE_API_URL=http://localhost:3000
```

## Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

## Build

```bash
# Gerar build de produção
npm run build

# Visualizar build localmente
npm run preview
```

## Testes

```bash
# Executar testes unitários
npm test

# Acompanhar testes em tempo real
npm run test:watch

# Verificar cobertura de testes
npm run test:coverage
```

## Docker

```bash
# Construir a imagem
docker build -t main-frontend .

# Executar o container
docker run -p 8080:80 main-frontend
```

## Integração com Microfrontends

Este projeto utiliza Module Federation para carregar dinamicamente os microfrontends:

- **top-users-frontend**: Interface para gerenciamento de usuários
- **top-finance-frontend**: Interface para gerenciamento financeiro

Cada microfrontend é carregado sob demanda quando o usuário navega para a rota correspondente.
