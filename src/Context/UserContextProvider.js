import React, { useState } from "react";
import { v4 } from "uuid";
import Api from "../utils/Api";

export const UserContext = React.createContext({});
const URL_SINGLE_USER = "/users/{userId}";
const URL_USER_LIST = "/users";
const URL_ADD_USER = "/users/add";
const URL_UPDATE_USER = "/users/{userId}";

const INITAL_STATE = {
  userList: [],
  user: {},
  datas: [],
  showDialog: false,
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
        openDialog: openDialog,
        closeDialog: closeDialog,
        handleOnChange: handleOnChange,
        handleDeleteItem: handleDeleteItem,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );

  function openDialog() {
    setState(Object.assign({}, state, { showDialog: true, user: {} }));
  }

  function closeDialog() {
    setState(Object.assign({}, state, { showDialog: false }));
  }

  function handleDeleteItem(id) {
    setState((pre) => ({
      ...pre,
      datas: INITAL_STATE.datas.filter((user) => user.id !== id),
    }));
  }

  function handleOnChange(event) {
    const { name, value } = event;
    setState(
      Object.assign({}, state, {
        user: Object.assign({}, state.user, { [name]: value }),
      })
    );
  }

  function loadUserList() {
    Api.get(URL_USER_LIST).then((response) => {
      const responseUsers = response?.data?.users;
      setState(
        Object.assign({}, state, {
          userList: responseUsers,
          showDialog: false,
        })
      );
    });
  }

  function getUserById(userId) {
    // get method
    const url = URL_SINGLE_USER.replace("{userId}", userId);
    Api.get(url).then((response) => {
      const user = response?.data;
      setState(Object.assign({}, state, { user: user, showDialog: true }));
    });
  }

  function addUser(userData) {
    Api.post(URL_ADD_USER, userData).then(() => {});
    loadUserList();
  }

  function updateUser(userId, userData) {
    const url = URL_UPDATE_USER.replace("{userId}", userId);
    Api.put(url, userData).then((rsp) => {
      const user = rsp?.data;
      setState(Object.assign({}, state, { user: user, showDialog: false }));
    });
    //Api.put()
  }

  function deleteUser(userId) {
    Api.delete(`/users/${userId}`, {
      method: "DELETE",
    }).then((rsp) => {
      const user = rsp?.data;

      setState(Object.assign({}, state, { user: user }));
    });

    //Api.delete()
  }
};

export default UserContextProvider;
