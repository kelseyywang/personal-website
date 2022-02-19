import "../styles/Home.css";
import picture from "../images/kyw_watercolor.png";
import DoublePanel from "./DoublePanel";
import { INTRO } from "./content.jsx";

function Left() {
  return (
    <div className="HomeLeft">
      <div className="HomeTextBox">{INTRO}</div>
    </div>
  );
}

function Right() {
  return (
    <div className="HomeRight">
      <div className="HomePictureContainer">
        <img src={picture} className="HomePicture" alt="Kelsey Wang" />
      </div>
    </div>
  );
}

function Home() {
  return <DoublePanel panel1={Left()} panel2={Right()} />;
}

export default Home;
