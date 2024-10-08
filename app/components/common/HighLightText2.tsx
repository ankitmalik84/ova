"use client";
import { FC } from "react";

interface HighLightText2Props {
  text: string;
  index: number;
  breakIndex?: number;
  size?: string;
}

const HighLightText2: FC<HighLightText2Props> = ({
  text,
  index,
  breakIndex,
  size,
}) => {
  const words = text.split(/\s+/);

  return (
    <span
      className={`relative font-bold text-md sm:text-2xl md:text-3xl ${size} text-center`}
    >
      {words.map((word, idx) => (
        <span key={word + idx}>
          <span className={idx >= index ? "text-[#c44dff]" : ""}>{word}</span>
          {breakIndex !== undefined && idx === breakIndex - 1 ? <br /> : " "}
        </span>
      ))}
    </span>
  );
};

export default HighLightText2;
