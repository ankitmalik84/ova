"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Button from "@/app/components/common/Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSmoothScroll from "../hook/useSmoothScroll";
// import AnimationManager from "../utils/animationManager"; 

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroThird = useRef<HTMLDivElement>(null);
  const heroSecond = useRef<HTMLDivElement>(null);
  const heroFirst = useRef<SVGSVGElement>(null);
  const heroSection = useRef<HTMLDivElement>(null);

  const smoothScroll = useSmoothScroll();

  const setupHeroAnimations = useCallback(() => {
    const scaleValue = window.innerWidth <= 768 ? 32 : 25;
    gsap.set(heroFirst.current, { scale: scaleValue, autoAlpha: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection.current,
        start: "top -2px",
        end: "+=100%",
        pin: true,
        // pinSpacing: true,
        // markers: true, // Remove markers for production
        // scrub: 1,
        onUpdate: (self) => {
          const progressThreshold = window.innerWidth >= 768 ? 0.05 : 0.02;
          gsap.to(heroFirst.current, {
            autoAlpha: self.progress > progressThreshold ? 1 : 0,
          });
          gsap.to(heroThird.current, {
            filter: self.progress > 0.5 ? "blur(8px)" : "blur(0px)",
          });
        },
        onEnterBack: () => {
          smoothScroll(-1);
          // Restart timeline when entering back
        },
        onLeaveBack: () => {
          tl.reverse(); // Reverse the animation timeline when scrolling back
        },
      },
    });

    tl.to(heroFirst.current, {
      scale: 1,
      y: 0,
      x: 0,
      ease: "expoScale",
      duration: 0.8,
      
    }).to(
      heroSecond.current,
      {
        yPercent: -100,
        ease: "power1.inOut",
        duration: 0.8,
        onComplete: () =>{
          smoothScroll(1);
          // AnimationManager.removeAnimation(tl);
        } 
      },
      "<"
    );
    // AnimationManager.addAnimation(tl);
    return tl;
  }, [smoothScroll]);

  useEffect(() => {
    const tl = setupHeroAnimations();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      // AnimationManager.removeAnimation(tl);
    };
  }, [setupHeroAnimations]);

  return (
    <div
      ref={heroSection}
      className="align-bottom relative h-[100vh] overflow-hidden justify-center items-center flex flex-col"
    >
      {/* <div className="absolute h-[10vh] w-full bg-slate-600">hj</div> */}
      {/* Hero section third layer (background image) */}
      <div
        id="hero"
        ref={heroThird}
        className="mt-[90px] absolute inset-0 bg-cover bg-center bg-texture-gradient"
      ></div>
      {/* Hero section second layer (content) */}
      <div
        ref={heroSecond}
        className="mt-[90px] absolute inset-0 flex flex-col items-center px-4 lg:px-12 backdrop-blur-lg"
      >
        <div className="w-full max-w-6xl text-center space-y-4 flex flex-col justify-center h-full">
          <div className="text-white opacity-75 text-md lg:text-lg">
            The Ultimate AI Assistant
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">
            Unlock The Power Of Your 2nd Brain
          </h2>
          <div className="w-full sm:w-5/6 mx-auto flex flex-col gap-4">
            <p className="mt-2 text-white opacity-75 text-base lg:text-lg">
              Ovadrive is designed to turn your phone into an assistant
              following you everywhere, learning all about your life and helping
              to utilize that.
            </p>
            <p className="font-bold text-white text-base lg:text-lg">
              Own your data, own your life, own your future.
            </p>
          </div>
        </div>

        <div className="mt-3 mb-5 flex flex-row space-x-2 justify-end w-full">
          <Button
            text="Android App"
            bgcolor="bg-customPurple"
            textcolor="text-white"
            bordercolor="border-customPurple"
            height="h-9"
            width="w-28 sm:w-28"
            onClickFn={() => (window.location.href = "/")}
          />
          <Button
            text="iOS App"
            bgcolor="bg-customPurple"
            textcolor="text-white"
            bordercolor="border-customPurple"
            height="h-9"
            width="w-20 sm:w-28"
            onClickFn={() => (window.location.href = "/")}
          />
          <Button
            text="Learn More"
            bgcolor="bg-transparent"
            textcolor="text-white"
            bordercolor="border-white"
            height="h-9"
            width="w-24 sm:w-28"
            onClickFn={() => (window.location.href = "/")}
          />
        </div>
      </div>

      {/* Hero section first layer (text overlay) */}
      <svg
        ref={heroFirst}
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        height="100vh"
        width="100vw"
      >
        <defs>
          <mask id="mask">
            <rect width="100vw" height="100vh" fill="white" />
            <text
              x="48%"
              y="50%"
              textAnchor="middle"
              dy=".35em"
              className="text-[16vw] md:text-[8vw] font-extrabold flex justify-center"
              fill="black"
            >
              OVA DRIVE
            </text>
          </mask>
        </defs>
        <rect width="100vw" height="100vh" fill="black" mask="url(#mask)" />
      </svg>
    </div>
  );
};

export default Hero;
