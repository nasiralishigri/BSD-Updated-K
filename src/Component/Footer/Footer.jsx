import React from "react";
import "./Footer.css";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer_main_bg">
      <p className=" footer_text">© Galaxy Finance 2023 All Rights Reserved </p>

      <div className=" footer_copy">
        <div className="row justify-content-center">
          <div className="social">
            <a
              href="https://twitter.com/MetaCryptCasinoc"
              className="footer_icons ml white "
            >
              {" "}
              <BsTwitter></BsTwitter>
            </a>
            <a href="#!" className="footer_icons ml white">
              {" "}
              <FaDiscord></FaDiscord>{" "}
            </a>
            <a
              href="https://t.me/busdcropfarmer"
              className="footer_icons ml white"
            >
              {" "}
              <FaTelegram></FaTelegram>{" "}
            </a>
            <a href="#!" className="footer_icons ml white">
              {" "}
              <AiFillInstagram></AiFillInstagram>
            </a>
            <a href="#!" className="footer_icons ml white">
              {" "}
              <AiFillLinkedin></AiFillLinkedin>
            </a>
            <a href="#!" className="footer_icons ml ">
              {" "}
              <FaFacebookF> </FaFacebookF>{" "}
            </a>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
