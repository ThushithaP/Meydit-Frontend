import React from "react";
import "./home.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import arrow from "../../Icons/right-arrow.json";
import done from "../../Icons/done.json";
import AnimatedIcon from "../../components/Animated-Icons/animatedIcons";
import { Divider } from "@mui/material";
import { Footer } from "../../components/footer/footer";

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
        <div style={{ clear: "both" }}></div>
        <ul>
          <li>
            <a className="nav-link" href="/register">
              Signup
            </a>
          </li>
          <li>
            <a className="nav-link" href="/login">
              LogIn
            </a>
          </li>
          <li>
            <a className="nav-link" href="/login">
              Services
            </a>
          </li>
          <li>
            <a className="nav-link" href="/login">
              Contract Us
            </a>
          </li>
        </ul>
      </nav>

      <div className="home-body">
        <div className="home-notice">
          <div className="custom-header">
            <h1 id="head-1">Men's </h1>
            <h1 id="head-2">Women's</h1>
            <h1 id="head-3">Kid's</h1>
            <h1 id="head-4">Coziness</h1>
          </div>
          <div className="home-get">
            <span className="text">
              Get started{" "}
              <AnimatedIcon
                className="arr"
                animationData={arrow}
                size={50}
                marginTop={-17}
                marginBottom={-15}
              />{" "}
            </span>
            <span>Signup</span>
          </div>
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

      <div className="home-container">
        <div className="home-items">
          <h2 className="home-ti">Simplify your design process with ease</h2>

          <Divider />
          <div className="home-label">
            <img src={require("../../assests/images/label.jpg")} alt="" />
            <div className="label-text">
              <h3>Custom label</h3>
              <ul>
                <li>
                  Labeling clothing adds a professional touch, conveying quality
                  and attention to detail.
                </li>
                <li>
                  Custom labels can help you stand out from competitors by
                  adding a unique touch to your clothing.
                </li>
                <li>
                  Custom labels can include information about your product, such
                  as care instructions or fabric content.
                </li>
                <li>
                  Custom labels can help build customer loyalty by creating a
                  sense of exclusivity and personalization.
                </li>
              </ul>
            </div>
          </div>
          <Divider />
          <div className="home-label-l">
            <img src={require("../../assests/images/unique.jpg")} alt="" />

            <div className="label-text-l">
              <h3>Unique Design</h3>
              <ul>
                <li>
                  Custom clothing enables the creation of a unique design that
                  reflects your personal style or brand image.
                </li>
                <li>
                  A custom label can be designed to fit your specific product or
                  business, setting you apart from competitors.
                </li>
                <li>
                  Customizing your product results in a tailored design to meet
                  your vision.
                </li>
              </ul>
            </div>
          </div>
          <Divider />
          <div className="home-label">
            <img src={require("../../assests/images/fit.jpg")} alt="" />
            <div className="label-text">
              <h3>Better fit</h3>
              <ul>
                <li>
                  Custom clothing is made to fit your body or product precisely,
                  which can improve comfort and appearance.
                </li>
                <li>
                  A custom label can be tailored to the size and shape of your
                  product, ensuring a perfect fit and professional look.
                </li>
                <li>
                  Better fit reduces the risk of wardrobe malfunctions and
                  enhances durability.
                </li>
              </ul>
            </div>
          </div>
          <Divider />
          <div className="benifits-head">
            <h2 className="home-ti">
              {" "}
              Main benefits of partnering up with Meydit
            </h2>
          </div>
          <div className="home-benifits">
            <div className="ben-start">
              <div className="card">
                <AnimatedIcon
                  className="done"
                  animationData={done}
                  marginTop={-120}
                  marginBottom={0}
                  size={100}
                />
                <h3>Time-saving</h3>
              </div>
              <div className="card">
                <AnimatedIcon
                  className="done"
                  animationData={done}
                  size={100}
                  marginTop={-120}
                  marginBottom={0}
                />
                <h3>Varieties</h3>
              </div>
            </div>
            <div className="ben-end">
              <div className="card">
                <AnimatedIcon
                  className="done"
                  animationData={done}
                  size={100}
                  marginTop={-120}
                  marginBottom={0}
                />
                <h3>Cost-effective</h3>
              </div>
              <div className="card">
                <AnimatedIcon
                  className="done"
                  animationData={done}
                  size={100}
                  marginTop={-120}
                  marginBottom={0}
                />
                <h3>Personalization</h3>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};
