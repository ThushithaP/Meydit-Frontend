import React, { useEffect, useState } from "react";
import { JobById } from "../../../services/job-service/job-service";
import { NavBar } from "../../../components/navbar/navbar";
import "./posted-job.css";
import { JobUpdate } from "../../../services/job-service/job-service";
import { DeleteJob } from "../../../services/job-service/job-service";
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Grid,
  Card,
  CardMedia,
  Select,
  MenuItem,
  InputAdornment,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { Check, Close, Delete, Update } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const PostedJobs = () => {
  const [jobList, setJobList] = useState([]);
  const [open, setShowModal] = useState(false);
  const [BuyerId, setBuyerId] = useState("");
  // set value for update job
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");

  // set boolean for snackbar
  const [update, setUpdate] = useState(false); // success snack
  const [remove, setRemove] = useState(false);
  const [wrong, setWrong] = useState(false);

  // Retrieve job details
  async function JobDetails() {
    const buyer = JSON.parse(localStorage.getItem("userInfo"));
    const buyerId = buyer.id;
    setBuyerId(BuyerId);

    const response = await JobById(buyerId);
    const jobListId = response.map((jobs) => ({
      id: jobs.id,
      firstname: jobs.firstname,
      lastname: jobs.lastname,
      phoneNumber: jobs.phone_number,
      email: jobs.email,
      postcode: jobs.postcode,
      street: jobs.street,
      state: jobs.state,
      type: jobs.type,
      description: jobs.description,
      budget: jobs.budget,
      image_1: jobs.image_1,
      image_2: jobs.image_2,
      image_3: jobs.image_3,
      image_4: jobs.image_4,
      image_5: jobs.image_5,
    }));
    setJobList(jobListId);
  }

  useEffect(() => {
    JobDetails();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // set details for useState

  const handleUpdate = (job) => {
    setId(job.id);
    setFirstName(job.firstname);
    setLastName(job.lastname);
    setPhoneNumber(job.phoneNumber);
    setEmail(job.email);
    setPostcode(job.postcode);
    setStreet(job.street);
    setState(job.state);
    setType(job.type);
    setDescription(job.description);
    setBudget(job.budget);
    setImage1(job.image_1);
    setImage2(job.image_2);
    setImage3(job.image_3);
    setImage4(job.image_4);
    setImage5(job.image_5);
    setShowModal(true);
  };

  // update job
  async function confirmUpdate() {
    try {
      // check all field are fill
      if (
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !email ||
        !postcode ||
        !street ||
        !state ||
        !type ||
        !description ||
        !budget
      ) {
        setWrong(true);
      } else {
        await JobUpdate(
          id,
          firstName,
          lastName,
          phoneNumber,
          email,
          postcode,
          street,
          state,
          type,
          description,
          budget
        );
        setUpdate(true);
      }
    } catch (err) {
      setWrong(true);
    }
  }

  // Delete Job
  async function DeleteJobByID() {
    try {
      await DeleteJob(id);
      setRemove(true);
    } catch (err) {
      console.log(err);
      setWrong(true);
    }
  }

  return (
    <>
      <NavBar></NavBar>
      {jobList.map((job, index) => (
        <div className="posted-container" key={index}>
          <Card>
            <CardContent>
              <Typography
                style={{ fontWeight: "bolder" }}
                variant="h5"
                component="h2"
              >
                {job.type.toUpperCase()} Job Order
              </Typography>
              <br />
              <Divider />
              <div
                className="posted-user"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Typography gutterBottom>
                  <span style={{ fontWeight: "bold" }}>First Name: </span>
                  {job.firstname}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Last Name: </span>
                  {job.lastname}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Phone Number: </span>
                  {job.phoneNumber}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Email: </span>
                  {job.email}
                </Typography>
              </div>
              <div
                className="posted-address"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Post Code: </span>
                  {job.postcode}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Street: </span>
                  {job.street}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>State: </span>
                  {job.state}
                </Typography>
              </div>
              <div className="posted-job">
                <Typography variant="subtitle1" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Budget: </span>${" "}
                  {job.budget}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Description: </span>
                  {job.description}
                </Typography>
              </div>
              <div className="posted-img">
                <img className="image-posted" src={job.image_1} alt="" />
                <img className="image-posted" src={job.image_2} alt="" />
                <img className="image-posted" src={job.image_3} alt="" />
                <img className="image-posted" src={job.image_4} alt="" />
                <img className="image-posted" src={job.image_5} alt="" />
              </div>
              <br />
              <br />
              <Button
                id="upbtn"
                variant="contained"
                color="secondary"
                onClick={() => handleUpdate(job)}
                startIcon={<Update />}
              >
                Update Job
              </Button>
              <Button
                onClick={DeleteJobByID}
                variant="contained"
                style={{ backgroundColor: "#f44336", color: "#fff" }}
                startIcon={<Delete />}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}

      {/* update job */}
      <div className="update-job-dialog">
        <Dialog fullScreen open={open} onClose={handleCloseModal}>
          <AppBar sx={{ position: "relative" }} color="success">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseModal}
                aria-label="close"
              >
                <Close />
              </IconButton>

              <Button autoFocus color="inherit">
                Update Job
              </Button>
            </Toolbar>
          </AppBar>
          <div className="update-job">
            <div className="update-job-header">
              <h3>User Details</h3>
            </div>
            <div className="update-job-user">
              <div className="user-update">
                <TextField
                  required
                  label="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="user-update">
                <TextField
                  required
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="user-update">
                <TextField
                  required
                  label="Contact Number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
              <div className="user-update">
                <TextField
                  required
                  label="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="update-job-header">
              <h3>User Address</h3>
            </div>
            <div className="update-job-address">
              <div className="user-address">
                <TextField
                  required
                  label="Post Code"
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                  }}
                />
              </div>
              <div className="user-address">
                <TextField
                  required
                  label="Street"
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                />
              </div>
              <div className="user-address">
                <Select
                  required
                  color="success"
                  labelId="state-label"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
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
              </div>
            </div>
            <div className="update-job-header">
              <h3>Job Details</h3>
            </div>

            <div className="update-job-details">
              <div className="job-update">
                <TextField
                  required
                  label="Type"
                  variant="outlined"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
              </div>

              <div className="job-update">
                <TextField
                  required
                  label="Budget"
                  variant="outlined"
                  value={budget}
                  onChange={(e) => {
                    setBudget(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <br />
            <div className="job-desc">
              <TextField
                required
                id="job-description"
                label="Description"
                variant="outlined"
                multiline
                rows={10}
                fullWidth
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <br />

            <Grid container spacing={2} className="update-img">
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height={200}
                    image={image1}
                    alt=""
                  />
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height={200}
                    image={image2}
                    alt=""
                  />
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height={200}
                    image={image3}
                    alt=""
                  />
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height={200}
                    image={image4}
                    alt=""
                  />
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height={200}
                    image={image5}
                    alt=""
                  />
                </Card>
              </Grid>
            </Grid>
            <br />
            <br />
            <Button
              variant="contained"
              startIcon={<Check />}
              onClick={confirmUpdate}
            >
              Confirm Update
            </Button>
          </div>
        </Dialog>
      </div>

      {/* snack bar */}
      <Snackbar
        open={update}
        autoHideDuration={3000}
        onClose={() => setUpdate(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setUpdate(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Succesfully Updated
        </Alert>
      </Snackbar>
      <Snackbar
        open={remove}
        autoHideDuration={3000}
        onClose={() => setRemove(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setRemove(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Sucessfully Deleted!
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
