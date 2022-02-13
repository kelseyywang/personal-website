// Whoever thought that implementing a stupid little carousel from scratch was a good idea? Me, apparently. 🤔
import "../styles/About.css";
import {
  present,
  past,
  future,
  proj1,
  proj2,
  proj3,
  proj4,
} from "./AboutContent";
import arrowImage from "../images/down_arrow.png";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

const PAGES = [[present], [past, proj1, proj2, proj3, proj4], [future]];

function About() {
  // Primary index is the vertical index (up/down) and secondary is horizontal index (left/right)
  const [pageIndex, setPageIndex] = useState({ primary: 0, secondary: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingTimeout, setAnimatingTimeout] = useState();
  const [pageChangeType, setPageChangeType] = useState("none");
  const { primary, secondary } = pageIndex;

  const dontChange = useRef(false);
  const lastPageIndex = useRef({
    primary: 0,
    secondary: 0,
  });

  const isLastPageUp = primary <= 0;
  const isLastPageDown = primary >= PAGES.length - 1;
  const isLastPageLeft = secondary <= 0;
  const isLastPageRight = secondary >= PAGES[primary].length - 1;
  const containerRef = useRef();

  const triggerScrollActionIfPossible = (direction) => {
    lastPageIndex.current = pageIndex;
    console.log("set last to", pageIndex);
    if (direction === "up" && !isLastPageUp) {
      // We will reset secondary index to 0 anytime the primary index changes
      setPageIndex({ primary: primary - 1, secondary: 0 });
      setPageChangeType("up");
    } else if (direction === "down" && !isLastPageDown) {
      setPageIndex({ primary: primary + 1, secondary: 0 });
      setPageChangeType("down");
    } else if (direction === "left" && !isLastPageLeft) {
      setPageIndex({
        primary: primary,
        secondary: secondary - 1,
      });
      setPageChangeType("left");
    } else if (direction === "right" && !isLastPageRight) {
      setPageIndex({
        primary: primary,
        secondary: secondary + 1,
      });
      setPageChangeType("right");
    } else {
      // Reset to a non-animating state value
      setPageChangeType("none");
      return;
    }
    setIsAnimating(true);
    clearTimeout(animatingTimeout);
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    setAnimatingTimeout(timeout);
  };

  const createTouchListener = (element) => {
    // For mobile touch scroll events
    let start = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    const onTouchStart = (event) => {
      start = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    };

    const onTouchMove = (event) => {
      current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    };

    const onTouchEnd = () => {
      if (current.x === start.x && current.y === start.y) {
        return;
      }
      if (Math.abs(current.y - start.y) > Math.abs(current.x - start.x)) {
        // Vertical scroll
        if (current.y > start.y) {
          triggerScrollActionIfPossible("up");
        } else {
          triggerScrollActionIfPossible("down");
        }
      } else {
        // Horizontal scroll
        if (current.x > start.x) {
          triggerScrollActionIfPossible("left");
        } else {
          triggerScrollActionIfPossible("right");
        }
      }
    };
    element.addEventListener("touchstart", onTouchStart);
    element.addEventListener("touchmove", onTouchMove);
    element.addEventListener("touchend", onTouchEnd);

    return () => {
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchend", onTouchEnd);
    };
  };

  const createWheelListener = (element) => {
    // For mouse scroll events
    let wheelScrollingTimeout = null;
    let wheelScrolling = false;
    const onWheel = (event) => {
      if (wheelScrollingTimeout) {
        clearTimeout(wheelScrollingTimeout);
      }
      if (!wheelScrolling) {
        if (
          !dontChange.current &&
          (Math.abs(event.deltaY) > 0 || Math.abs(event.deltaX) > 0)
        ) {
          if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            // Vertical scroll
            if (event.deltaY > 0) {
              triggerScrollActionIfPossible("down");
            } else {
              triggerScrollActionIfPossible("up");
            }
          } else {
            // Horizontal scroll
            if (event.deltaX > 0) {
              triggerScrollActionIfPossible("right");
            } else {
              triggerScrollActionIfPossible("left");
            }
          }
          dontChange.current = true;
          setTimeout(() => {
            dontChange.current = false;
          }, 1000);
        }
        wheelScrolling = true;
      }
      wheelScrollingTimeout = setTimeout(() => {
        wheelScrolling = false;
      }, 50);
    };
    element.addEventListener("wheel", onWheel);

    return () => {
      if (wheelScrollingTimeout) {
        clearTimeout(wheelScrollingTimeout);
      }
      element.removeEventListener("wheel", onWheel);
    };
  };

  const createArrowPressListener = () => {
    // For keyboard arrow presses
    const handleArrowPress = (event) => {
      if (event.key === "ArrowUp") {
        triggerScrollActionIfPossible("up");
      } else if (event.key === "ArrowDown") {
        triggerScrollActionIfPossible("down");
      } else if (event.key === "ArrowLeft") {
        triggerScrollActionIfPossible("left");
      } else if (event.key === "ArrowRight") {
        triggerScrollActionIfPossible("right");
      }
    };

    document.addEventListener("keydown", handleArrowPress);
    return () => {
      document.removeEventListener("keydown", handleArrowPress);
    };
  };

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const destroyTouchListener = createTouchListener(containerRef.current);
    const destroyWheelListener = createWheelListener(containerRef.current);
    const destroyArrowPressListener = createArrowPressListener();

    return () => {
      destroyTouchListener();
      destroyWheelListener();
      destroyArrowPressListener();
    };
  }, [pageIndex]);

  useEffect(() => {}, [pageIndex.primary]);

  const currentPage = PAGES[primary][secondary];
  const lastPage =
    PAGES[lastPageIndex.current.primary][lastPageIndex.current.secondary];
  return (
    <div className="AboutLayout" ref={containerRef}>
      <div
        className={classNames({
          AboutArrowSectionTop: !isLastPageUp,
          HiddenArrow: isLastPageUp,
        })}
      >
        <img
          src={arrowImage}
          className="UpArrow"
          alt="up arrow"
          onClick={() => triggerScrollActionIfPossible("up")}
        />
      </div>
      <div
        className={classNames({
          AboutArrowSectionBottom: !isLastPageDown,
          HiddenArrow: isLastPageDown,
        })}
      >
        <img
          src={arrowImage}
          className="DownArrow"
          alt="down arrow"
          onClick={() => {
            triggerScrollActionIfPossible("down");
          }}
        />
      </div>
      <div
        className={classNames({
          AboutArrowSectionLeft: !isLastPageLeft,
          HiddenArrow: isLastPageLeft,
        })}
      >
        <img
          src={arrowImage}
          className="LeftArrow"
          alt="left arrow"
          onClick={() => {
            triggerScrollActionIfPossible("left");
          }}
        />
      </div>
      <div
        className={classNames({
          AboutArrowSectionRight: !isLastPageRight,
          HiddenArrow: isLastPageRight,
        })}
      >
        <img
          src={arrowImage}
          className="RightArrow"
          alt="right arrow"
          onClick={() => {
            triggerScrollActionIfPossible("right");
          }}
        />
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
    </div>
  );
}

export default About;
