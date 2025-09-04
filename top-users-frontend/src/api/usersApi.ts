import axios from "axios";
import { CreateUserRequest, UpdateUserRequest, User } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const BASE_URL = `${API_URL}/users`;

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get<User[]>(BASE_URL);
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${BASE_URL}/${id}`);
    return response.data;
  },

  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await axios.post<User>(BASE_URL, userData);
    return response.data;
  },

  updateUser: async (
    id: number,
    userData: UpdateUserRequest
  ): Promise<User> => {
    const response = await axios.put<User>(`${BASE_URL}/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
