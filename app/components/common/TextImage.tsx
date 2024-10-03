"use client";

import { FC, useRef, useEffect, useMemo } from "react";
import HighLightText from "./HighLightText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const words = useMemo(() => title.split(" "), [title]);

  useEffect(() => {
    if (contentRef.current && textRef.current && imageRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: position === "right" ? 50 : -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: position === "right" ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [position]);

  return (
    <div className="w-full max-w-[1200px] Xl:max-w-[75vw] xl:h-[70vh] Xl:h-[60vh] overflow-hidden flex items-center">
      <div
        ref={contentRef}
        className={`mx-auto flex gap-3 sm:gap-4 md:gap-8 Xl:gap-16 items-center ${
          position === "right"
            ? "flex-col sm:flex-row-reverse"
            : "flex-col sm:flex-row"
        }`}
      >
        <div ref={textRef} className="w-full sm:w-3/5 flex flex-col">
          <h1
            className={`text-2xl sm:text-3xl lg:text-4xl Xl:text-[3vw] font-bold ${leading} text-white`}
          >
            {words.map((word, index) =>
              index === highlightIndex ? (
                <HighLightText
                  key={index}
                  text={word + " "}
                  size="text-2xl sm:text-3xl lg:text-4xl Xl:text-[3vw] italic"
                  type="bold"
                />
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h1>
          {description && (
            <p className="mt-2 sm:mt-8 Xl:mt-[4vh] text-white opacity-75 text-sm sm:text-base Xl:text-[1.1vw] Xl:leading-[1.8vw]">
              {description}
            </p>
          )}
        </div>
        <div
          ref={imageRef}
          className="w-full sm:w-2/5 h-[300px] sm:h-[400px] Xl:h-[50vh] relative"
        >
          <Image
            src={img}
            alt="Text image"
            fill
            style={{ objectFit: "cover", borderRadius: "2vh" }}
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default TextImage;
