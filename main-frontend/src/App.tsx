import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import { PrivateRoute } from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./stores/authStore";

import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

const UsersPage = () => {
  const loadUsers = () => {
    const saved = localStorage.getItem("users");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            nome: "João Silva",
            email: "joao@example.com",
            rua: "Rua das Flores",
            numero: "123",
            bairro: "Centro",
            complemento: "Apto 45",
            cidade: "São Paulo",
            estado: "SP",
            cep: "01234-567",
            status: "ativo",
          },
          {
            id: 2,
            nome: "Maria Santos",
            email: "maria@example.com",
            rua: "Avenida Brasil",
            numero: "456",
            bairro: "Jardim América",
            complemento: "",
            cidade: "Rio de Janeiro",
            estado: "RJ",
            cep: "20040-123",
            status: "ativo",
          },
        ];
  };

  const [users, setUsers] = useState(loadUsers());
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    cidade: "",
    estado: "",
    cep: "",
    status: "ativo",
  });

  React.useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({
      nome: "",
      email: "",
      rua: "",
      numero: "",
      bairro: "",
      complemento: "",
      cidade: "",
      estado: "",
      cep: "",
      status: "ativo",
    });
    setOpen(true);
  };

  const handleEdit = (user: any): void => {
    setEditingUser(user);
    setFormData({
      nome: user.nome || "",
      email: user.email || "",
      rua: user.rua || "",
      numero: user.numero || "",
      bairro: user.bairro || "",
      complemento: user.complemento || "",
      cidade: user.cidade || "",
      estado: user.estado || "",
      cep: user.cep || "",
      status: user.status || "ativo",
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSubmit = () => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...formData } : user
        )
      );
    } else {
      const newUser = { ...formData, id: Date.now() };
      setUsers([...users, newUser]);
    }
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Usuários
      </Typography>

      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Novo Usuário
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.nome}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.rua && user.numero ? `${user.rua}, ${user.numero}` : ""}
                  {user.bairro ? ` - ${user.bairro}` : ""}
                  {user.cidade ? `, ${user.cidade}` : ""}
                  {user.estado ? `/${user.estado}` : ""}
                  {user.cep ? ` - ${user.cep}` : ""}
                </TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(user)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingUser ? "Editar Usuário" : "Novo Usuário"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Rua"
                value={formData.rua}
                onChange={(e) =>
                  setFormData({ ...formData, rua: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Número"
                value={formData.numero}
                onChange={(e) =>
                  setFormData({ ...formData, numero: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bairro"
                value={formData.bairro}
                onChange={(e) =>
                  setFormData({ ...formData, bairro: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Complemento"
                value={formData.complemento}
                onChange={(e) =>
                  setFormData({ ...formData, complemento: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Cidade"
                value={formData.cidade}
                onChange={(e) =>
                  setFormData({ ...formData, cidade: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Estado"
                value={formData.estado}
                onChange={(e) =>
                  setFormData({ ...formData, estado: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="CEP"
                value={formData.cep}
                onChange={(e) =>
                  setFormData({ ...formData, cep: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const FinancePage = () => {
  const loadFinances = () => {
    const saved = localStorage.getItem("finances");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, descricao: "Salário", valor: 3000, user_id: 1 },
          { id: 2, descricao: "Aluguel", valor: -800, user_id: 1 },
        ];
  };

  const [finances, setFinances] = useState(loadFinances());
  const [open, setOpen] = useState(false);
  const [editingFinance, setEditingFinance] = useState<any>(null);
  const [formData, setFormData] = useState({
    descricao: "",
    valor: "",
    user_id: "",
  });

  React.useEffect(() => {
    localStorage.setItem("finances", JSON.stringify(finances));
  }, [finances]);

  const handleAdd = () => {
    setEditingFinance(null);
    setFormData({ descricao: "", valor: "", user_id: "" });
    setOpen(true);
  };

  const handleEdit = (finance: any): void => {
    setEditingFinance(finance);
    setFormData({
      descricao: finance.descricao,
      valor: finance.valor.toString(),
      user_id: finance.user_id.toString(),
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setFinances(finances.filter((finance) => finance.id !== id));
  };

  const handleSubmit = () => {
    const data = {
      ...formData,
      valor: parseFloat(formData.valor),
      user_id: parseInt(formData.user_id),
    };

    if (editingFinance) {
      setFinances(
        finances.map((finance) =>
          finance.id === editingFinance.id ? { ...finance, ...data } : finance
        )
      );
    } else {
      const newFinance = { ...data, id: Date.now() };
      setFinances([...finances, newFinance]);
    }
    setOpen(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const totalValue = finances.reduce(
    (acc: number, finance: any) => acc + finance.valor,
    0
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Finanças
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">
          Total: {formatCurrency(totalValue)}
        </Typography>
      </Paper>

      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Novo Registro
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell>Usuário</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finances.map((finance: any) => (
              <TableRow key={finance.id}>
                <TableCell>{finance.id}</TableCell>
                <TableCell>{finance.descricao}</TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: finance.valor < 0 ? "error.main" : "success.main",
                    fontWeight: "bold",
                  }}
                >
                  {formatCurrency(finance.valor)}
                </TableCell>
                <TableCell>Usuário {finance.user_id}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleEdit(finance)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(finance.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingFinance
            ? "Editar Registro Financeiro"
            : "Novo Registro Financeiro"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Valor"
                type="number"
                value={formData.valor}
                onChange={(e) =>
                  setFormData({ ...formData, valor: e.target.value })
                }
                InputProps={{
                  startAdornment: "R$",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ID do Usuário"
                type="number"
                value={formData.user_id}
                onChange={(e) =>
                  setFormData({ ...formData, user_id: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<PrivateRoute outlet={<Layout />} />}>
        <Route index element={<Dashboard />} />

        <Route path="users" element={<UsersPage />} />
        <Route path="finance" element={<FinancePage />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
