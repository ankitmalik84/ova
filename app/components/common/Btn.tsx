"use client";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  secondary?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  fullWidth = false,
  children,
  onClick,
  disabled = false,
  danger,
  secondary,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `
        flex
        justify-center
        rounded-full
        items-center
        gap-1
        px-3
        py-2 Xl:py-[1.8vh]
        text-sm Xl:text-[2vh]
        font-semibold
        bg-customPurple
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
      `,
        disabled && "opacity-90 cursor-default",
        fullWidth && "w-full",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        secondary ? "text-gray-900" : "text-white",
        className
      )}
    >
      {children}
    </button>
  );
};
export default Button;
