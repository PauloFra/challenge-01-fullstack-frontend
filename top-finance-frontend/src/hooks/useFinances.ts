import { useState, useEffect, useCallback } from "react";
import { financeApi } from "../api/financeApi";
import { CreateFinanceRequest, Finance, UpdateFinanceRequest } from "../types";

export const useFinances = (initialUserId?: number) => {
  const [finances, setFinances] = useState<Finance[]>([]);
  const [selectedFinance, setSelectedFinance] = useState<Finance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | undefined>(
    initialUserId
  );

  const fetchFinances = useCallback(
    async (userId?: number) => {
      setLoading(true);
      setError(null);
      try {
        const fetchedFinances = await financeApi.getFinances(
          userId ?? currentUserId
        );
        setFinances(fetchedFinances);
        if (userId !== undefined && userId !== currentUserId) {
          setCurrentUserId(userId);
        }
      } catch (err) {
        setError("Erro ao carregar registros financeiros");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [currentUserId]
  );

  const fetchFinanceById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const finance = await financeApi.getFinanceById(id);
      setSelectedFinance(finance);
      return finance;
    } catch (err) {
      setError("Erro ao carregar detalhes do registro financeiro");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createFinance = useCallback(
    async (financeData: CreateFinanceRequest) => {
      setLoading(true);
      setError(null);
      try {
        const newFinance = await financeApi.createFinance(financeData);
        setFinances((prevFinances) => [...prevFinances, newFinance]);
        return newFinance;
      } catch (err) {
        setError("Erro ao criar registro financeiro");
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateFinance = useCallback(
    async (id: number, financeData: UpdateFinanceRequest) => {
      setLoading(true);
      setError(null);
      try {
        const updatedFinance = await financeApi.updateFinance(id, financeData);
        setFinances((prevFinances) =>
          prevFinances.map((finance) =>
            finance.id === id ? updatedFinance : finance
          )
        );
        if (selectedFinance?.id === id) {
          setSelectedFinance(updatedFinance);
        }
        return updatedFinance;
      } catch (err) {
        setError("Erro ao atualizar registro financeiro");
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [selectedFinance]
  );

  const deleteFinance = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await financeApi.deleteFinance(id);
        setFinances((prevFinances) =>
          prevFinances.filter((finance) => finance.id !== id)
        );
        if (selectedFinance?.id === id) {
          setSelectedFinance(null);
        }
        return true;
      } catch (err) {
        setError("Erro ao excluir registro financeiro");
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [selectedFinance]
  );

  useEffect(() => {
    fetchFinances();
  }, [fetchFinances]);

  return {
    finances,
    selectedFinance,
    loading,
    error,
    currentUserId,
    fetchFinances,
    fetchFinanceById,
    createFinance,
    updateFinance,
    deleteFinance,
    setSelectedFinance,
    setCurrentUserId,
  };
};
