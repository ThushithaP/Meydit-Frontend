import React from "react";
import "./home.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import { Card, Divider } from "@mui/material";

export const Home = () => {
  return (
    <>
      <nav>
        <input type="checkbox" id="res-menu" />
        <label htmlFor="res-menu">
          <ViewWeekIcon id="s1"></ViewWeekIcon>
          <HighlightOffIcon id="s2"></HighlightOffIcon>
        </label>
        <h1>Meydit</h1>
        <ul>
          <li>
            <a href="/register">Sign UP</a>
          </li>
          <li>
            <a href="/login">LogIn</a>
          </li>
          <li>
            <a>Services</a>
          </li>
          <li>
            <a>Contract Us</a>
          </li>
        </ul>
      </nav>

      <div style={{ clear: "both" }}></div>

      <div className="home-body">
        <div className="home-notice">
          <Card style={{ marginTop: "100px" }}>
            <div className="custom-header">
              <h1>Custom Clothing</h1>
            </div>

            <div className="custom-body">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita consectetur repellendus illo libero soluta et
                voluptatibus incidunt tenetur eaque eos inventore, quaerat error
                maiores in architecto non sit excepturi exercitationem.
              </p>
            </div>
          </Card>
        </div>
        <div className="home-men">
          <img id="man" src={require("../../assests/images/man.jpg")} alt="" />
        </div>
        <div className="home-women">
          <img
            id="women"
            src={require("../../assests/images/women.jpg")}
            alt=""
          />
        </div>
      </div>
    </>
  );
};
