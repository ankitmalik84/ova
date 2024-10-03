//app/page.tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import useSmoothScroll from "@/app/hook/useSmoothScroll";
import TextImage from "@/app/components/common/TextImage";
import NavBar from "./components/NavBar";
import data from "./data.json";
// import { ScrollSmoother } from "gsap/all";
import Hero from "./components/Hero";
import HighLightTextSection from "./components/HighLightTextSection";
import SliderSection from "./components/SliderSection";
import OurTeamSection from "./components/OurTeamSection";
import ModelSection from "./components/ModelSection";
// import AnimationManager from "./utils/animationManager";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const decoration = useRef<HTMLDivElement>(null);
  const ActiveSection = useRef<string>("Home");
  const smoothScroll = useSmoothScroll();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only run this code on the client
      gsap.set(decoration.current, { autoAlpha: 0 });

      const handleScrollDecoration = () => {
        const threshold = window.innerHeight * 0.8;
        const scrollY = window.scrollY;
        if (scrollY < threshold || ActiveSection.current === "Our Team") {
          gsap.to(decoration.current, { autoAlpha: 0 });
        } else {
          gsap.to(decoration.current, { autoAlpha: 1 });
        }
      };

      window.addEventListener("scroll", handleScrollDecoration);

      return () => {
        window.removeEventListener("scroll", handleScrollDecoration);
      };
    }
  }, [ActiveSection]);

  useEffect(() => {
    const handleNavClick = (event: CustomEvent) => {
      const targetId = event.detail;
      if (targetId) {
        smoothScroll(targetId);
      }
    };

    window.addEventListener("navClick", handleNavClick as EventListener);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("navClick", handleNavClick as EventListener);
    };
  }, [
    // setupScrollAnimations,
    smoothScroll,
  ]);
  return (
    <div className="relative overflow-x-hidden bg-customBlack">
      {/* Welcome Section */}
      <div id="main-content">
        {/* outer decroative border */}
        <div
          ref={decoration}
          className="hidden sm:block fixed h-[101vh] inset-0 z-30 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_75%,#A600FC_150%)]"
        ></div>
        {/* main Page Content */}
        <NavBar activeSection={ActiveSection} />
        <Hero />
        <div className="z-10 min-h-screen px-2 lg:px-12 overflow-x-clip transition-all ease-in-out duration-500 scroll-smooth">
          <div className="flex flex-col gap-[6px]">
            {/* text-image section */}
            <div className="flex flex-col items-center gap-[8vh] xl:gap-[20vh] 2xl:gap-[10vh] Xl:gap-[20vh]">
              {data.content.map((item: any) => (
                <TextImage
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  highlightIndex={item.highlightIndex}
                  img={item.img}
                  position={item.position}
                />
              ))}
            </div>
            {/* HighLightText2 section */}
            <HighLightTextSection />
            {/* Slider Section */}
            <div id="about">
              <SliderSection activeSection={ActiveSection} />
            </div>
            {/* Our Team Section */}
            <div id="team">
              <OurTeamSection activeSection={ActiveSection} />
            </div>
            {/* Model Section */}
            <ModelSection />
          </div>
        </div>
      </div>
    </div>
  );
}
