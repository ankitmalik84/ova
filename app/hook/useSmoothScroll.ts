import { useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register the ScrollToPlugin if not already registered
gsap.registerPlugin(ScrollToPlugin);

const useSmoothScroll = () => {
  const smoothScroll = useCallback((target: number) => {
    gsap.to(window, {
      duration: 0.8,
      scrollTo: {
        y: `+=${window.innerHeight * target}`,
        autoKill: false,
      },
      ease: "power1.inOut",
    });
  }, []);

  return smoothScroll;
};

export default useSmoothScroll;
