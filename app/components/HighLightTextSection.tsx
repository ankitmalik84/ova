// components/HighLightTextSection.tsx
import React, { useRef, useEffect } from "react";
import HighLightText2 from "@/app/components/common/HighLightText2";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSmoothScroll from "../hook/useSmoothScroll";
import AnimationManager from "../utils/animationManager";

gsap.registerPlugin(ScrollTrigger);

const HighLightTextSection = () => {
  const smoothScroll = useSmoothScroll();
  const highText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = highText.current;

    if (!element) return; // Check if element is available

    // Setup individual ScrollTrigger for this component
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top 95%",
      end: "bottom 5%",
      // markers: true,
      onEnter: () => {
        smoothScroll(0.95);
      },
      onEnterBack: () => {
        smoothScroll(-0.95);
      },
    });

    AnimationManager.addScrollTrigger(scrollTrigger);

    return () => {
      scrollTrigger.kill(); // Cleanup on unmount
      AnimationManager.removeScrollTrigger(scrollTrigger);
    };
  }, [smoothScroll]); // Add smoothScroll as a dependency

  return (
    <div
      className="flex w-full h-[100vh] mx-auto py-16 sm:py-24 items-center "
      ref={highText}
    >
      <div className="flex w-full items-center justify-center">
        <HighLightText2
          text={
            "OvaDrive isn't just about saving your chats,\nIt's the beginning to make your Soul Immortal"
          }
          breakIndex={7}
          index={13}
          size="Xl:text-[3vw] Xl:leading-[4vw]"
        />
      </div>
    </div>
  );
};

export default HighLightTextSection;
