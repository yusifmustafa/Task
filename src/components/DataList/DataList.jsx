import {
  Button,
  Modal,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../Context/UserContextProvider";
import Navbar from "../Navbar/Navbar";
import "./DataList.css";
import UserForm from "../UserForm";
import Pagination from "../Pagination";
import MultiUser from "../MultiUser";
import { toast, ToastContainer } from "react-toastify";

const DataList = () => {
  const context = useContext(UserContext);
  const userList = context.userList ? context.userList : [];
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const [openMultiForm, setOpenMultiForm] = useState(false);
  const handleOpen = () => setOpenMultiUser(true);
  const handleClose = () => setOpenMultiUser(false);
  const handleOpenMultiForm = () => setOpenMultiForm(true);
  const [openMultiUser, setOpenMultiUser] = useState(false);
  const currentEmployees = userList.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const notifyDelete = () => {
    toast.success("Uğurla silindi!");
  };

  const totalPages = Math.ceil(userList.length / employeesPerPage);
  useEffect(() => {
    context.loadUserList();
  }, []);

  const handleEditUser = (id) => {
    context.getUserById(id);
  };
  const handleDeleteUser = (id) => {
    context.deleteUser(id);
    notifyDelete();
  };
  const StyledTable = styled(Table)`
    width: 95%;
    margin: 50px 0 0 50px;
  `;
  const THead = styled(TableRow)`
    & > th {
      font-size: 20px;
      background: #000;
      color: #fff;
    }
  `;

  const TRow = styled(TableRow)`
    & > td {
      font-size: 18px;
    }
  `;
  return (
    <div>
      <Navbar
        handleOpen={handleOpen}
        handleOpenSingleModal={() => {
          context.openDialog();
        }}
      />
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
          {currentEmployees.map((user) => (
            <TRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user?.firstName}</TableCell>
              <TableCell>{user?.lastName}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.gender}</TableCell>
              <TableCell>{user?.username}</TableCell>
              <TableCell>{user?.bank?.cardType}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 10 }}
                  onClick={() => handleEditUser(user.id)}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>

      {/*Single Modal */}
      {/* <div id="modal"> */}
      <Modal
        open={context.showDialog}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <UserForm userList={userList} />
      </Modal>
      {/* </div> */}

      {/* Multi Modal */}

      <Modal open={openMultiUser} onClose={handleClose}>
        <MultiUser />
      </Modal>

      <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
      <ToastContainer />
    </div>
  );
};

export default DataList;
