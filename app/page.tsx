//app/page.tsx
"use client";

import {
  useRef,
  useEffect,
  // useCallback,
  useLayoutEffect,
  // useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import useSmoothScroll from "@/app/hook/useSmoothScroll";
import TextImage from "@/app/components/common/TextImage";
import NavBar from "./components/NavBar";
import data from "./data.json";
import Image from "next/image";
import img1 from "@/public/images/start/Frame1.png";
import img2 from "@/public/images/start/Frame2.png";
import img3 from "@/public/images/start/Frame3.png";
import img4 from "@/public/images/start/Frame4.png";
// import logo1 from "@/public/images/start/ova_logo1.png";
// import logo2 from "@/public/images/start/ova_logo2.png";
import logo3 from "@/public/images/start/ova_logo3.png";
import { ScrollSmoother } from "gsap/all";
import Hero from "./components/Hero";
import HighLightTextSection from "./components/HighLightTextSection";
import SliderSection from "./components/SliderSection";
import OurTeamSection from "./components/OurTeamSection";
import ModelSection from "./components/ModelSection";
import AnimationManager from "./utils/animationManager";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const decoration = useRef<HTMLDivElement>(null);
  const comp = useRef<HTMLDivElement>(null);
  const intro_last = useRef<HTMLDivElement>(null);
  const welcome = useRef<HTMLDivElement>(null);
  const textImageData = data.content;
  const ActiveSection = useRef<string>("Home");
  const smoothScroll = useSmoothScroll();
  // initially set the decoration to be hidden
  useEffect(() => {
    // Initial setting of the decoration element
    gsap.set(decoration.current, {
      autoAlpha: 0,
    });

    const handleScrollDecoration = () => {
      // Check if scroll is less than 0.8 screen heights (approximately 0.8 screens)
      const threshold = window.innerHeight * 0.8;
      const scrollY = window.scrollY;
      if (scrollY < threshold || ActiveSection.current == "Our Team") {
        gsap.to(decoration.current, { autoAlpha: 0 });
        AnimationManager.activeSection = ActiveSection.current;
        // console.log("pphhhhhppp", ActiveSection);
      } else {
        // Show the decoration if the scroll position is greater than or equal to 1.5 screens
        gsap.to(decoration.current, { autoAlpha: 1 });
        AnimationManager.activeSection = ActiveSection.current;
        // console.log("ppppp", AnimationManager.activeSection);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScrollDecoration);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScrollDecoration);
    };
  }, [ActiveSection]);

  useLayoutEffect(() => {
    if (comp.current) {
      const ctx = gsap.context(() => {
        const slides = document.getElementById("intro-slides");
        const slideup = slides?.querySelectorAll(".slide-up") as
          | NodeListOf<HTMLElement>
          | undefined;
        const logo = slides?.querySelector("img[alt='logo']");

        const tl = gsap.timeline({
          defaults: {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
          },
        });

        // Slide in the whole intro slides section
        tl.from(slides, {
          x: "100%",
          y: "100%",
          duration: 1,
          ease: "power1.inOut",
        })
          // Slide up the .slide-up divs to cover images if slideup is defined
          .from(slideup || [], {
            y: "100%", // Slide up the covering divs
            stagger: 0.2,
            ease: "power1.inOut",
          })
          // Logo rotation animations
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
            duration: 1,
            ease: "power1.inOut",
          })
          // Purple background slides up and main home screen appears
          .to(intro_last.current, {
            y: "-100%",
            duration: 1,
            ease: "power1.inOut",
            onUpdate: () => {
              // Hide or remove the intro animations
              gsap.set(slides, { autoAlpha: 0, display: "none" }); // Hide the intro slides
              gsap.set(welcome.current, { autoAlpha: 1 }); // Make the welcome screen interactive
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
      // smoothScroll(targetId);
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
        className="absolute -translate-x-[7%] h-screen w-[115%] flex overflow-hidden z-50 gap-10 items-center justify-between"
      >
        {[
          { src: img1, alt: "Img1" },
          { src: img2, alt: "Img2" },
          { src: logo3, alt: "logo" },
          { src: img3, alt: "Img3" },
          { src: img4, alt: "Img4" },
        ].map((image, index) => (
          <div
            key={index}
            className={`holder overflow-hidden relative  ${
              image.alt === "logo" ? "p-5 w-[17%]" : "w-[15%]"
            }`} // Add 'relative' to holder to position slide-up correctly
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fit"
              style={{ objectFit: "cover" }}
              className={`img p-[2px] `}
            />
            <div
              className={`absolute top-0 left-0 right-0 bottom-0 bg-customBlack slide-up ${
                image.alt === "logo" ? "hidden" : ""
              }`} // Conditional class to hide slide-up for logo
            ></div>
          </div>
        ))}
      </div>

      {/* Intro Last Slide */}
      <div
        ref={intro_last}
        className="h-screen w-screen absolute z-[55] overflow-clip"
      >
        <div className="bg-customPurple h-screen w-screen"></div>
      </div>

      {/* Welcome Section */}
      <div ref={welcome} className="opacity-0 ">
        {/* outer decroative border */}
        <div
          ref={decoration}
          className="fixed h-[101vh] inset-0 z-30 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_75%,#A600FC_150%)]"
        ></div>
        {/* main Page Content */}
        <div className="z-10 min-h-screen px-2 lg:px-12 overflow-x-clip transition-all ease-in-out duration-500 scroll-smooth">
          <NavBar activeSection={ActiveSection} />
          {/* Hero Section */}
          <Hero />
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
              {/* <TextImage
                key={textImageData[0].id}
                id={textImageData[0].id}
                title={textImageData[0].title}
                description={textImageData[0].description}
                highlightIndex={textImageData[0].highlightIndex}
                img={textImageData[0].img}
                position={textImageData[0].position}
              /> */}
            </div>
            {/* HighLightText2 section */}
            <HighLightTextSection />
            {/* Slider Section */}
            <SliderSection activeSection={ActiveSection} />
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
