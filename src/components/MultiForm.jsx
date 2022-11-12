import {
    Button,
    CssBaseline,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {Container} from "@mui/system";
import {makeStyles} from "@mui/styles";
import {v4} from "uuid";

import React from "react";
import {toast, ToastContainer} from "react-toastify";
import {useContext} from "react";
import {UserContext} from "../Context/UserContextProvider";

const MultiForm = ({handleCloseMultiForm}) => {
    const notifyError = () => toast.error("Xəta! xanaları tam doldurun!");
    const notifyError2 = () => toast.error("Bu adda və ya maildə istifadəçi mövcuddur");
    const notifyError3 = () => {
        toast.success("Uğurla əlavə edildi");
    };
    const notifyError4 = () => toast.success("Dəyişikliklər qeydə alındı");
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
            display: "flex", justifyContent: "flex-end", position: "absolute", right: 10, top: 15,
        },
    }));

    const classes = useStyles();
    const context = useContext(UserContext);
    let {handleOnChange, user, datas} = context;

    console.log("datas", datas);

    function canBeAdded(user) {
        const data = context.userList.find((item) => {
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


    const handleOnSubmit = () => {
        console.log("datasss", datas);
        if (user === {} || user.email === "" || user.email === undefined || user.username === "" || user.username === undefined || user.gender === "" || user.gender === undefined || user.firstName === "" || user.firstName === undefined || user.lastName === "" || user.lastName === undefined || user.cardType === "" || user.cardType === undefined) {
            notifyError();
            return;
        }

        if (user.id > 0) {
            notifyError4();
            context.updateUser(user.id, user);
        } else if (canBeAdded(user)) {
            datas.push({
                ...user, id: v4(),
            });
            notifyError3();
        }
        handleCloseMultiForm();
    };
    return (<Container component="main">
        <CssBaseline/>
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Multiple Form
            </Typography>
            <form className={classes.form} noValidate>
                <div className={classes.closeButton}>
                    <Button onClick={handleCloseMultiForm}>
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
                            onChange={(event) => handleOnChange({
                                name: event.target.name, value: event.target.value,
                            })}
                            value={user?.firstName ? user.firstName : ""}
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
                            onChange={(event) => handleOnChange({
                                name: event.target.name, value: event.target.value,
                            })}
                            value={user?.lastName ? user.lastName : ""}
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
                            onChange={(event) => handleOnChange({
                                name: event.target.name, value: event.target.value,
                            })}
                            value={user?.email ? user.email : ""}
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            name="gender"
                            onChange={(event) => handleOnChange({
                                name: event.target.name, value: event.target.value,
                            })}
                            value={user?.gender ? user.gender : ""}
                        >
                            <FormControlLabel
                                value="female"
                                control={<Radio/>}
                                label="Female"
                            />
                            <FormControlLabel
                                value="male"
                                control={<Radio/>}
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
                            onChange={(event) => handleOnChange({
                                name: event.target.name, value: event.target.value,
                            })}
                            value={user?.username ? user.username : ""}
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
                                onChange={(event) => handleOnChange({
                                    name: event.target.name, value: event.target.value,
                                })}
                                value={user?.cardType ? user?.cardType : ""}
                            >
                                {context.userList.map((item, key) => (
                                    <MenuItem key={item.id} value={item.bank.cardType}>
                                        {item.bank.cardType}
                                    </MenuItem>))}
                            </Select>
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{marginTop: "1rem"}}
                            onClick={() => {
                                handleOnSubmit();
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
        <ToastContainer/>
    </Container>);
};

export default MultiForm;
