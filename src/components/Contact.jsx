import "../styles/About.css";
import "../styles/Header.css";
import "../styles/Contact.css";
import React from "react";
import DoublePanel from "./DoublePanel";

function Left() {
  return (
    <div className="ContactHeader">
      <div className="ContactHeaderText">links & contact:</div>
    </div>
  );
}

function Right() {

  return (
    <div className="ContactContent">
      <a
        href="https://www.linkedin.com/in/kelseywang/"
        className="ContactLink"
        target="_blank"
        rel="noreferrer"
      >
        linkedin
      </a>
      <a
        href="https://github.com/kelseyywang"
        className="ContactLink"
        target="_blank"
        rel="noreferrer"
      >
        github
      </a>
      <a
        href="https://medium.com/@kelseyywang"
        className="ContactLink"
        target="_blank"
        rel="noreferrer"
      >
        medium
      </a>
      <a
        href="https://substack.com/@kelseyywang"
        className="ContactLink"
        target="_blank"
        rel="noreferrer"
      >
        substack
      </a>
      <a
        href="https://forms.gle/WQcwuCbKXWibQmnw9"
        className="ContactLink"
        target="_blank"
        rel="noreferrer"
      >
        contact
      </a>
    </div>
  );
}

function Contact() {
  return <DoublePanel panel1={Left()} panel2={Right()} />;
}

export default Contact;
