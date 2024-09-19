"use client";
import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSmoothScroll from "../hook/useSmoothScroll";
import AnimationManager from "../utils/animationManager";

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
        pin: window.scrollY > window.innerHeight * 2 ? false : true,
        // pin: true,
        // markers: true,
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
        },
        onLeaveBack: () => {
          tl.reverse();
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
        onComplete: () => {
          if (window.scrollY < window.innerHeight * 1.2) {
            smoothScroll(1);
          }
        },
      },
      "<"
    );
    AnimationManager.addAnimation(tl);
    return tl;
  }, [smoothScroll]);

  useEffect(() => {
    const tl = setupHeroAnimations();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      AnimationManager.removeAnimation(tl);
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
        className="absolute inset-0 bg-cover bg-center bg-texture-gradient"
      ></div>
      {/* Hero section second layer (content) */}
      <div
        ref={heroSecond}
        className="absolute inset-0 flex flex-col items-center px-4 lg:px-12 backdrop-blur-lg"
      >
        <div className="w-full text-center space-y-4 flex flex-col justify-center h-full">
          <div className="text-white opacity-75 text-md lg:text-lg  Xl:text-[1.3vw] Xl:leading-[2vw]">
            The Ultimate AI Assistant
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl Xl:text-[4vw] Xl:leading-[4vw]  font-bold text-white">
            Unlock The Power Of Your 2nd Brain
          </h2>
          <div className="w-full sm:w-5/6 mx-auto flex flex-col gap-4">
            <p className="mt-2 text-white opacity-75 text-base lg:text-lg Xl:text-[1vw] Xl:leading-[1.5vw]">
              Ovadrive is designed to turn your phone into an assistant
              following you everywhere, learning all about your life and helping
              to utilize that.
            </p>
            <p className="font-bold text-white text-base lg:text-lg Xl:text-[1vw] Xl:leading-[1.5vw]">
              Own your data, own your life, own your future.
            </p>
          </div>
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
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".35em"
              className="text-[16vw] md:text-[8vw] lg:text-[12vh] font-extrabold flex justify-center"
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
