import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AnimationManager from "../utils/animationManager";

gsap.registerPlugin(ScrollToPlugin);

const useSmoothScroll = () => {
  const lastEventTime = useRef<number>(0);
  const lastEventDelta = useRef<number>(0);
  const animationInProgress = useRef<boolean>(false);
  const eventCount = useRef<number>(0);

  const handleScrollEvent = (delta: number) => {
    if (animationInProgress.current) {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastEventTime.current;
      const currentDelta = Math.abs(delta);
      eventCount.current += 1;

      console.log("timeDiff==>", timeDiff);
      console.log("currentDelta==>", currentDelta);
      console.log("eventCount==>", eventCount.current);

      if (timeDiff < 50 || eventCount.current > 3) {
        const speed = currentDelta / timeDiff;
        console.log("speed", speed);

        if (speed > 5 || eventCount.current > 5) {
          AnimationManager.autoKill = true;
          gsap.killTweensOf(window);
          console.log(
            "Animation killed due to rapid event speed or high event count",
            speed,
            eventCount.current
          );
        }
      }

      lastEventTime.current = currentTime;
      lastEventDelta.current = currentDelta;
    }
  };

  const handleWheel = (e: WheelEvent) => {
    handleScrollEvent(e.deltaY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    const delta = touch.clientY - lastEventDelta.current;
    handleScrollEvent(delta);
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
            window.addEventListener("touchmove", handleTouchMove, {
              passive: true,
            });
          } else {
            AnimationManager.autoKill = false;
          }
          lastEventTime.current = Date.now();
          lastEventDelta.current = 0;
          eventCount.current = 0; // Reset event count
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
          window.removeEventListener("touchmove", handleTouchMove);
        },
        onInterrupt: () => {
          console.log("Animation interrupted");
          animationInProgress.current = false;
          window.removeEventListener("wheel", handleWheel);
          window.removeEventListener("touchmove", handleTouchMove);
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
