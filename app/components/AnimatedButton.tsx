import { FC, ElementType } from "react";
import { PiStarFour } from "react-icons/pi";

interface AnimatedButtonProps {
  text: string;
  highlightText: string;
  bgcolor: string;
  textcolor: string;
  bordercolor: string;
  height: string;
  width: string;
  onClickFn: () => void;
  icon: ElementType;
}

const AnimatedButton: FC<AnimatedButtonProps> = ({
  text,
  highlightText,
  bgcolor,
  textcolor,
  bordercolor,
  height,
  width,
  onClickFn,
  icon: Icon,
}) => {
  return (
    <div className="relative inline-block duration-100 ease-in-out-expo group">
      <div className="absolute top-[-10px] left-[-10px] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
        <PiStarFour className="text-gray-200 text-lg" />
      </div>
      <div className="absolute top-[-35px] right-[5px] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
        <PiStarFour className="text-gray-200 text-2xl" />
      </div>
      <div className="absolute bottom-[-40px] left-[-15px] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
        <PiStarFour className="text-gray-200 text-2xl" />
      </div>
      <div className="absolute bottom-[45px] right-[-10px] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
        <PiStarFour className="text-gray-200 text-sm" />
      </div>
      <div className="absolute bottom-[10px] left-[-20px] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
        <PiStarFour className="text-gray-200 text-sm" />
      </div>
      <div className="absolute bottom-[-15px] right-[-5px] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
        <PiStarFour className="text-gray-200 text-lg" />
      </div>
      <div className=" transition-rotate group-hover:-rotate-[10deg]">
        <div className="flex z-10 bg-black rounded-2xl transform transition-transform duration-100 ease-out group-hover:scale-105 group-hover:-translate-x-1 group-hover:translate-y-2">
          <button
            type="button"
            className={`relative ${width || "w-full"} ${
              height || "h-auto"
            } ${bgcolor} rounded-2xl ${textcolor}
          ${bordercolor} text-sm flex items-center overflow-hidden
          gap-2 justify-center group-hover:translate-x-1 group-hover:-translate-y-2 border-[1px] font-bold ease-out duration-300 pl-2`}
            onClick={onClickFn}
          >
            {/* button text below slide animation */}
            <span className="absolute inset-0 flex -left-full group-hover:left-[110%] transition-all duration-200 ease-out">
              <span className="absolute inset-0 w-1 h-full bg-customPurple -rotate-[20deg] mx-2"></span>
              <span className="absolute inset-0 w-[0.35rem] h-full bg-customPurple -rotate-[20deg] "></span>
            </span>
            {/* button text */}
            <span className="relative z-10">
              <span>{text.replace(highlightText, "")}</span>
              <span className="relative inline-block transition-colors duration-200 ease-out group-hover:text-customPurple">
                {highlightText}
              </span>
            </span>
            {Icon && <Icon className="inline-block mr-1" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedButton;
