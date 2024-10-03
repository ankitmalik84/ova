// components/ModelSection.tsx
import React, { useRef, useEffect } from "react";
import Model from "@/app/components/Model";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const ModelSection = () => {
  const model = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (model.current) {
      gsap.fromTo(
        model.current,
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: model.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    }
  }, []);
  return (
    <div className="pt-[250px] sm:pt-[20%] md:pt-[10%] flex align-bottom h-[100vh] overflow-hidden">
      <div ref={model} className="w-full h-full">
        <Model />
      </div>
    </div>
  );
};

export default ModelSection;
