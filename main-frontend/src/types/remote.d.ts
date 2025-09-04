declare module "users/UsersPage" {
  const UsersPage: React.ComponentType;
  export default UsersPage;
}

declare module "finance/FinancePage" {
  const FinancePage: React.ComponentType;
  export default FinancePage;
}

declare module "users/remoteTypes" {
  export interface User {
    id: number;
    nome: string;
    email: string;
    rua: string;
    numero: string | number;
    bairro: string;
    complemento?: string;
    cidade: string;
    estado: string;
    cep: string;
    status: string;
  }
}

declare module "finance/remoteTypes" {
  export interface Finance {
    id: number;
    user_id: number;
    valor: number;
    descricao: string;
    created: string;
  }
}
