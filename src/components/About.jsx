import "../styles/About.css";
import { present, past, future, proj1 } from "./AboutContent";
import downArrow from "../images/down_arrow.png";
import { useCallback, useEffect, useState } from "react";

const pages = [[present], [past, proj1], [future]];

function About() {
  // Primary index is the vertical index (up/down) and secondary is horizontal index (left/right)
  const [pageIndex, setPageIndex] = useState({ primary: 0, secondary: 0 });
  const handleArrowPress = useCallback(
    (event) => {
      const { primary, secondary } = pageIndex;
      // Change page index upon arrow keys pressed (if there are more pages in specified direction)
      if (event.key === "ArrowUp" && primary > 0) {
        // We will reset secondary index to 0 anytime the primary index changes
        setPageIndex({ primary: pageIndex.primary - 1, secondary: 0 });
      } else if (event.key === "ArrowDown" && primary < pages.length - 1) {
        setPageIndex({ primary: pageIndex.primary + 1, secondary: 0 });
      } else if (event.key === "ArrowLeft" && secondary > 0) {
        setPageIndex({
          primary: primary,
          secondary: pageIndex.secondary - 1,
        });
      } else if (
        event.key === "ArrowRight" &&
        secondary < pages[primary].length - 1
      ) {
        setPageIndex({
          primary: primary,
          secondary: pageIndex.secondary + 1,
        });
      }
    },
    [pageIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleArrowPress, false);

    // Clean up event listener upon leaving page
    return () => {
      document.removeEventListener("keydown", handleArrowPress, false);
    };
  }, [handleArrowPress]);

  const currentPage = pages[pageIndex.primary][pageIndex.secondary];
  return (
    <div className="AboutLayout">
      <div className="AboutDoublePanel">{currentPage}</div>
      <div className="AboutArrowSection">
        <img src={downArrow} className="DownArrow" alt="down arrow" />
      </div>
    </div>
  );
}

export default About;
