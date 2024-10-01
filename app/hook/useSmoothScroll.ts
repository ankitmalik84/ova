import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AnimationManager from "../utils/animationManager";

gsap.registerPlugin(ScrollToPlugin);

const useSmoothScroll = () => {
  const initialScrollTop = useRef<number>(0);
  const userScrolled = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initialScrollTop.current = window.scrollY;

      // Event listener to detect manual scrolling during the animation
      const handleScroll = () => {
        if (Math.abs(window.scrollY - initialScrollTop.current) > 5) {
          userScrolled.current = true;
        }
      };

      window.addEventListener("scroll", handleScroll);

      // Cleanup the event listener on unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const smoothScroll = useCallback(
    (target: number | string, duration?: number) => {
      if (typeof window !== "undefined") {
        if (typeof target === "string") {
          // Scroll to element logic can go here if needed, currently commented out
          // const targetElement = document.querySelector(target); // Get the target element by ID or class
          // if (targetElement) {
          //   const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          //   const scrollToPosition = elementPosition - (window.innerHeight * 2 - window.innerHeight * 0.1);
          //   gsap.to(window, {
          //     duration: duration || 0.8,
          //     scrollTo: { y: scrollToPosition, autoKill: AnimationManager.autoKill || false },
          //     ease: "power1.inOut",
          //   });
          // }
        } else {
          gsap.to(window, {
            duration: duration || 0.7,
            scrollTo: {
              y: `+=${window.innerHeight * target}`,
              autoKill: AnimationManager.autoKill || false,
            },
            ease: "power1.inOut",
            onUpdate: () => {
              if (userScrolled.current) {
                AnimationManager.autoKill = true;
              }
            },
            onComplete: () => {
              userScrolled.current = false;
              AnimationManager.autoKill = false;
            },
          });
        }
      }
    },
    []
  );

  return smoothScroll;
};

export default useSmoothScroll;
