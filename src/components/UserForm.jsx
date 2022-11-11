import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import TextField from "@mui/material/TextField/TextField";
import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../Context/UserContextProvider";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 8,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff",
    width: "60%",
    height: "550px",
    borderRadius: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  form: {
    width: "80%",
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  closeButton: {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    right: 10,
    top: 15,
  },
}));

const UserForm = ({ userList }) => {
  const notifyError = () => toast.error("Xəta! xanaları tam doldurun!");
  const notifyError2 = () =>
    toast.error("Bu adda və ya maildə istifadəçi mövcuddur");
  const notifyError3 = () => {
    toast.success("Uğurla əlavə edildi");
  };
  const notifyError4 = () => toast.success("Dəyişikliklər qeydə alındı");

  const classes = useStyles();
  const context = useContext(UserContext);
  const { handleOnChange, user } = context;

  function canBeAdded(user) {
    const data = userList.find((item) => {
      if (item.username === user.username || item.email === user.email) {
        notifyError2();
        return item;
      }
      return null;
    });

    if (data) {
      return false;
    } else {
      return true;
    }
  }

  function handleOnSubmit() {
    if (
      user === {} ||
      user.email === "" ||
      user.email === undefined ||
      user.username === "" ||
      user.username === undefined ||
      user.gender === "" ||
      user.gender === undefined ||
      user.firstName === "" ||
      user.firstName === undefined ||
      user.lastName === "" ||
      user.lastName === undefined ||
      user.cardType === "" ||
      user.cardType === undefined
    ) {
      notifyError();
      return;
    }

    if (user.id > 0) {
      notifyError4();
      context.updateUser(user.id, user);
    } else if (canBeAdded(user)) {
      context.addUser(user);
      notifyError3();
    }
  }
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Single Form
        </Typography>
        <form className={classes.form} noValidate>
          <div className={classes.closeButton}>
            <Button onClick={() => context.closeDialog()}>
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
                onChange={(event) =>
                  handleOnChange({
                    name: event.target.name,
                    value: event.target.value,
                  })
                }
                value={user?.firstName}
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
                onChange={(event) =>
                  handleOnChange({
                    name: event.target.name,
                    value: event.target.value,
                  })
                }
                value={user?.lastName}
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
                onChange={(event) =>
                  handleOnChange({
                    name: event.target.name,
                    value: event.target.value,
                  })
                }
                value={user?.email}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                name="gender"
                onChange={(event) =>
                  handleOnChange({
                    name: event.target.name,
                    value: event.target.value,
                  })
                }
                value={user?.gender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="User Name"
                type="text"
                id="userName"
                onChange={(event) =>
                  handleOnChange({
                    name: event.target.name,
                    value: event.target.value,
                  })
                }
                value={user?.username}
                autoComplete="userName"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Card Type</InputLabel>
                <Select
                  name="cardType"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(event) =>
                    handleOnChange({
                      name: event.target.name,
                      value: event.target.value,
                    })
                  }
                  value={user?.cardType ? user?.cardType : ""}
                >
                  {userList.map((item, key) => (
                    <MenuItem key={item.id} value={item.bank.cardType}>
                      {item.bank.cardType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem" }}
            onClick={() => {
              handleOnSubmit();
            }}
          >
            Submit
          </Button>
        </form>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default UserForm;
