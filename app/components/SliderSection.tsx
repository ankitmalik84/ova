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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && contentRef.current) {
      // ScrollTrigger for section tracking
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

      // Animation for content
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          x: -80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [activeSection]);

  return (
    <div
      ref={sectionRef}
      className="py-2 sm:py-10 h-[80vh] xl:h-[100vh] overflow-hidden flex flex-col justify-center"
    >
      <div
        ref={contentRef}
        className="flex flex-col h-[75vh] xl:h-[80vh] Xl:h-[85vh]"
      >
        <SliderComp data={data.slider1} heading="About Us" />
      </div>
    </div>
  );
};

export default SliderSection;
