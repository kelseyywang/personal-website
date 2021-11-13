import "../styles/About.css";
import { present, past, future, proj1 } from "./AboutContent";
import downArrow from "../images/down_arrow.png";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";

const pages = [[present], [past, proj1], [future]];

function About() {
  // Primary index is the vertical index (up/down) and secondary is horizontal index (left/right)
  const [pageIndex, setPageIndex] = useState({ primary: 0, secondary: 0 });
  const [lastPageIndex, setLastPageIndex] = useState({
    primary: 0,
    secondary: 0,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingTimeout, setAnimatingTimeout] = useState();
  const [pageChangeType, setPageChangeType] = useState("none");

  const handleArrowPress = useCallback(
    (event) => {
      const { primary, secondary } = pageIndex;
      // Change page index upon arrow keys pressed (if there are more pages in specified direction)
      setLastPageIndex(pageIndex);
      if (event.key === "ArrowUp" && primary > 0) {
        // We will reset secondary index to 0 anytime the primary index changes
        setPageIndex({ primary: pageIndex.primary - 1, secondary: 0 });
        setPageChangeType("up");
      } else if (event.key === "ArrowDown" && primary < pages.length - 1) {
        setPageIndex({ primary: pageIndex.primary + 1, secondary: 0 });
        setPageChangeType("down");
      } else if (event.key === "ArrowLeft" && secondary > 0) {
        setPageIndex({
          primary: primary,
          secondary: pageIndex.secondary - 1,
        });
        setPageChangeType("left");
      } else if (
        event.key === "ArrowRight" &&
        secondary < pages[primary].length - 1
      ) {
        setPageIndex({
          primary: primary,
          secondary: pageIndex.secondary + 1,
        });
        setPageChangeType("right");
      } else {
        setPageChangeType("none");
        return;
      }
      setIsAnimating(true);
      clearTimeout(animatingTimeout);
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      setAnimatingTimeout(timeout);
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
  const lastPage = pages[lastPageIndex.primary][lastPageIndex.secondary];

  // TODO: remove down arrow if last page, add left/right arrows
  // TODO: trigger move page upon arrow press in addition to keyboard presses
  return (
    <div className="AboutLayout">
      <div
        className={classNames({
          AboutArrowSectionTop: pageIndex.primary > 0,
          HiddenArrow: !(pageIndex.primary > 0),
        })}
      >
        <img src={downArrow} className="DownArrow" alt="down arrow" />
      </div>
      <div
        className={classNames("AboutDoublePanel AboutDoublePanel--last", {
          SlideUpOut: isAnimating && pageChangeType === "down",
          SlideDownOut: isAnimating && pageChangeType === "up",
          SlideRightOut: isAnimating && pageChangeType === "left",
          SlideLeftOut: isAnimating && pageChangeType === "right",
        })}
      >
        {lastPage}
      </div>

      <div
        className={classNames("AboutDoublePanel", {
          SlideUp: isAnimating && pageChangeType === "down",
          SlideDown: isAnimating && pageChangeType === "up",
          SlideRight: isAnimating && pageChangeType === "left",
          SlideLeft: isAnimating && pageChangeType === "right",
        })}
      >
        {currentPage}
      </div>
      <div
        className={classNames({
          AboutArrowSectionBottom: pageIndex.primary < pages.length - 1,
          HiddenArrow: !(pageIndex.primary < pages.length - 1),
        })}
      >
        <img src={downArrow} className="DownArrow" alt="down arrow" />
      </div>
    </div>
  );
}

export default About;
