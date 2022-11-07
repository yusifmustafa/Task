import {
  AppBar, 
  CssBaseline, 
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import "./Navbar.css";

function Navbar({ handleOpenSingleModal }) {
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    setOpen(!open);
  };

  return (
    <div className="container">
      <AppBar position="static">
        <CssBaseline />
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography variant="h4">Data List</Typography>

          <div className="dropdown show">
            <button
              className="btn dropdown-toggle text-light"
              onClick={handleOnClick}
            >
              ADD
            </button>
            {open && (
              <div
                className="dropdown-menu  d-block"
                aria-labelledby="dropdownMenuLink"
              >
                <button
                  className="dropdown-item"
                  onClick={handleOpenSingleModal}
                >
                  Single
                </button>
                <button className="dropdown-item">Multiple</button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
