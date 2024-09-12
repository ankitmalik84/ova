"use client";
import { FC } from "react";

interface HighLightText2Props {
  text: string;
  index: number;
  breakIndex?: number; // Optional parameter for breaking the line
}

const HighLightText2: FC<HighLightText2Props> = ({
  text,
  index,
  breakIndex,
}) => {
  const words = text.split(/\s+/);

  return (
    <span className="relative font-bold text-2xl sm:text-3xl md:text-4xl text-center">
      {words.map((word, idx) => (
        <span key={word + idx}>
          {/* Check if the current word should be highlighted */}
          <span className={idx >= index ? "text-[#c44dff]" : ""}>{word}</span>
          {/* Add a line break if the current index matches the breakIndex */}
          {breakIndex !== undefined && idx === breakIndex - 1 ? <br /> : " "}
        </span>
      ))}
    </span>
  );
};

export default HighLightText2;
