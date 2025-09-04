import React from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Finance } from "../types";
import { useUsers } from "../hooks/useUsers";

interface FinancesListProps {
  finances: Finance[];
  onAddFinance: () => void;
  onEditFinance: (finance: Finance) => void;
  onDeleteFinance: (finance: Finance) => void;
  currentUserId?: number;
  onUserChange: (userId?: number) => void;
}

const FinancesList: React.FC<FinancesListProps> = ({
  finances,
  onAddFinance,
  onEditFinance,
  onDeleteFinance,
  currentUserId,
  onUserChange,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { users } = useUsers();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleUserFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as number | undefined;
    onUserChange(value || undefined);
  };

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.nome : `Usuário ID: ${userId}`;
  };

  const totalValue = finances.reduce((acc, finance) => acc + finance.valor, 0);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filtrar por Usuário</InputLabel>
          <Select
            value={currentUserId || ""}
            onChange={handleUserFilterChange as any}
            label="Filtrar por Usuário"
            displayEmpty
          >
            <MenuItem value="">Todos os usuários</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddFinance}
        >
          Novo Registro
        </Button>
      </Box>

      <Paper sx={{ mb: 2, p: 2 }}>
        <Typography variant="h6">
          Total: {formatCurrency(totalValue)}
        </Typography>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usuário</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell>Data</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finances
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((finance) => (
                <TableRow key={finance.id}>
                  <TableCell>{finance.id}</TableCell>
                  <TableCell>{getUserName(finance.user_id)}</TableCell>
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
                  <TableCell>
                    {finance.created &&
                      new Date(finance.created).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEditFinance(finance)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDeleteFinance(finance)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={finances.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default FinancesList;
