import "../styles/About.css";
import "../styles/Header.css";
import "../styles/Contact.css";
import React, { useState } from "react";
import linkHoverIcon3 from "../images/purpleblob.png";
import DoublePanel from "./DoublePanel";

function Left() {
  return (
    <div className="ContactHeader">
      <div className="ContactHeaderText">links & contact:</div>
    </div>
  );
}

function Right() {
  const [hoverStatus, setHoverStatus] = useState({
    linkedin: false,
    contact: false,
  });

  const makeMouseHoverProps = (key) => {
    return {
      onMouseEnter: () => setHoverStatus({ ...hoverStatus, [key]: true }),
      onMouseLeave: () => setHoverStatus({ ...hoverStatus, [key]: false }),
    };
  };

  return (
    <div className="ContactContent">
      <a
        href="https://www.linkedin.com/in/kelseywang/"
        className="ContactLink"
        {...makeMouseHoverProps("linkedin")}
        target="_blank"
        rel="noreferrer"
      >
        linkedin
        {hoverStatus.linkedin && (
          <img src={linkHoverIcon3} className="LinkHoverIcon3 FadeIn" alt="" />
        )}
      </a>
      <a
        href="https://github.com/kelseyywang"
        className="ContactLink"
        {...makeMouseHoverProps("github")}
        target="_blank"
        rel="noreferrer"
      >
        github
        {hoverStatus.github && (
          <img
            src={linkHoverIcon3}
            className="LinkHoverIcon3Small FadeIn"
            alt=""
          />
        )}
      </a>
      <a
        href="https://medium.com/@kelseyywang"
        className="ContactLink"
        {...makeMouseHoverProps("medium")}
        target="_blank"
        rel="noreferrer"
      >
        medium
        {hoverStatus.medium && (
          <img src={linkHoverIcon3} className="LinkHoverIcon3 FadeIn" alt="" />
        )}
      </a>
      <a
        href="https://forms.gle/WQcwuCbKXWibQmnw9"
        className="ContactLink"
        {...makeMouseHoverProps("contact")}
        target="_blank"
        rel="noreferrer"
      >
        contact
        {hoverStatus.contact && (
          <img src={linkHoverIcon3} className="LinkHoverIcon3 FadeIn" alt="" />
        )}
      </a>
    </div>
  );
}

function Contact() {
  return <DoublePanel panel1={Left()} panel2={Right()} />;
}

export default Contact;
