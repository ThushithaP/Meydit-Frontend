import * as React from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Logout,
  Settings,
  AssignmentReturned as AssignmentReturnedIcon,
  Outbox as OutboxIcon,
} from "@mui/icons-material";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  //get user details
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate("/userDetails");
  };
  const handleReceivedQuote = () => {
    navigate("/receivedQuote");
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const handlePostedJob = () => {
    navigate("/JobsById");
  };
  const handleSubmittedQuotation = () => {
    navigate("/quoteById");
  };

  const handleAcceptQuotation = () => {
    navigate("/acceptQuotes");
  };
  const handleViewJob = () => {
    navigate("/maker/viewJob");
  };
  return (
    <>
      <div className="nav">
        <div className="nav-head">
          <Box
            className="nav-box"
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <div className="nav-title">
              <h3>Make Your Fashion From Expert</h3>
            </div>
            <Tooltip title="Account settings" className="nav-tool">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar className="nav-icon" sx={{ width: 32, height: 32 }}>
                  {user.name[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <div className="nav-name">
            <h2>MEYDIT</h2>
          </div>{" "}
        </div>
        <div className="nav-pag">
          {user.role === "Buyer" ? (
            <div className="buyer">
              <button onClick={handleReceivedQuote}>Received Quotations</button>
              <button onClick={handlePostedJob}>Posted Job</button>
            </div>
          ) : (
            <div className="maker">
              <button onClick={handleViewJob}>View Jobs</button>
              <button onClick={handleSubmittedQuotation}>
                Submitted Quotations
              </button>
              <button onClick={handleAcceptQuotation}>
                Accepted Quotations
              </button>
            </div>
          )}
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleProfile}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          {user.role === "Buyer"
            ? [
                <MenuItem key="received-quote" onClick={handleReceivedQuote}>
                  <ListItemIcon>
                    <AssignmentReturnedIcon fontSize="small" />
                  </ListItemIcon>
                  Received Quotations
                </MenuItem>,
                <MenuItem key="posted-job" onClick={handlePostedJob}>
                  <ListItemIcon>
                    <OutboxIcon fontSize="small" />
                  </ListItemIcon>
                  Posted Jobs
                </MenuItem>,
              ]
            : [
                <MenuItem
                  key="submitted-quotation"
                  onClick={handleSubmittedQuotation}
                >
                  <ListItemIcon>
                    <AssignmentReturnedIcon fontSize="small" />
                  </ListItemIcon>
                  Submitted Quotations
                </MenuItem>,
                <MenuItem
                  key="accepted-quotation"
                  onClick={handleAcceptQuotation}
                >
                  <ListItemIcon>
                    <AssignmentReturnedIcon fontSize="small" />
                  </ListItemIcon>
                  Accepted Quotations
                </MenuItem>,
              ]}

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};
