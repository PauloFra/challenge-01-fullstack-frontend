import { useState, useEffect, useCallback } from "react";
import { usersApi } from "../api/usersApi";

interface User {
  id: number;
  nome: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await usersApi.getUsersList();
      setUsers(fetchedUsers);
    } catch (err) {
      setError("Erro ao carregar usuários");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
};
