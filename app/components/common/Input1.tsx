"use client";

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Input({
  id,
  label,
  placeholder,
  type,
  onChangeFn,
}: any) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="my-1">
      <label className="text-customGray text-md w-full" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        {type === "password" && (
          <>
            <span
              className="absolute right-3 top-2 cursor-pointer text-customGray"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </>
        )}
        <input
          className="text-sm bg-customBlack2 w-full px-2 py-2 text-white font-normal rounded-lg"
          type={type === "password" && showPassword ? "text" : type}
          id={id}
          onChange={onChangeFn}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
