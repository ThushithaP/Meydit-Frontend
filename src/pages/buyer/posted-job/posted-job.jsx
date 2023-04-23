import React, { useEffect, useState } from "react";
import { JobById } from "../../../services/job-service/job-service";
import { NavBar } from "../../../components/navbar/navbar";
import "./posted-job.css";
import { JobUpdate } from "../../../services/job-service/job-service";
import {
  Button,
  Dialog,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
    console.log(job.id);
  };

  // update job
  async function confirmUpdate() {
    console.log(id);
    const jobData = {
      firstname: firstName,
      lastname: lastName,
      phone_number: phoneNumber,
      email: email,
      postcode: postcode,
      street: street,
      state: state,
      type: type,
      description: description,
      budget: budget,
      image_1: image1,
      image_2: image2,
      image_3: image3,
      image_4: image4,
      image_5: image5,
    };
    console.log(jobData);
    // const response = await JobUpdate(id, jobData);
  }

  // Delete Job
  async function DeleteJobByID() {}

  return (
    <>
      <NavBar></NavBar>
      {jobList.map((job, index) => (
        <div className="posted-container" key={index}>
          <div className="posted-header">
            <h3>Quotation of {job.type}</h3>
          </div>
          <div className="posted-user">
            <h5>
              First Name: <span>{job.firstname}</span>
            </h5>
            <h5>
              Last Name: <span>{job.lastname}</span>
            </h5>
            <h5>
              Phone Number: <span>{job.phoneNumber}</span>
            </h5>
            <h5>
              Email: <span>{job.email}</span>
            </h5>
          </div>
          <div className="posted-address">
            <h5>
              Post Code: <span>{job.postcode}</span>
            </h5>
            <h5>
              Street: <span>{job.street}</span>
            </h5>
            <h5>
              State: <span>{job.state}</span>
            </h5>
          </div>
          <div className="posted-job">
            <h5>
              Budget: <span>$ {job.budget}</span>
            </h5>
            <p>
              <h5>Description:</h5>
              {job.description}
            </p>
          </div>
          <div className="posted-img">
            <img className="image-posted" src={job.image_1} alt="" />
            <img className="image-posted" src={job.image_2} alt="" />
            <img className="image-posted" src={job.image_3} alt="" />
            <img className="image-posted" src={job.image_4} alt="" />
            <img className="image-posted" src={job.image_5} alt="" />
          </div>
          <button onClick={() => handleUpdate(job)}>Update Job</button>
        </div>
      ))}

      {/* update job */}
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleCloseModal}
          // TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseModal}
                aria-label="close"
              >
                <CloseIcon />
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
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="user-update">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="user-update">
                <label htmlFor="">Contact Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
              <div className="user-update">
                <label htmlFor="">Email</label>
                <input
                  type="text"
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
                <label htmlFor="">Post Code</label>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                  }}
                />
              </div>
              <div className="user-address">
                <label htmlFor="">Street</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                />
              </div>
              <div className="user-address">
                <label htmlFor="">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="update-job-header">
              <h3>Job Details</h3>
            </div>
            <div className="update-job-details">
              <div className="job-update">
                <label htmlFor="">Type</label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
              </div>

              <div className="job-update">
                <label htmlFor="">Budget</label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => {
                    setBudget(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="job-desc">
              <label htmlFor="">Description</label>
              <textarea
                rows={10}
                cols={100}
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="update-img">
              <div className="update-img1">
                <img width={200} height={200} src={image1} alt="" />
                <input
                  type="file"
                  onChange={(e) => {
                    setImage1(e.target.files[0]);
                  }}
                />
              </div>
              <div className="update-img2">
                <img width={200} height={200} src={image2} alt="" />
                <input
                  type="file"
                  onChange={(e) => {
                    setImage2(e.target.files[0]);
                  }}
                />
              </div>
              <div className="update-img3">
                <img width={200} height={200} src={image3} alt="" />
                <input
                  type="file"
                  onChange={(e) => {
                    setImage3(e.target.files[0]);
                  }}
                />
              </div>
              <div className="update-img4">
                <img width={200} height={200} src={image4} alt="" />
                <input
                  type="file"
                  onChange={(e) => {
                    setImage4(e.target.files[0]);
                  }}
                />
              </div>
              <div className="update-img5">
                <img width={200} height={200} src={image5} alt="" />
                <input
                  type="file"
                  onChange={(e) => {
                    setImage5(e.target.files[0]);
                  }}
                />
              </div>
            </div>
            <button onClick={confirmUpdate}>Confirm Update</button>
          </div>
        </Dialog>
      </div>
    </>
  );
};
