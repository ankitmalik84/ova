// components/OurTeamSection.tsx
import React, { useRef, useEffect } from "react";
import OurTeam from "@/app/components/OurTeam";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSmoothScroll from "../hook/useSmoothScroll";
import AnimationManager from "../utils/animationManager";

gsap.registerPlugin(ScrollTrigger);

interface TeamSectionProps {
  activeSection: React.MutableRefObject<string>;
}
const OurTeamSection: React.FC<TeamSectionProps> = ({ activeSection }) => {
  const team = useRef<HTMLDivElement>(null);
  const memberImageRef = useRef<HTMLDivElement>(null);

  const smoothScroll = useSmoothScroll();
  useEffect(() => {
    const element = team.current;

    if (!element) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top 95%",
      end: "bottom 5%",
      onEnter: () => {
        activeSection.current = "Our Team";
        smoothScroll(0.95);
      },
      onEnterBack: () => {
        smoothScroll(-0.95);
      },
      onLeave: () => {
        // if (AnimationManager.autoKill) AnimationManager.autoKill = false;
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
      ref={team}
      className="flex items-center h-[100vh] relative transition-all ease-in-out duration-300"
      id="our-team"
    >
      <div
        ref={memberImageRef}
        className="-ml-12 absolute inset-0 z-0 w-screen h-screen bg-cover transition-all ease-in-out duration-300"
        style={{
          filter: "blur(14px)",
        }}
      ></div>
      <div className="relative z-10 w-full">
        <OurTeam ref={memberImageRef} />
      </div>
    </div>
  );
};

export default OurTeamSection;
