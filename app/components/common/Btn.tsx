"use client";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  fullWidth = false,
  children,
  onClick,
  disabled = false,
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
        px-3
        py-2
        text-sm
        font-semibold
        bg-customPurple
      `,
        disabled && "opacity-90 cursor-default",
        fullWidth && "w-full"
      )}
    >
      {children}
    </button>
  );
};
export default Button;
