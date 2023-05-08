import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./footer.css";
import { Divider } from "@mui/material";

export const Footer = () => {
  return (
    <footer>
      <div className="site-details">
        <div className="service-details">
          <div className="web-services">
            <div className="web-head">
              <img
                className="footer-img-head"
                src={require("../../assests/footer-image/shield.png")}
                alt=""
              />
              <h3>All secure payment method</h3>
            </div>
            <div className="web-body">
              <img
                className="footer-img"
                src={require("../../assests/footer-image/paypal.png")}
                alt=""
              />
              <img
                className="footer-img"
                src={require("../../assests/footer-image/visa.png")}
                alt=""
              />
              <img
                className="footer-img"
                src={require("../../assests/footer-image/mastercard.png")}
                alt=""
              />
            </div>
          </div>
          <div className="web-services">
            <div className="web-head">
              <img
                className="footer-img-head"
                src={require("../../assests/footer-image/smile.png")}
                alt=""
              />
              <h3>Satisfication guaranteed</h3>
            </div>
            <div className="web-body">
              <p>
                Easy returns within 30 days,{" "}
                <strong>no questions asked!</strong>
              </p>
            </div>
          </div>
          <div className="web-services">
            <div className="web-head">
              <img
                className="footer-img-head"
                src={require("../../assests/footer-image/fast-delivery.png")}
                alt=""
              />
              <h3>Fast Delivery</h3>
            </div>
            <div className="web-body">
              <img
                className="footer-img"
                src={require("../../assests/footer-image/ups.png")}
                alt=""
              />
              <img
                className="footer-img"
                src={require("../../assests/footer-image/dhl.png")}
                alt=""
              />
            </div>
          </div>
        </div>
        <Divider style={{ marginTop: "2%", marginBottom: "2%" }}></Divider>
        <div className="web-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <LinkedInIcon id="li" />
            <InstagramIcon id="inst" />
            <FacebookIcon id="fb" />
            <YouTubeIcon id="yt" />

            <TwitterIcon id="tw" />
          </div>
        </div>
      </div>
    </footer>
  );
};
