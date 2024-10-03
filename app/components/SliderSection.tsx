// components/SliderSection.tsx
import React, { useEffect, useRef } from "react";
import SliderComp from "@/app/components/common/Slider";
import data from "@/app/data.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SliderSectionProps {
  activeSection: React.MutableRefObject<string>;
}

const SliderSection: React.FC<SliderSectionProps> = ({ activeSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          activeSection.current = "AboutUs";
        },
        onEnterBack: () => {
          activeSection.current = "AboutUs";
        },
        onLeaveBack: () => {
          activeSection.current = "Home";
        },
      });
    }
  }, [activeSection]);

  return (
    <div
      ref={sectionRef}
      className="py-2 sm:py-10 h-[80vh]  xl:h-[100vh] overflow-hidden flex flex-col justify-center"
    >
      <div className="flex flex-col h-[75vh] xl:h-[80vh] Xl:h-[85vh]">
        <SliderComp data={data.slider1} heading="About Us" />
      </div>
    </div>
  );
};

export default SliderSection;
