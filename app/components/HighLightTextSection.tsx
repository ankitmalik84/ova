// components/HighLightTextSection.tsx
import React, { useEffect, useRef } from "react";
import HighLightText2 from "@/app/components/common/HighLightText2";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HighLightTextSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex w-full h-[300px] Xl:h-[55vh] mx-auto py-16 sm:py-24 items-center"
    >
      <div className="flex w-full items-center justify-center">
        <HighLightText2
          text={
            "OvaDrive isn't just about saving your chats,\nIt's the beginning to make your Soul Immortal"
          }
          breakIndex={7}
          index={13}
          size="Xl:text-[2.5vw] Xl:leading-[3.5vw]"
        />
      </div>
    </div>
  );
};

export default HighLightTextSection;
