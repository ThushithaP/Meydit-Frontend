import React, { useState } from "react";
import "./register.css";
import { register } from "../../services/user-service/user-service";
import { useNavigate } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { MenuItem, Select, TextField } from "@mui/material";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Register = () => {
  const [correct, setCorrect] = useState(false); // success snack
  const [wrong, setWrong] = useState(false); // err snack

  const [name, setName] = useState(""); //set name
  const [email, setEmail] = useState(""); //set email
  const [password, setPassword] = useState(""); //set password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState(""); //set contact number
  const [role, setRole] = useState(""); //set role

  const navigte = useNavigate();

  // validation
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    contactNumber: false,
  });
  const isNameValid = (name.length > 3 && name.length < 20) || !touched.name;
  const isEmailValid =
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email) || !touched.email;
  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(password) ||
    !touched.password;
  const isConfirmValid =
    password === confirmPassword || !touched.confirmPassword;
  const isContactValid =
    /^\d{10}$/.test(contactNumber) || !touched.contactNumber;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (password === confirmPassword) {
        await register(name, email, password, contactNumber, role);
        setCorrect(true);
        setTimeout(() => {
          navigte("/login");
        }, 3000);
      } else if (password === !confirmPassword) {
        setWrong(true);
      } else {
        setWrong(true);
      }
    } catch (err) {
      setWrong(true);
    }
  };

  return (
    <>
      <section className="register-body">
        <div className="container-fluid-register">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="register-wrap p-0">
                <h2 className="title-register">Register Form</h2>
                <form
                  action="#"
                  className="register-form"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group-register">
                    <TextField
                      color="success"
                      error={!isNameValid}
                      helperText={
                        !isNameValid
                          ? "Please enter minimum 3 character and maximum 20"
                          : ""
                      }
                      onBlur={() => setTouched({ ...touched, name: true })}
                      InputProps={{
                        className: "form-control-register",
                      }}
                      label="Name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      required
                      sx={{ maxWidth: "220px" }}
                    />
                  </div>
                  <div className="form-group-register">
                    <TextField
                      color="success"
                      error={!isEmailValid}
                      helperText={!isEmailValid ? "Enter valid email" : ""}
                      label="Email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      required
                      InputProps={{
                        className: "form-control-register",
                      }}
                      onBlur={() => setTouched({ ...touched, email: true })}
                      sx={{ maxWidth: "220px" }}
                    />
                  </div>
                  <div className="form-group-register">
                    <TextField
                      color="success"
                      error={!isContactValid}
                      helperText={
                        !isContactValid ? "Enter valid contact number" : ""
                      }
                      label="Contact Number"
                      value={contactNumber}
                      onChange={(event) => {
                        setContactNumber(event.target.value);
                      }}
                      InputProps={{
                        className: "form-control-register",
                      }}
                      onBlur={() =>
                        setTouched({ ...touched, contactNumber: true })
                      }
                      required
                      sx={{ maxWidth: "220px" }}
                    />
                  </div>
                  <div className="form-group-register">
                    <Select
                      className="form-control-register"
                      onChange={(event) => {
                        setRole(event.target.value);
                      }}
                      style={{ width: "108%", height: "2%", padding: "0" }}
                      required
                      sx={{ maxWidth: "220px" }}
                    >
                      <MenuItem
                        className="form-register"
                        value="Maker"
                        sx={{ maxWidth: "220px" }}
                      >
                        Maker
                      </MenuItem>
                      <MenuItem
                        className="form-register"
                        value="Buyer"
                        sx={{ maxWidth: "220px" }}
                      >
                        Buyer
                      </MenuItem>
                    </Select>
                  </div>
                  <div className="form-group-register">
                    <TextField
                      color="success"
                      error={!isPasswordValid}
                      helperText={
                        !isPasswordValid
                          ? "one uppercase, one lowercase, one digit, at least 6 characters"
                          : ""
                      }
                      onBlur={() => setTouched({ ...touched, password: true })}
                      type="password"
                      label="Password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      required
                      InputProps={{
                        className: "form-control-register",
                      }}
                      sx={{ maxWidth: "220px" }}
                    />
                  </div>
                  <div className="form-group-register">
                    <TextField
                      color="success"
                      error={!isConfirmValid}
                      helperText={!isConfirmValid ? "Re-type password" : ""}
                      type="password"
                      label="Confirm Password"
                      value={confirmPassword}
                      onBlur={() =>
                        setTouched({ ...touched, confirmPassword: true })
                      }
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                      }}
                      InputProps={{
                        className: "form-control-register",
                      }}
                      required
                      sx={{ maxWidth: "220px" }}
                    />
                  </div>
                  <div className="form-group-register">
                    <button
                      id="reg"
                      type="submit"
                      className=" btn btn-primary submit px-3"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Snackbar
        open={correct}
        autoHideDuration={3000}
        onClose={() => setCorrect(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setCorrect(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Succesfull Registered. Please Login
        </Alert>
      </Snackbar>
      <Snackbar
        open={wrong}
        autoHideDuration={3000}
        onClose={() => setWrong(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setWrong(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please fill in all required fields and ensure your password is
          confirmed!
        </Alert>
      </Snackbar>
    </>
  );
};
