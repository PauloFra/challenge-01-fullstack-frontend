export interface Finance {
  id?: number;
  user_id: number;
  valor: number;
  descricao: string;
  is_deleted?: boolean;
  created?: string;
  updated?: string;
  deleted?: string | null;
}

export interface CreateFinanceRequest {
  user_id: number;
  valor: number;
  descricao: string;
}

export interface UpdateFinanceRequest {
  user_id?: number;
  valor?: number;
  descricao?: string;
}
