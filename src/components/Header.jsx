import logo from '../images/kyw_logo.png';
import '../styles/Header.css';

function Header() {
  return (
    <body>
        <div className="Header">
          <div className="Logo">
          <img src={logo} className="AppLogo" alt="logo" />
          </div>
          <div className="LinkSection">
            <div className="Link">about</div>
            <div className="Link">contact</div>
          </div>
        </div>
    </body>
  );
}

export default Header;
