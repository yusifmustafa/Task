import React, { useState } from "react";
import Api from "../utils/Api";

export const UserContext = React.createContext({});

const URL_SINGLE_USER = "/users/{userId}";
const URL_USER_LIST = "/users";
const URL_ADD_USER = "/users/add";
const URL_UPDATE_USER = "/users/{userId}";
const URL_DELETE_USER = "/users/{userId}";

const INITAL_STATE = {
    userList: [],
    user: {},
};
const UserContextProvider = (props) => {
    const [state, setState] = useState(INITAL_STATE);

    return (
        <UserContext.Provider
            value={{
                ...state,
                loadUserList: loadUserList,
                getUserById: getUserById,
                addUser: addUser,
                updateUser: updateUser,
                deleteUser: deleteUser,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );

    function loadUserList() {
        Api.get(URL_USER_LIST).then((response) => {
            const responseUsers = response?.data?.users;

            const users = (responseUsers ? responseUsers : []).map((item) => {
                const obj = {
                    id: item.id,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    username: item.username,
                    email: item.email,
                    gender: item.gender,
                    cardType: item.bank?.cardType,
                };
                return obj;
            });
            setState(Object.assign({}, state, { userList: users }));
        });
    }

    function getUserById(userId) {
        // get method
        const url = URL_SINGLE_USER.replace("{userId}", userId);
        Api.get(url).then((response) => {
            const user = response?.data;
            setState(Object.assign({}, state, { user: user }));
        });
    }

    function addUser(userData) {
        //Api.post()
        // post method
    }

    function updateUser(userId, userData) {
        //Api.put()
    }
    function deleteUser(userId) {
        //Api.delete()
    }
};

export default UserContextProvider;
