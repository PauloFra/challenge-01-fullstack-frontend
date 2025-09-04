import { useState, useEffect, useCallback } from "react";
import { usersApi } from "../api/usersApi";
import { CreateUserRequest, UpdateUserRequest, User } from "../types";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await usersApi.getUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError("Erro ao carregar usuários");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const user = await usersApi.getUserById(id);
      setSelectedUser(user);
      return user;
    } catch (err) {
      setError("Erro ao carregar detalhes do usuário");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (userData: CreateUserRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await usersApi.createUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      return newUser;
    } catch (err) {
      setError("Erro ao criar usuário");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(
    async (id: number, userData: UpdateUserRequest) => {
      setLoading(true);
      setError(null);
      try {
        const updatedUser = await usersApi.updateUser(id, userData);
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? updatedUser : user))
        );
        if (selectedUser?.id === id) {
          setSelectedUser(updatedUser);
        }
        return updatedUser;
      } catch (err) {
        setError("Erro ao atualizar usuário");
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [selectedUser]
  );

  const deleteUser = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await usersApi.deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        if (selectedUser?.id === id) {
          setSelectedUser(null);
        }
        return true;
      } catch (err) {
        setError("Erro ao excluir usuário");
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [selectedUser]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    selectedUser,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    setSelectedUser,
  };
};
