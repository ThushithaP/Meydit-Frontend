import axios from "axios";

// user register
const BaseUrl = "http://localhost:3333";
export async function register(name, email, password, contactNumber, role) {
  try {
    const user = {
      name: name,
      email: email,
      password: password,
      contactNumber: contactNumber,
      role: role,
    };
    console.log(user);
    const response = await axios
      .post(BaseUrl + "/userRegister", user)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}

// user login
export async function login(email, password) {
  try {
    const user = {
      email: email,
      password: password,
    };
    const response = await axios
      .post(BaseUrl + "/userLogin", user)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// details by userId
export async function UserInfoById(id) {
  try {
    const response = await axios
      .get(BaseUrl + `/userDetails/${id}`, id)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}

// update user info

export async function UpdateUserData(id, name, email, contactNumber) {
  try {
    const userData = {
      id: id,
      name: name,
      email: email,
      contactNumber: contactNumber,
    };
    const response = await axios
      .put(BaseUrl + "/updateUser", userData)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}

// update user password
export async function UpdatePassword(id, oldPassword, newPassword) {
  try {
    const userDetail = {
      id: id,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    const response = await axios
      .put(BaseUrl + "/updatePassword", userDetail)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}
