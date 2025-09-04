import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CreateFinanceRequest, Finance, UpdateFinanceRequest } from "../types";
import { useUsers } from "../hooks/useUsers";

interface FinanceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFinanceRequest | UpdateFinanceRequest) => void;
  finance?: Finance | null;
  title: string;
  selectedUserId?: number;
}

const FinanceForm: React.FC<FinanceFormProps> = ({
  open,
  onClose,
  onSubmit,
  finance,
  title,
  selectedUserId,
}) => {
  const { users, loading: loadingUsers } = useUsers();
  const [initialUserId] = useState(selectedUserId);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateFinanceRequest>({
    defaultValues: finance
      ? {
          user_id: finance.user_id,
          valor: finance.valor,
          descricao: finance.descricao,
        }
      : {
          user_id: selectedUserId || 0,
          valor: 0,
          descricao: "",
        },
  });

  useEffect(() => {
    if (open) {
      reset(
        finance
          ? {
              user_id: finance.user_id,
              valor: finance.valor,
              descricao: finance.descricao,
            }
          : {
              user_id: selectedUserId || 0,
              valor: 0,
              descricao: "",
            }
      );
    }
  }, [open, finance, reset, selectedUserId]);

  // Set the user_id when selectedUserId changes
  useEffect(() => {
    if (selectedUserId && !finance) {
      setValue("user_id", selectedUserId);
    }
  }, [selectedUserId, setValue, finance]);

  // If the form is opened with initialUserId, set it
  useEffect(() => {
    if (initialUserId && !finance && open) {
      setValue("user_id", initialUserId);
    }
  }, [initialUserId, setValue, finance, open]);

  const handleFormSubmit = (data: CreateFinanceRequest) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Controller
                name="user_id"
                control={control}
                rules={{ required: "Usuário é obrigatório" }}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errors.user_id}
                    disabled={loadingUsers || !!selectedUserId}
                  >
                    <InputLabel>Usuário</InputLabel>
                    <Select {...field} label="Usuário">
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.nome}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.user_id && (
                      <FormHelperText>{errors.user_id.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="valor"
                control={control}
                rules={{
                  required: "Valor é obrigatório",
                  validate: (value) =>
                    value !== 0 || "O valor não pode ser zero",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Valor"
                    type="number"
                    fullWidth
                    error={!!errors.valor}
                    helperText={errors.valor?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="descricao"
                control={control}
                rules={{ required: "Descrição é obrigatória" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descrição"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSubmit(handleFormSubmit)} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinanceForm;
