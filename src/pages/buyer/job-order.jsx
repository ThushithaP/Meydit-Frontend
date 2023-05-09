import React, { useState } from "react";
import { jobPosting } from "../../services/job-service/job-service";
import "./job-order.css";
import { NavBar } from "../../components/navbar/navbar";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CreateJob = () => {
  const buyer = JSON.parse(localStorage.getItem("userInfo"));
  const [buyerId] = useState(buyer.id);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostCode] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [image_1, setImage_1] = useState("");
  const [image_2, setImage_2] = useState("");
  const [image_3, setImage_3] = useState("");
  const [image_4, setImage_4] = useState("");
  const [image_5, setImage_5] = useState("");

  // set boolean for snackbar
  const [correct, setCorrect] = useState(false); // success snack
  const [wrong, setWrong] = useState(false); // err snack

  // field validation

  const [touched, setTouched] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone_number: false,
    postcode: false,
    street: false,
    state: false,
    type: false,
    description: false,
    budget: false,
  });

  // submit
  const handleSubmit = async (event) => {
    const images = [image_1, image_2, image_3, image_4, image_5];

    try {
      event.preventDefault();

      if (
        !buyerId ||
        !firstname ||
        !lastname ||
        !phone_number ||
        !email ||
        !postcode ||
        !street ||
        !state ||
        !type ||
        !description ||
        !budget ||
        !images
      ) {
        setWrong(true);
      } else {
        await jobPosting(
          buyerId,
          firstname,
          lastname,
          phone_number,
          email,
          postcode,
          street,
          state,
          type.toLocaleLowerCase(),
          description,
          budget,
          images
        );
        setCorrect(true);
      }
    } catch (err) {
      setWrong(true);
    }
  };

  // validation

  const isFirstNameValid = firstname.length > 3 || !touched.firstname;
  const isLastNameValid = lastname.length > 3 || !touched.lastname;
  const isphoneNumberValid =
    /^\d{10}$/.test(phone_number) || !touched.phone_number;
  const isEmailValid =
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email) || !touched.email;
  const isPostCodeValid =
    (postcode.length && !isNaN(postcode) > 0) || !touched.postcode;
  const isStreetValid = street.length > 4 || !touched.street;
  const isStateValid = state.length > 0 || !touched.state;
  const isTypeValid = type.length > 2 || !touched.type;
  const isDescriptionValid = description.length > 10 || !touched.description;
  const isBudgetValid =
    (budget.length > 0 && !isNaN(budget)) || !touched.budget;

  return (
    <>
      <NavBar></NavBar>

      <div className="container-job-order">
        <div className="header-job-order">
          <Typography variant="h5">Place Job Order</Typography>
          <Typography variant="subtitle1" color="primary">
            Please fill all the field
          </Typography>
        </div>
        <div className="job-order-card">
          <form className="job-order-form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">User Information</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  color="success"
                  error={!isFirstNameValid}
                  label="First Name"
                  fullWidth
                  helperText={
                    !isFirstNameValid
                      ? "Please enter at least 4 characters"
                      : ""
                  }
                  value={firstname}
                  onBlur={() => setTouched({ ...touched, firstname: true })}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  error={!isLastNameValid}
                  color="success"
                  helperText={
                    !isLastNameValid ? "Please enter at least 4 characters" : ""
                  }
                  onBlur={() => setTouched({ ...touched, lastname: true })}
                  label="Last Name"
                  fullWidth
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  error={!isEmailValid}
                  color="success"
                  helperText={
                    !isEmailValid ? "Please enter valid email address" : ""
                  }
                  onBlur={() => setTouched({ ...touched, email: true })}
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  error={!isphoneNumberValid}
                  color="success"
                  helperText={
                    !isphoneNumberValid ? "Please enter valid phone number" : ""
                  }
                  label="Phone Number"
                  onBlur={() => setTouched({ ...touched, phone_number: true })}
                  fullWidth
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  error={!isPostCodeValid}
                  helperText={
                    !isPostCodeValid ? "Please enter valid post code" : ""
                  }
                  color="success"
                  label="Post Code"
                  fullWidth
                  value={postcode}
                  onBlur={() => setTouched({ ...touched, postcode: true })}
                  onChange={(e) => setPostCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  error={!isStreetValid}
                  helperText={!isStreetValid ? "please enter street" : ""}
                  onBlur={() => setTouched({ ...touched, street: true })}
                  color="success"
                  label="Street"
                  fullWidth
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  required
                  error={!isStateValid}
                  // helperText={!isStateValid ? "Please select state" : ""}
                  onBlur={() => setTouched({ ...touched, state: true })}
                  color="success"
                  labelId="state-label"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="Western Australia">
                    Western Australia
                  </MenuItem>
                  <MenuItem value="South Australia">South Australia</MenuItem>
                  <MenuItem value="Northern Australia">
                    Northern Australia
                  </MenuItem>
                  <MenuItem value="Queensland">Queensland</MenuItem>
                  <MenuItem value="New South Wales">New South Wales</MenuItem>
                  <MenuItem value="Victoria">Victoria</MenuItem>
                  <MenuItem value="Tasmania">Tasmania</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Job Details</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  error={!isTypeValid}
                  helperText={!isTypeValid ? "Please enter item name" : ""}
                  onBlur={() => setTouched({ ...touched, type: true })}
                  color="success"
                  label="Item Name"
                  fullWidth
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  error={!isBudgetValid}
                  helperText={
                    !isBudgetValid ? "Please enter your valid budget" : ""
                  }
                  onBlur={() => setTouched({ ...touched, budget: true })}
                  color="success"
                  label="Budget"
                  fullWidth
                  value={budget}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={!isDescriptionValid}
                  helperText={
                    !isDescriptionValid
                      ? "Please describe more whats your need"
                      : ""
                  }
                  onBlur={() => setTouched({ ...touched, description: true })}
                  color="success"
                  label="Job Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="image-label">
                  Upload Image * (please add at least two images)
                </InputLabel>
                <Grid>
                  <input
                    type="file"
                    onChange={(event) => {
                      setImage_1(event.target.files[0]);
                    }}
                  />
                </Grid>
                <Grid>
                  <input
                    type="file"
                    onChange={(event) => {
                      setImage_2(event.target.files[0]);
                    }}
                  />
                </Grid>
                <Grid>
                  <input
                    type="file"
                    onChange={(event) => {
                      setImage_3(event.target.files[0]);
                    }}
                  />
                </Grid>
                <Grid>
                  <input
                    type="file"
                    onChange={(event) => {
                      setImage_4(event.target.files[0]);
                    }}
                  />
                </Grid>
                <Grid>
                  <input
                    type="file"
                    onChange={(event) => {
                      setImage_5(event.target.files[0]);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>

      {/* snack bar */}
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
          Succesfully Submitted Job order
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
          Something went wrong. please try again!
        </Alert>
      </Snackbar>
    </>
  );
};
