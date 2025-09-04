import React, { useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import FinancesList from "./FinancesList";
import FinanceForm from "./FinanceForm";
import DeleteConfirmation from "./DeleteConfirmation";
import { useFinances } from "../hooks/useFinances";
import { CreateFinanceRequest, Finance, UpdateFinanceRequest } from "../types";

const FinancePage: React.FC = () => {
  const {
    finances,
    selectedFinance,
    loading,
    error,
    currentUserId,
    fetchFinances,
    createFinance,
    updateFinance,
    deleteFinance,
    setSelectedFinance,
    setCurrentUserId,
  } = useFinances();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleAddFinance = () => {
    setSelectedFinance(null);
    setIsEditing(false);
    setFormOpen(true);
  };

  const handleEditFinance = (finance: Finance) => {
    setSelectedFinance(finance);
    setIsEditing(true);
    setFormOpen(true);
  };

  const handleDeleteFinance = (finance: Finance) => {
    setSelectedFinance(finance);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (
    data: CreateFinanceRequest | UpdateFinanceRequest
  ) => {
    try {
      if (isEditing && selectedFinance?.id) {
        const result = await updateFinance(selectedFinance.id, data);
        if (result) {
          setSnackbar({
            open: true,
            message: "Registro financeiro atualizado com sucesso",
            severity: "success",
          });
        }
      } else {
        const result = await createFinance(data as CreateFinanceRequest);
        if (result) {
          setSnackbar({
            open: true,
            message: "Registro financeiro criado com sucesso",
            severity: "success",
          });
        }
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Erro ao salvar registro financeiro",
        severity: "error",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedFinance?.id) {
      const result = await deleteFinance(selectedFinance.id);
      if (result) {
        setSnackbar({
          open: true,
          message: "Registro financeiro excluído com sucesso",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Erro ao excluir registro financeiro",
          severity: "error",
        });
      }
      setDeleteOpen(false);
    }
  };

  const handleUserChange = (userId?: number) => {
    setCurrentUserId(userId);
    fetchFinances(userId);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento Financeiro
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && (
        <FinancesList
          finances={finances}
          onAddFinance={handleAddFinance}
          onEditFinance={handleEditFinance}
          onDeleteFinance={handleDeleteFinance}
          currentUserId={currentUserId}
          onUserChange={handleUserChange}
        />
      )}

      <FinanceForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        finance={isEditing ? selectedFinance : null}
        title={
          isEditing ? "Editar Registro Financeiro" : "Novo Registro Financeiro"
        }
        selectedUserId={currentUserId}
      />

      <DeleteConfirmation
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Registro Financeiro"
        message={`Tem certeza que deseja excluir o registro "${selectedFinance?.descricao}"?`}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FinancePage;
