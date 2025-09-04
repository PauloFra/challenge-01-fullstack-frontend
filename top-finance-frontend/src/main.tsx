import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import FinancePage from "./components/FinancePage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

// Standalone mode (for development)
// In production, this will be imported via Module Federation
if (import.meta.env.MODE === "development") {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FinancePage />
      </ThemeProvider>
    </React.StrictMode>
  );
}
