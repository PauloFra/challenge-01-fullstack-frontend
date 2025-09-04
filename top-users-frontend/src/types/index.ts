export enum UserStatus {
  ACTIVE = "ativo",
  INACTIVE = "inativo",
}

export interface User {
  id?: number;
  nome: string;
  email: string;
  rua: string;
  numero: string | number;
  bairro: string;
  complemento?: string;
  cidade: string;
  estado: string;
  cep: string;
  status: UserStatus;
  is_deleted?: boolean;
  created?: string;
  updated?: string;
  deleted?: string | null;
}

export interface CreateUserRequest {
  nome: string;
  email: string;
  rua: string;
  numero: string | number;
  bairro: string;
  complemento?: string;
  cidade: string;
  estado: string;
  cep: string;
  status?: UserStatus;
}

export interface UpdateUserRequest {
  nome?: string;
  email?: string;
  rua?: string;
  numero?: string | number;
  bairro?: string;
  complemento?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  status?: UserStatus;
}
