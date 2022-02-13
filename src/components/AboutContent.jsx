import "../styles/About.css";
import {
  ABOUT_FUTURE,
  ABOUT_PAST,
  ABOUT_PRESENT,
  ABOUT_FTF,
  ABOUT_HACKATHONS,
  ABOUT_TEC,
  ABOUT_OTHER,
} from "./content.jsx";
import DoublePanel from "./DoublePanel";

const headerText = (text) => (
  <div className="AboutHeader">
    <div className="AboutHeaderText">{text}</div>
  </div>
);

const contentText = (text) => (
  <div className="AboutContent">
    <div className="AboutContentText">{text}</div>
  </div>
);

export const present = (
  <DoublePanel
    panel1={headerText("present:")}
    panel2={contentText(ABOUT_PRESENT)}
  />
);

export const past = (
  <DoublePanel panel1={headerText("past:")} panel2={contentText(ABOUT_PAST)} />
);

export const proj1 = (
  <DoublePanel
    panel1={headerText("frame the future:")}
    panel2={contentText(ABOUT_FTF)}
  />
);

export const proj2 = (
  <DoublePanel
    panel1={headerText("hackathons:")}
    panel2={contentText(ABOUT_HACKATHONS)}
  />
);

export const proj3 = (
  <DoublePanel
    panel1={headerText("teens exploring code:")}
    panel2={contentText(ABOUT_TEC)}
  />
);

export const proj4 = (
  <DoublePanel
    panel1={headerText("other:")}
    panel2={contentText(ABOUT_OTHER)}
  />
);

export const future = (
  <DoublePanel
    panel1={headerText("future:")}
    panel2={contentText(ABOUT_FUTURE)}
  />
);
