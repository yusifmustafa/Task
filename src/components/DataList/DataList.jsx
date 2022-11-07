import React, { useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../Navbar/Navbar";
import { UserContext } from "../../Context/UserContextProvider";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
// import { makeStyles } from "@mui/styles";

export const blockInvalidChar = (e) =>
  ["e", "E", "+", "-", ",", "."].includes(e.key) && e.preventDefault();
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    width: 90,
  },
  {
    field: "username",
    headerName: "Username",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "cardType",
    headerName: "Cardtype",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

export default function DataTable() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "650px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const context = useContext(UserContext);
  useEffect(() => {
    context.loadUserList();
  }, []);
  const [showSingleOpen, setSingleOpen] = React.useState(false);
  const [form, setForm] = useState({});
  const handleOpenSingleModal = () => {
    setSingleOpen(true);
  };
  const handleCloseSingleModal = () => {
    setSingleOpen(false);
  };

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const useStyles = makeStyles(() => ({
  //   paper: {
  //     marginTop: 8,
  //     display: "flex",
  //     justifyContent: "center",
  //     flexDirection: "column",
  //     alignItems: "center",
  //     background: "#fff",
  //     width: "100%",
  //     height: "550px",
  //     borderRadius: "10px",
  //     position: "relative",
  //   },

  //   form: {
  //     width: "80%",
  //     marginTop: 3,
  //   },
  //   submit: {
  //     marginTop: "1rem",
  //   },

  //   closeButton: {
  //     display: "flex",
  //     justifyContent: "flex-end",
  //     position: "absolute",
  //     right: 10,
  //     top: 15,
  //   },
  // }));
  // const classes = useStyles();

  //context.updateUser(1, {name: "natiq"});
  // context.deleteUser(1);
  //  context.addUser({firsname:"sasad", lastname:"asdsa"});

  const userList = context.userList ? context.userList : [];
  return (
    <div className="data-list">
      <Navbar handleOpenSingleModal={handleOpenSingleModal} />
      <div className="datas" style={{ height: "650px", width: "100%" }}>
        <DataGrid
          rows={userList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </div>

      <div className={style}>
        <Modal
          open={showSingleOpen}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box>
            <>
              <Container component="main">
                <CssBaseline />
                <div>
                  <Typography component="h1" variant="h5">
                    Form
                  </Typography>
                  <form noValidate>
                    <div>
                      <Button onClick={handleCloseSingleModal}>
                        <h5>X</h5>
                      </Button>
                    </div>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <TextField
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          onChange={handleOnChange}
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          onChange={handleOnChange}
                          autoComplete="lname"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          onChange={handleOnChange}
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="userName"
                          label="User Name"
                          type="text"
                          id="userName"
                          onChange={handleOnChange}
                          autoComplete="userName"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="birthDate"
                          label="Doğum tarixi"
                          fullWidth
                          type="date"
                          defaultValue="2017-05-24"
                          onChange={handleOnChange}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                          <InputLabel id="demo-simple-select-label">
                            Card Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleOnChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: "1rem" }}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </Container>
            </>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
