import { Link } from "react-router-dom";
import logo from "../images/kyw_logo.png";
import linkHoverIcon1 from "../images/blob1.png";
import linkHoverIcon2 from "../images/blob2.png";
import React, { useState } from "react";
import "../styles/Header.css";

function Header() {
  const [hoverStatus, setHoverStatus] = useState({
    about: false,
    contact: false,
  });

  return (
    <div className="Row">
      <Link to="/">
        <div className="Logo">
          <img src={logo} className="AppLogo" alt="kyw logo" />
        </div>
      </Link>

      <div className="LinkSection">
        <Link to="/about" className="HeaderLink">
          <div
            className="Link"
            onMouseEnter={() => setHoverStatus({ ...hoverStatus, about: true })}
            onMouseLeave={() =>
              setHoverStatus({ ...hoverStatus, about: false })
            }
          >
            <div className="LinkText">about</div>
            {hoverStatus.about && (
              <img
                src={linkHoverIcon1}
                className="LinkHoverIcon1 FadeIn"
                alt=""
              />
            )}
          </div>
        </Link>
        <Link to="/contact" className="HeaderLink">
          <div
            className="Link"
            onMouseEnter={() =>
              setHoverStatus({ ...hoverStatus, contact: true })
            }
            onMouseLeave={() =>
              setHoverStatus({ ...hoverStatus, contact: false })
            }
          >
            <div className="LinkText">contact</div>
            {hoverStatus.contact && (
              <img
                src={linkHoverIcon2}
                className="LinkHoverIcon2 FadeIn"
                alt=""
              />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
