"use client";

import { useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { RiLogoutBoxRLine } from "react-icons/ri";

interface ProfileDropDownProps {
  email: any;
  isOpen: any;
  setIsOpen: (open: any) => void;
}

export default function ProfileDropDown({
  email,
  isOpen,
  setIsOpen,
}: ProfileDropDownProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const path = usePathname();

  const handleLogout = () => {
    signOut();
    router.push("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div className="relative flex" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full font-bold text-xl bg-pink-600 text-white hover:bg-pink-700"
      >
        {session?.user?.email?.charAt(0).toUpperCase() ??
          email.charAt(0).toUpperCase()}
      </button>
      {isOpen && (
        <div
          className={`
          ${
            path.split("/")[1] === ""
              ? "absolute lg:rounded-l-none lg:border-l-0 lg:left-7 rounded-2xl lg:rounded-full"
              : "absolute  lg:top-14 md:-left-20 rounded-2xl z-[9999]"
          }
          mt-[56px] lg:-mt-2 w-28 lg:w-32 -right-2 lg:right-auto h-14  shadow-lg bg-transparent border border-[#ffffff88]  p-2`}
        >
          <div
            className="justify-end items-center"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={handleLogout}
              className={`w-full flex gap-2 items-center h-full
              ${path.split("/")[1] == "" ? "justify-end" : "justify-center"}
              text-center py-2 text-base text-white hover:text-white-900 font-medium`}
              role="menuitem"
            >
              <RiLogoutBoxRLine className="text-white text-xl text-bold" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
