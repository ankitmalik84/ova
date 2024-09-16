"use client";

import { FC, useRef, useEffect, useMemo, useCallback } from "react";
import HighLightText from "./HighLightText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import AnimationManager from "../../utils/animationManager";
import useSmoothScroll from "@/app/hook/useSmoothScroll";

interface TextImageProps {
  id: number;
  title: string;
  description?: string;
  highlightIndex?: number;
  leading?: string;
  img: string;
  position: string;
}

gsap.registerPlugin(ScrollTrigger);

const TextImage: FC<TextImageProps> = ({
  title,
  description,
  highlightIndex = -1,
  leading = "",
  img,
  position,
  id = -1,
}) => {
  const textImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smoothScroll = useSmoothScroll();

  const setupAnimation = useCallback(() => {
    if (!contentRef.current || !textImageRef.current) return;

    let animationSettings;
    if (id === 1) {
      animationSettings = {
        from: { autoAlpha: 0 },
        to: {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: textImageRef.current,
          start: "top 85%",
          end: "bottom 5%",
          // markers: true,
          onEnter: () => smoothScroll(0.85),
          onEnterBack: () => smoothScroll(-0.95),
        },
      };
    } else if (id !== 3) {
      animationSettings = {
        from: { autoAlpha: 0 },
        to: {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: textImageRef.current,
          start: "top 95%",
          end: "bottom 5%",
          // markers: true,
          onEnter: () => smoothScroll(0.95),
          onEnterBack: () => smoothScroll(-0.95),
        },
      };
    } else {
      animationSettings = {
        from: { xPercent: 100, yPercent: 100, autoAlpha: 0 },
        to: {
          xPercent: 0,
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: textImageRef.current,
          start: "top 95%",
          end: "bottom 5%",
          // markers: true,
          onEnter: () => smoothScroll(0.95),
          onEnterBack: () => smoothScroll(-0.95),
          onLeave: () => {
            if (AnimationManager.autoKill) AnimationManager.autoKill = false;
          },
        },
      };
    }

    const animation = gsap.fromTo(contentRef.current, animationSettings.from, {
      ...animationSettings.to,
      scrollTrigger: animationSettings.scrollTrigger,
    }) as gsap.core.Tween; // Cast Timeline as Tween

    // console.log('Setting up animation:', animation);

    if (animation) {
      AnimationManager.addAnimation(animation);
    }
    return animation;
  }, [id, smoothScroll]);

  useEffect(() => {
    // console.log('Setting up TextImage animation.');

    const animation = setupAnimation();

    return () => {
      // console.log('Cleaning up TextImage animation.');

      // Only remove the specific ScrollTrigger for this component
      const triggers = ScrollTrigger.getAll().filter(
        (t) => t.trigger === textImageRef.current
      );
      triggers.forEach((t) => {
        // console.log('Killing ScrollTrigger:', t);
        t.kill();
      });

      if (animation) {
        AnimationManager.removeAnimation(animation); // Assuming animation is a Tween, not ScrollTrigger
      }
    };
  }, [setupAnimation]);

  const words = useMemo(() => title.split(" "), [title]);

  return (
    <div
      ref={textImageRef}
      className="w-full max-w-[1200px] Xl:max-w-[75vw] h-[100vh] overflow-hidden"
    >
      <div
        ref={contentRef}
        className={`mx-auto flex gap-3 sm:gap-4 md:gap-12 h-[100vh] items-center ${
          position === "right"
            ? "flex-col sm:flex-row-reverse"
            : "flex-col sm:flex-row"
        }`}
      >
        <div className="w-full sm:w-3/5 flex flex-col">
          <h1
            className={`text-3xl sm:text-4xl Xl:text-[3vw] font-bold ${leading} text-white`}
          >
            {words.map((word, index) =>
              index === highlightIndex ? (
                <HighLightText
                  key={index}
                  text={word + " "}
                  size="text-4xl Xl:text-[3vw] italic"
                  type="bold"
                />
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h1>
          {description && (
            <p className="mt-4 sm:mt-8 Xl:mt-[4vh] text-white opacity-75 text-md leading-6 sm:leading-7 text-[15px] sm:text-base Xl:text-[1.1vw] Xl:leading-[1.8vw]">
              {description}
            </p>
          )}
        </div>
        <div className="w-full sm:w-2/5 min-h-[350px] h-[400px] Xl:h-[48vh] relative">
          <Image
            src={img}
            alt="Text image"
            fill // Replaces layout="fill"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default TextImage;
