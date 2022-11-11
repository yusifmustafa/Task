import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import MultiForm from "../components/MultiForm";
import { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";
import styled from "@emotion/styled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  width: "70%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const StyledTable = styled(Table)`
  width: 70%;
  margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

export default function MultiUserForm({
  handleOpenMultiForm,
  handleCloseMultiForm,
  openMultiForm,
}) {
  const context = useContext(UserContext);
  const datas = context.datas;
  console.log("dtssdtstss", datas);
  const sendDataToApi = () => {
    datas.forEach((item) => context.addUser(item));
  };

  return (
    <div>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-center"
        >
          Users
        </Typography>
        <Box>
          <Button onClick={handleOpenMultiForm}>
            <AddIcon />
          </Button>
        </Box>
        <Typography id="modal-modal-description">
          <StyledTable>
            <TableHead>
              <THead>
                <TableCell>Id</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Card Type</TableCell>
                <TableCell></TableCell>
              </THead>
            </TableHead>
            <TableBody>
              {datas.map((item, key) => (
                <TRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.cardType}</TableCell>
                  <TableCell></TableCell>

                  <TableCell>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={context.deleteUser(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TRow>
              ))}
            </TableBody>
          </StyledTable>
          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={sendDataToApi} variant="contained">
              Submit
            </Button>
          </div>
        </Typography>
      </Box>

      {/* MultiForm */}
      <Modal open={openMultiForm}>
        <MultiForm handleCloseMultiForm={handleCloseMultiForm} />
      </Modal>
    </div>
  );
}
