import { Link, useLocation } from "react-router-dom";
import logo from "../images/kyw_logo.png";
import linkHoverIcon1 from "../images/greenblob.png";
import linkHoverIcon2 from "../images/blueblob.png";
import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import classNames from "classnames";

function Header() {
  const [hoverStatus, setHoverStatus] = useState({
    about: false,
    contact: false,
  });

  const location = useLocation();
  const pathName = location.pathname;
  const aboutPage = pathName.includes("/about");
  const contactPage = pathName.includes("/contact");

  useEffect(() => {
    setHoverStatus({
      about: aboutPage,
      contact: contactPage,
    });
  }, [pathName, aboutPage, contactPage]);

  return (
    <div className="Row">
      <Link to="/">
        <div className="Logo">
          <img src={logo} className="AppLogo" alt="kyw logo" />
        </div>
      </Link>

      <div className="LinkSection">
        <div className="HeaderLink">
          <Link
            to="/about"
            className="Link"
            onMouseEnter={() => setHoverStatus({ ...hoverStatus, about: true })}
            onMouseLeave={() =>
              setHoverStatus({ ...hoverStatus, about: aboutPage || false })
            }
          >
            <div
              className={classNames({
                LinkText: true,
                LinkTextBig: hoverStatus.about,
              })}
            >
              about
            </div>
            {hoverStatus.about && (
              <img
                src={linkHoverIcon1}
                className="LinkHoverIcon1 FadeIn"
                alt=""
              />
            )}
          </Link>
        </div>
        <div className="HeaderLink">
          <Link
            to="/contact"
            className="Link"
            onMouseEnter={() =>
              setHoverStatus({ ...hoverStatus, contact: true })
            }
            onMouseLeave={() =>
              setHoverStatus({ ...hoverStatus, contact: contactPage || false })
            }
          >
            <div
              className={classNames({
                LinkText: true,
                LinkTextBig: hoverStatus.contact,
              })}
            >
              contact
            </div>
            {hoverStatus.contact && (
              <img
                src={linkHoverIcon2}
                className="LinkHoverIcon2 FadeIn"
                alt=""
              />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
