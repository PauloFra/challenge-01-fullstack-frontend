import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import { User, UserStatus } from "../types";

interface UserDetailProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onEdit: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({
  open,
  onClose,
  user,
  onEdit,
}) => {
  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Detalhes do Usuário</DialogTitle>
      <DialogContent>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">{user.nome}</Typography>
                <Chip
                  label={
                    user.status === UserStatus.ACTIVE ? "Ativo" : "Inativo"
                  }
                  color={
                    user.status === UserStatus.ACTIVE ? "success" : "default"
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Endereço</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body2" color="textSecondary">
                Rua
              </Typography>
              <Typography variant="body1">{user.rua}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="textSecondary">
                Número
              </Typography>
              <Typography variant="body1">{user.numero}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Bairro
              </Typography>
              <Typography variant="body1">{user.bairro}</Typography>
            </Grid>
            {user.complemento && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Complemento
                </Typography>
                <Typography variant="body1">{user.complemento}</Typography>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                Cidade
              </Typography>
              <Typography variant="body1">{user.cidade}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" color="textSecondary">
                Estado
              </Typography>
              <Typography variant="body1">{user.estado}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" color="textSecondary">
                CEP
              </Typography>
              <Typography variant="body1">{user.cep}</Typography>
            </Grid>
            {user.created && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Data de Criação
                </Typography>
                <Typography variant="body1">
                  {new Date(user.created).toLocaleDateString()}
                </Typography>
              </Grid>
            )}
            {user.updated && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Última Atualização
                </Typography>
                <Typography variant="body1">
                  {new Date(user.updated).toLocaleDateString()}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Fechar
        </Button>
        <Button onClick={onEdit} color="primary">
          Editar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetail;
