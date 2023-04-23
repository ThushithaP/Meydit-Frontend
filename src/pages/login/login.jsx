import React, { useState } from "react";
import "./login-mod.css";
import { login } from "../../services/user-service/user-service";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Login = () => {
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const userDetails = await login(email, password);

      const userInfo = {
        id: userDetails.id,
        name: userDetails.name,
        contact_number: userDetails.contact_number,
        email: userDetails.email,
        crated_at: userDetails.created_at,
        role: userDetails.role,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setCorrect(true);
      if (userInfo.role === "Buyer") {
        setTimeout(() => {
          navigate("/buyer/jobOrder");
        }, 3000);
      } else if (userInfo.role === "Maker") {
        navigate("/maker/viewJob");
      }
    } catch (err) {
      setWrong(true);
    }
  };

  return (
    <>
      <section className="body-login">
        <div className="container-fluid-login">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h2 className="title-login">Login Form</h2>
                <form action="#" className="login-form" onSubmit={handleSubmit}>
                  <div className="form-group-login">
                    <input
                      type="text"
                      className="form-control-login"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group-login">
                    <input
                      id="password-field"
                      type="password"
                      className="form-control-login"
                      placeholder="Password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      required
                    />
                    <span
                      toggle="#password-field"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                    ></span>
                    <label>Forgot Password ?</label>
                  </div>
                  <div className="form-group-login">
                    <button id="log" type="submit" className="btn  submit">
                      Log In
                    </button>
                  </div>
                  <div className="form-group-login d-md-flex-login">
                    <div className="w-50"></div>
                    <div className="w-50 text-right"></div>
                  </div>
                </form>
                <p className="w-100 text-center">
                  Not a Member? <span>Sign Up</span>{" "}
                </p>
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
          Login Successfully
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
          Invalid Email or Password!
        </Alert>
      </Snackbar>
    </>
  );
};
