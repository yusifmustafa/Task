import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/styles";
import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme();

const root = document.getElementById("root");
render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,

  root
);
