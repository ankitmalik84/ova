import { useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AnimationManager from "../utils/animationManager";
// Register the ScrollToPlugin if not already registered
gsap.registerPlugin(ScrollToPlugin);

const useSmoothScroll = () => {
  const smoothScroll = useCallback(
    (target: number | string, duration?: number) => {
      if (typeof target === "string") {
        // const targetElement = document.querySelector(target); // Get the target element by ID or class
        // if (targetElement) {
        //   const elementPosition =
        //     targetElement.getBoundingClientRect().top + window.scrollY; // Element's top position relative to the document
        //   const scrollToPosition =
        //     elementPosition -
        //     (window.innerHeight * 2 - window.innerHeight * 0.1); // Subtract viewport height to align the start of the element with the end of the viewport
        //   gsap.to(window, {
        //     duration: duration || 0.8,
        //     scrollTo: {
        //       y: scrollToPosition, // Scroll to adjusted position
        //       autoKill: AnimationManager.autoKill || false,
        //     },
        //     ease: "power1.inOut",
        //   });
        // }
      } else {
        gsap.to(window, {
          duration: duration || 0.8,
          scrollTo: {
            y: `+=${window.innerHeight * target}`,
            autoKill: AnimationManager.autoKill || false,
          },
          ease: "power1.inOut",
        });
      }
    },
    []
  );

  return smoothScroll;
};

export default useSmoothScroll;
