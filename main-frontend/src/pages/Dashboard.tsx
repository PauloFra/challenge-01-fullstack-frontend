import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { People, AttachMoney } from "@mui/icons-material";
import { useAuthStore } from "../stores/authStore";

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <Box className="page-container">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Typography variant="body1" paragraph>
        Bem-vindo, {user?.name}!
      </Typography>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <People sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
              <Box>
                <Typography variant="h5">Usuários</Typography>
                <Typography variant="body1">
                  Gerencie os usuários do sistema
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <AttachMoney
                sx={{ fontSize: 40, mr: 2, color: "primary.main" }}
              />
              <Box>
                <Typography variant="h5">Finanças</Typography>
                <Typography variant="body1">
                  Controle as finanças dos usuários
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
