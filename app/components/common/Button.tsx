"use client";

import React, { ReactNode, ReactElement, JSXElementConstructor } from "react";

interface ButtonProps {
  text?: string;
  onClickFn?: () => void;
  bgcolor?: string;
  textcolor?: string;
  bordercolor?: string;
  height?: string;
  width?: string;
  icon?:
    | React.ComponentType<{ className: string }> // Add className prop to the Icon component type
    | ((props: any) => ReactElement<any, string | JSXElementConstructor<any>>);
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text = "Button",
  onClickFn,
  bgcolor = "bg-transparent",
  textcolor = "text-white",
  bordercolor,
  height,
  width,
  icon: Icon,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClickFn}
      className={` ${width || "w-full"} ${
        height || "h-auto"
      } ${bgcolor} rounded-full ${textcolor} 
                border-[0.6px] ${bordercolor} text-sm flex items-center 
                gap-2 justify-center`}
      disabled={disabled}
    >
      {text}
      {Icon && <Icon className="inline-block mr-2" />}
    </button>
  );
};

export default Button;
