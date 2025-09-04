import React, { useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import UsersList from "./UsersList";
import UserForm from "./UserForm";
import UserDetail from "./UserDetail";
import DeleteConfirmation from "./DeleteConfirmation";
import { useUsers } from "../hooks/useUsers";
import { CreateUserRequest, UpdateUserRequest, User } from "../types";

const UsersPage: React.FC = () => {
  const {
    users,
    selectedUser,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    setSelectedUser,
  } = useUsers();

  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
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

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditing(true);
    setFormOpen(true);
    setDetailOpen(false);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setDetailOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (
    data: CreateUserRequest | UpdateUserRequest
  ) => {
    try {
      if (isEditing && selectedUser?.id) {
        const result = await updateUser(selectedUser.id, data);
        if (result) {
          setSnackbar({
            open: true,
            message: "Usuário atualizado com sucesso",
            severity: "success",
          });
        }
      } else {
        const result = await createUser(data as CreateUserRequest);
        if (result) {
          setSnackbar({
            open: true,
            message: "Usuário criado com sucesso",
            severity: "success",
          });
        }
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Erro ao salvar usuário",
        severity: "error",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser?.id) {
      const result = await deleteUser(selectedUser.id);
      if (result) {
        setSnackbar({
          open: true,
          message: "Usuário excluído com sucesso",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Erro ao excluir usuário",
          severity: "error",
        });
      }
      setDeleteOpen(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Usuários
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

      {!loading && !error && (
        <UsersList
          users={users}
          onAddUser={handleAddUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onViewUser={handleViewUser}
        />
      )}

      <UserForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        user={isEditing ? selectedUser : null}
        title={isEditing ? "Editar Usuário" : "Novo Usuário"}
      />

      <UserDetail
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        user={selectedUser}
        onEdit={() => {
          setDetailOpen(false);
          setIsEditing(true);
          setFormOpen(true);
        }}
      />

      <DeleteConfirmation
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Usuário"
        message={`Tem certeza que deseja excluir o usuário ${selectedUser?.nome}?`}
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

export default UsersPage;
