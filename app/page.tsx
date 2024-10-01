//app/page.tsx
"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import useSmoothScroll from "@/app/hook/useSmoothScroll";
import TextImage from "@/app/components/common/TextImage";
import NavBar from "./components/NavBar";
import data from "./data.json";
import Image from "next/image";
import logo3 from "@/public/images/start/ova_logo3.png";
// import { ScrollSmoother } from "gsap/all";
import Hero from "./components/Hero";
import HighLightTextSection from "./components/HighLightTextSection";
import SliderSection from "./components/SliderSection";
import OurTeamSection from "./components/OurTeamSection";
import ModelSection from "./components/ModelSection";
import AnimationManager from "./utils/animationManager";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const decoration = useRef<HTMLDivElement>(null);
  const comp = useRef<HTMLDivElement>(null);
  const intro_last = useRef<HTMLDivElement>(null);
  const welcome = useRef<HTMLDivElement>(null);
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
  useLayoutEffect(() => {
    if (typeof window !== "undefined" && comp.current) {
      const ctx = gsap.context(() => {
        const slides = document.getElementById("intro-slides");
        const logo = slides?.querySelector("img[alt='logo']");

        const tl = gsap.timeline({
          defaults: {
            opacity: 1,
            duration: 0.5,
            ease: "power1.inOut",
          },
        });

        // Slide in the intro slides section
        tl.from(slides, {
          x: "100%",
          y: "100%",
          duration: 0.7,
          ease: "power1.inOut",
        })
          .to(logo || [], {
            rotate: -180,
            duration: 0.5,
            ease: "power1.inOut",
          })
          .to(logo || [], {
            rotate: -360,
            duration: 0.5,
            ease: "power1.inOut",
          })
          // Intro last slide animation
          .from(intro_last.current, {
            y: "100%",
            duration: 0.5,
            ease: "power1.inOut",
          })
          // Purple background slides up and main home screen appears
          .to(intro_last.current, {
            y: "-100%",
            duration: 0.5,
            ease: "power1.inOut",
            onUpdate: () => {
              // Hide intro animations
              gsap.set(slides, { autoAlpha: 0, display: "none" }); // Hide intro slides
              gsap.set(welcome.current, { autoAlpha: 1 }); // Show the welcome screen
            },
          })
          .to(intro_last.current, {
            opacity: 0,
          });

        AnimationManager.addAnimation(tl);
      }, comp.current);

      return () => {
        ctx.revert();
      };
    }
  }, []);

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
    <div className="relative overflow-x-hidden bg-customBlack" ref={comp}>
      {/* Intro Animation */}
      <div
        id="intro-slides"
        className="absolute h-screen w-screen flex items-center justify-center z-50"
      >
        <div className="p-2 holder overflow-hidden relative w-[250px] lg:w-[20%] flex items-center justify-center">
          <Image
            src={logo3}
            alt="logo"
            layout="fit"
            style={{ objectFit: "cover" }}
            className="img Xl:min-h-[35vh] Xl:min-w-[35vh]"
          />
        </div>
      </div>

      {/* Intro Last Slide */}
      <div
        ref={intro_last}
        className="h-screen w-screen absolute z-[55] overflow-clip"
      >
        <div className="bg-customPurple h-screen w-screen"></div>
      </div>

      {/* Welcome Section */}
      <div ref={welcome} className="opacity-0" id="main-content">
        {/* outer decroative border */}
        <div
          ref={decoration}
          className="fixed h-[101vh] inset-0 z-30 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_75%,#A600FC_150%)]"
        ></div>
        {/* main Page Content */}
        <NavBar activeSection={ActiveSection} />
        <Hero />
        <div className="z-10 min-h-screen px-2 lg:px-12 overflow-x-clip transition-all ease-in-out duration-500 scroll-smooth">
          <div className="flex flex-col gap-[6px]">
            {/* text-image section */}
            <div className="flex flex-col items-center gap-2">
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
            <div id="pre-about">
              <HighLightTextSection />
            </div>
            {/* Slider Section */}
            <div id="pre-team">
              <SliderSection activeSection={ActiveSection} />
            </div>
            {/* Our Team Section */}
            <OurTeamSection activeSection={ActiveSection} />
            {/* Model Section */}
            <ModelSection />
          </div>
        </div>
      </div>
    </div>
  );
}
