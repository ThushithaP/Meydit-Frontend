import React, { useEffect, useState } from "react";
import {
  UpdateUserData,
  UserInfoById,
  UpdatePassword,
} from "../../services/user-service/user-service";
import {
  Dialog,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../navbar/navbar";
import "./user-profile.css";

export const UserProfile = () => {
  const [userInformation, setUserInformation] = useState([]);
  const [open, setShowModal] = useState(false);
  const [user, setUserModal] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [role, setRole] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigte = useNavigate();
  async function UserDetails() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const id = user.id;
    setId(id);
    const response = await UserInfoById(id);
    console.log(response);

    const userDetails = response.map((userData) => ({
      name: userData.name,
      email: userData.email,
      contactNumber: userData.contactNumber,
      role: userData.role,
    }));
    setUserInformation(userDetails);
    setName(userDetails[0].name);
    setEmail(userDetails[0].email);
    setContactNumber(userDetails[0].contactNumber);
    setRole(userDetails[0].contactNumber);
  }

  useEffect(() => {
    UserDetails();
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
    setUserModal(false);
  };
  const handleUserProfileChange = () => {
    setUserModal(true);
    console.log();
  };

  async function handleUpdateProfile() {
    const response = await UpdateUserData(id, name, email, contactNumber);
    console.log(response);
  }
  const handleOpenPasswordChange = () => {
    setShowModal(true);
  };
  async function handlePasswordChange() {
    if (confirmPassword === newPassword) {
      const response = await UpdatePassword(id, oldPassword, newPassword);
      setShowModal(false);
      localStorage.clear();
      navigte("/login");
    } else {
      console.log("not match");
    }
  }

  return (
    <>
      <NavBar></NavBar>
      {/* user information */}
      {userInformation.map((user, index) => (
        <div className="profile-container" key={index}>
          <div className="profile-name">
            <h3>Name : {user.name}</h3>
          </div>
          <div className="profile-email">
            <h3>Email : {user.email}</h3>
          </div>
          <div className="profile-contact">
            <h3>Contact Number : {user.contactNumber}</h3>
          </div>
          <div className="profile-role">
            <h3>Role : {user.role}</h3>
          </div>
        </div>
      ))}

      {/* buttons */}
      <div className="profile-update-button">
        <button onClick={handleUserProfileChange}>Change Profile</button>
        <button onClick={handleOpenPasswordChange}>Password Change</button>
      </div>

      {/* user profile change */}
      <Dialog open={user} onClose={handleCloseModal}>
        <div className="profile-change-container">
          <div className="profile-change-header">
            {" "}
            <h2>Change Profile Information</h2>{" "}
            <IconButton
              edge="end"
              className="change-icon"
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
            >
              {" "}
              <CloseIcon />{" "}
            </IconButton>
          </div>

          <Divider></Divider>
          <div className="profile-change-body">
            <FormControl
              sx={{ width: "100%", margin: "8px 0", fontSize: "1.2rem" }}
            >
              <Typography sx={{ fontSize: "1.2rem", color: "purple" }}>
                Name :
              </Typography>
              <Input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl
              sx={{ width: "100%", margin: "8px 0", fontSize: "1.2rem" }}
            >
              <Typography sx={{ fontSize: "1.2rem", color: "purple" }}>
                Email :
              </Typography>

              <Input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>

            <FormControl sx={{ width: "100%", margin: "8px 0" }}>
              <Typography sx={{ fontSize: "1.2rem", color: "purple" }}>
                Contact Number :
              </Typography>

              <Input
                type="text"
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                }}
              />
            </FormControl>
            <button className="change-btn" onClick={handleUpdateProfile}>
              Submit
            </button>
          </div>
        </div>
      </Dialog>

      {/* password change */}
      <Dialog open={open} onClose={handleCloseModal}>
        <div className="profile-change-container">
          <div className="profile-change-header">
            <h2>Change Password</h2>
            <IconButton
              edge="end"
              className="change-icon"
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
            >
              {" "}
              <CloseIcon />{" "}
            </IconButton>
          </div>
          <Divider></Divider>
          <div className="profile-change-body">
            <FormControl sx={{ width: "100%", margin: "8px 0" }}>
              <Typography sx={{ fontSize: "1.2rem", color: "purple" }}>
                Old Password :
              </Typography>

              <Input
                type="password"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
            </FormControl>

            <FormControl sx={{ width: "100%", margin: "8px 0" }}>
              <Typography sx={{ fontSize: "1.2rem", color: "purple" }}>
                New Password :
              </Typography>

              <Input
                type="password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </FormControl>

            <FormControl sx={{ width: "100%", margin: "8px 0" }}>
              <Typography sx={{ fontSize: "1.2rem", color: "purple" }}>
                Confirm Password :
              </Typography>
              <Input
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </FormControl>
            <button className="change-btn" onClick={handlePasswordChange}>
              Submit
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
