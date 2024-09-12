"use client";
import { useState } from "react";
import clsx from "clsx";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  required = false,
  register,
  disabled = false,
  placeholder = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="my-1">
      <label htmlFor={id} className="text-customGray2 text-md w-full">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          id={id}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder={placeholder}
          className={clsx(
            `
            text-sm
            bg-customBlack2
            w-full
            px-2
            py-2
            text-white
            font-normal
            rounded-lg
            form-input
            sm:text-sm
            sm:leading-6
            `,
            disabled && "opacity-80 cursor-default"
          )}
        />
        {type === "password" && (
          <span
            className="absolute right-3 top-2 cursor-pointer text-customGray"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
