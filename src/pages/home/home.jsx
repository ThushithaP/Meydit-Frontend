import React from "react";
import "./home.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";

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
    </>
  );
};
