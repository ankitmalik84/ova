// components/SliderSection.tsx
import React, { useEffect, useRef } from "react";
import SliderComp from "@/app/components/common/Slider";
import data from "@/app/data.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSmoothScroll from "../hook/useSmoothScroll";
import AnimationManager from "../utils/animationManager";

gsap.registerPlugin(ScrollTrigger);

interface SliderSectionProps {
  activeSection: React.MutableRefObject<string>;
}

const SliderSection: React.FC<SliderSectionProps> = ({ activeSection }) => {
  const slider = useRef<HTMLDivElement>(null);
  const smoothScroll = useSmoothScroll();
  useEffect(() => {
    const element = slider.current;

    if (!element) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top 95%",
      end: "bottom 5%",
      // markers: true,
      onEnter: () => {
        smoothScroll(0.95);
        // setActiveSection("AboutUs");
        // AnimationManager.activeSection = "AboutUs";
        activeSection.current = "AboutUs";
      },
      onEnterBack: () => {
        // setActiveSection("AboutUs");
        smoothScroll(-0.95);
        activeSection.current = "AboutUs";
      },
      onLeaveBack: () => {
        // router.push("/");
        // console.log("leaving back", window.location.pathname);
        if (AnimationManager.autoKill) AnimationManager.autoKill = false;
        activeSection.current = "Home";
      },
      onLeave: () => {
        if (AnimationManager.autoKill) AnimationManager.autoKill = false;
      },
    });
    AnimationManager.addScrollTrigger(scrollTrigger);
    return () => {
      scrollTrigger.kill();
      AnimationManager.removeScrollTrigger(scrollTrigger);
    };
  });
  return (
    <div
      ref={slider}
      className="py-2 sm:py-10 h-[100vh] overflow-hidden flex flex-col justify-center"
    >
      <div className="flex flex-col my-24 h-[380px] Xl:h-[53vh]">
        <SliderComp data={data.slider1} heading="About Us" />
      </div>
    </div>
  );
};

export default SliderSection;
