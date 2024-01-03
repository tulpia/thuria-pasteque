import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#171B21",
    },
    secondary: {
      main: "#12161A",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ["Inter", "Helvetica", "sans-serif"],
    fontSize: 16,
  },
});

export default theme;
