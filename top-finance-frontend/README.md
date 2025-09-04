# Top Finance Microfrontend -

Microfrontend para gerenciamento financeiro do sistema .

## Tecnologias Utilizadas

- React 18 com TypeScript
- Vite.js
- Module Federation para microfrontends
- Material UI para componentes
- React Hook Form para formulários
- Axios para requisições HTTP

## Estrutura do Projeto

```
src/
├── api/             # Serviços para comunicação com a API
├── components/      # Componentes React
├── hooks/           # Hooks personalizados
└── types/           # Definições de tipos
```

## Requisitos

- Node.js 18+
- npm ou yarn

## Instalação

```bash
# Instalar dependências
npm install
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
docker build -t top-finance-frontend .

# Executar o container
docker run -p 8082:80 top-finance-frontend
```

## Integração com Module Federation

Este projeto utiliza Module Federation para ser carregado dinamicamente pela aplicação principal. Ele expõe os seguintes módulos:

- `./FinancePage`: Componente principal para gerenciamento financeiro
- `./remoteTypes`: Tipos compartilhados entre os projetos
