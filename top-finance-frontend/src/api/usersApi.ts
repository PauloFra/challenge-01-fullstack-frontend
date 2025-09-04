import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const BASE_URL = `${API_URL}/users`;

interface User {
  id: number;
  nome: string;
}

export const usersApi = {
  getUsersList: async (): Promise<User[]> => {
    const response = await axios.get<User[]>(BASE_URL);
    return response.data;
  },
};
