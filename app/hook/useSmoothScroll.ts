import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AnimationManager from "../utils/animationManager";

gsap.registerPlugin(ScrollToPlugin);

const useSmoothScroll = () => {
  const lastWheelTime = useRef<number>(0);
  const lastWheelDelta = useRef<number>(0);
  const animationInProgress = useRef<boolean>(false);
  const wheelScrollCount = useRef<number>(0);

  const handleWheel = (e: WheelEvent) => {
    if (animationInProgress.current) {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastWheelTime.current;
      const currentDelta = Math.abs(e.deltaY);
      wheelScrollCount.current += 1;

      console.log("timeDiff==>", timeDiff);
      console.log("currentDelta==>", currentDelta);
      console.log("wheelScrollCount==>", wheelScrollCount.current);

      if (timeDiff < 15 || wheelScrollCount.current > 3) {
        // Adjust this value to change sensitivity
        const speed = currentDelta / timeDiff;
        console.log("speed", speed);

        if (speed > 12 || wheelScrollCount.current > 5) {
          // Adjust these thresholds as needed
          AnimationManager.autoKill = true;
          gsap.killTweensOf(window);
          console.log(
            "Animation killed due to rapid wheel speed or high scroll count",
            speed,
            wheelScrollCount.current
          );
        }
      }

      lastWheelTime.current = currentTime;
      lastWheelDelta.current = currentDelta;
    }
  };

  const smoothScroll = useCallback((target: number | string, flag?: number) => {
    if (typeof window === "undefined") return;

    animationInProgress.current = true;

    console.log("smoothScroll called with target:", target, "flag:", flag);

    if (typeof target === "number") {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: `+=${window.innerHeight * target}`,
          autoKill: AnimationManager.autoKill || false,
        },
        ease: "power1.inOut",
        onStart: () => {
          if (flag !== 1) {
            window.addEventListener("wheel", handleWheel, { passive: true });
          } else {
            AnimationManager.autoKill = false;
          }
          lastWheelTime.current = Date.now();
          lastWheelDelta.current = 0;
          wheelScrollCount.current = 0; // Reset wheel scroll count
        },
        onUpdate: () => {
          console.log(
            "Animation progress, autoKill:",
            AnimationManager.autoKill
          );
        },
        onComplete: () => {
          console.log(
            "Animation complete, autoKill:",
            AnimationManager.autoKill
          );
          animationInProgress.current = false;
          AnimationManager.autoKill = false;
          window.removeEventListener("wheel", handleWheel);
        },
        onInterrupt: () => {
          console.log("Animation interrupted");
          animationInProgress.current = false;
          window.removeEventListener("wheel", handleWheel);
        },
      });
    } else if (typeof target === "string") {
      // Implement string target scrolling if needed
      console.log("String target scrolling not implemented");
    }
  }, []);

  return smoothScroll;
};

export default useSmoothScroll;
