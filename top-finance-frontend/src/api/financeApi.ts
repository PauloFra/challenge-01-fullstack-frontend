import axios from "axios";
import { CreateFinanceRequest, Finance, UpdateFinanceRequest } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const BASE_URL = `${API_URL}/finance`;

export const financeApi = {
  getFinances: async (userId?: number): Promise<Finance[]> => {
    const params = userId ? { userId } : {};
    const response = await axios.get<Finance[]>(BASE_URL, { params });
    return response.data;
  },

  getFinanceById: async (id: number): Promise<Finance> => {
    const response = await axios.get<Finance>(`${BASE_URL}/${id}`);
    return response.data;
  },

  createFinance: async (
    financeData: CreateFinanceRequest
  ): Promise<Finance> => {
    const response = await axios.post<Finance>(BASE_URL, financeData);
    return response.data;
  },

  updateFinance: async (
    id: number,
    financeData: UpdateFinanceRequest
  ): Promise<Finance> => {
    const response = await axios.put<Finance>(`${BASE_URL}/${id}`, financeData);
    return response.data;
  },

  deleteFinance: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
