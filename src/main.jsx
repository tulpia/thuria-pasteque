import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import theme from "./theme.js";
import { ThemeProvider, CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
