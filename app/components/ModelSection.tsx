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
    if (!element) return;

    // Setup individual ScrollTrigger for this component
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top 95%",
      end: "bottom bottom",
      onEnter: () => {
        smoothScroll(0.95);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [smoothScroll]);
  return (
    <div
      ref={model}
      className="pt-[250px] sm:pt-[10%] flex align-bottom h-[100vh]"
    >
      <Model />
    </div>
  );
};

export default ModelSection;
