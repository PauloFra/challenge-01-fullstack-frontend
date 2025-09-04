import React from "react";
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
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  CreateUserRequest,
  UpdateUserRequest,
  User,
  UserStatus,
} from "../types";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserRequest | UpdateUserRequest) => void;
  user?: User | null;
  title: string;
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  onClose,
  onSubmit,
  user,
  title,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserRequest>({
    defaultValues: user
      ? {
          nome: user.nome,
          email: user.email,
          rua: user.rua,
          numero: user.numero,
          bairro: user.bairro,
          complemento: user.complemento || "",
          cidade: user.cidade,
          estado: user.estado,
          cep: user.cep,
          status: user.status,
        }
      : {
          nome: "",
          email: "",
          rua: "",
          numero: "",
          bairro: "",
          complemento: "",
          cidade: "",
          estado: "",
          cep: "",
          status: UserStatus.ACTIVE,
        },
  });

  React.useEffect(() => {
    if (open) {
      reset(
        user
          ? {
              nome: user.nome,
              email: user.email,
              rua: user.rua,
              numero: user.numero,
              bairro: user.bairro,
              complemento: user.complemento || "",
              cidade: user.cidade,
              estado: user.estado,
              cep: user.cep,
              status: user.status,
            }
          : {
              nome: "",
              email: "",
              rua: "",
              numero: "",
              bairro: "",
              complemento: "",
              cidade: "",
              estado: "",
              cep: "",
              status: UserStatus.ACTIVE,
            }
      );
    }
  }, [open, user, reset]);

  const handleFormSubmit = (data: CreateUserRequest) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="nome"
                control={control}
                rules={{ required: "Nome é obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nome"
                    fullWidth
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Controller
                name="rua"
                control={control}
                rules={{ required: "Rua é obrigatória" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Rua"
                    fullWidth
                    error={!!errors.rua}
                    helperText={errors.rua?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="numero"
                control={control}
                rules={{ required: "Número é obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número"
                    fullWidth
                    error={!!errors.numero}
                    helperText={errors.numero?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="bairro"
                control={control}
                rules={{ required: "Bairro é obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bairro"
                    fullWidth
                    error={!!errors.bairro}
                    helperText={errors.bairro?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="complemento"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Complemento"
                    fullWidth
                    error={!!errors.complemento}
                    helperText={errors.complemento?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="cidade"
                control={control}
                rules={{ required: "Cidade é obrigatória" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Cidade"
                    fullWidth
                    error={!!errors.cidade}
                    helperText={errors.cidade?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="estado"
                control={control}
                rules={{ required: "Estado é obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Estado"
                    fullWidth
                    error={!!errors.estado}
                    helperText={errors.estado?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="cep"
                control={control}
                rules={{ required: "CEP é obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="CEP"
                    fullWidth
                    error={!!errors.cep}
                    helperText={errors.cep?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      <MenuItem value={UserStatus.ACTIVE}>Ativo</MenuItem>
                      <MenuItem value={UserStatus.INACTIVE}>Inativo</MenuItem>
                    </Select>
                    {errors.status && (
                      <FormHelperText>{errors.status.message}</FormHelperText>
                    )}
                  </FormControl>
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

export default UserForm;
