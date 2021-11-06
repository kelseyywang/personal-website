import "../styles/Home.css";
import picture from "../images/kyw_watercolor.png";
import DoublePanel from "./DoublePanel";
import { INTRO } from "./content";

function Left() {
  return (
    <div className="Left">
      <div className="TextBox">{INTRO}</div>
    </div>
  );
}

function Right() {
  return (
    <div className="Right">
      <div className="PictureContainer">
        <img src={picture} className="Picture" />
      </div>
    </div>
  );
}

function Home() {
  return <DoublePanel panel1={Left()} panel2={Right()} />;
}

export default Home;
