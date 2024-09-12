// components/ModelSection.tsx
import React, { useRef, useEffect, use } from "react";
import Model from "@/app/components/Model";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSmoothScroll from "../hook/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);
const ModelSection = () => {
  const model = useRef<HTMLDivElement>(null);
  const smoothScroll = useSmoothScroll();
  useEffect(() => {
    const element = model.current;
    if (!element) return; // Check if element is available

    // Setup individual ScrollTrigger for this component
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top 95%",
      end: "bottom bottom",
      // markers: true, // Set to true for debugging
      onEnter: () => {
        // gsap.to(element, { autoAlpha: 1, ease: "power2.inOut" });
        smoothScroll(0.95);
      },
      // onEnterBack: () => {
      //   // gsap.to(element, { autoAlpha: 1, duration: 0.8, ease: "power2.inOut" });
      //   smoothScroll(-1);
      // },
      // onLeave: () => {
      //   gsap.to(element, { autoAlpha: 0.5,  ease: "power2.inOut" });
      // },
      // onLeaveBack: () => {
      //   smoothScroll(-1);
      // },
    });

    return () => {
      scrollTrigger.kill(); // Cleanup on unmount
    };
  }, [smoothScroll]); // Add smoothScroll as a dependency
  return (
    <div ref={model} className="pt-[200px] sm:pt-[10%] h-[100vh]">
      <Model />
    </div>
  );
};

export default ModelSection;
