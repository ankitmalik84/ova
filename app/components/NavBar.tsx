import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Hamburger from "hamburger-react";
import Link from "next/link";
import Button from "@/app/components/common/Button";
import data from "@/app/data.json";
import ProfileDropDown from "@/app/components/ProfileDropDown";
import useOnClickOutside from "@/app/hook/useOnClickOutside";
import AnimationManager from "../utils/animationManager";

interface NavBarProps {
  activeSection?: React.MutableRefObject<string>;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection }) => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Home");
  const ref = useRef<HTMLDivElement | null>(null);
  const [screenSize, setScreenSize] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useOnClickOutside(ref, () => setOpen(false));

  const handleNavClick = (url: string) => {
    if (url.startsWith("#")) {
      const section = document.querySelector(url);
      if (section) {
        AnimationManager.autoKill = true;
      }
    } else {
      router.push(url);
    }
    setOpen(false);
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const path = usePathname();
  const pageName = capitalizeFirstLetter(path.split("/")[1]);

  const renderButtons = () => (
    <>
      <Button
        text="Sign Up"
        bgcolor="bg-transparent hover:bg-white ease-in-out-expo duration-100 transition-all"
        textcolor="text-customPurple hover:font-semibold Xl:text-[0.9vw]"
        bordercolor="border-customPurple"
        height="h-9 Xl:h-[5vh]"
        width="w-24 Xl:w-[7vw]"
        onClickFn={() => router.push("/signup")}
      />
      <Button
        text="Login"
        bgcolor="bg-customPurple hover:bg-[#b31aff] ease-in-out-expo duration-100 transition-all"
        textcolor="text-white Xl:text-[0.9vw]"
        bordercolor="border-customPurple"
        height="h-9 Xl:h-[5vh]"
        width="w-24 Xl:w-[7vw]"
        onClickFn={() => router.push("/signin")}
      />
    </>
  );

  return (
    <nav
      className={`flex items-center justify-center ${
        path.split("/")[1] && "py-4 Xl:py-[2.5vh] px-4 md:px-0"
      }`}
    >
      {path.split("/")[1] != "" ? (
        <>
          {/* Logo and Page Name for Documentation */}
          <div className="flex items-center space-x-3 Xl:space-x-[1.5vh] w-[17rem]">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-8 sm:w-10 h-8 sm:h-10 Xl:w-[2.5vw] Xl:h-[2.5vw] object-cover rounded-full"
              />
            </Link>
            <div className="text-white text-md sm:text-lg Xl:text-[1.5vw] w-20">
              OvaDrive
            </div>
          </div>
          <div className="flex justify-between w-full">
            {path.split("/")[1] !== "documentation" ? (
              <div className="my-auto lg:opacity-0 text-white text-base sm:text-lg lg:ml-[8%] 2xl:ml-[15%] 3xl:ml-[20%]">
                {pageName}
              </div>
            ) : (
              <div className="my-auto lg:opacity-0 text-white text-base sm:text-lg Xl:text-[1.4vw] -ml-[5vw] 2xl:-ml-[1.2vw] Xl:ml-[12vh]">
                {pageName}
              </div>
            )}
            {!session.data?.user ? (
              <>
                {/* Button Rendering */}
                <div className="hidden sm:flex space-x-2 sm:space-x-4 Xl:space-x-[1vw]">
                  {renderButtons()}
                </div>
                <div className="block sm:hidden">
                  <Hamburger
                    size={20}
                    color="#ffffff"
                    toggled={open}
                    toggle={setOpen}
                  />
                  {open && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex z-[900] absolute top-8 right-8 bg-customBlack rounded-lg border-[1px]"
                      ref={ref}
                    >
                      <div className="flex flex-col space-y-2 w-32 divide-y-[1px]">
                        <button
                          className="text-sm p-2 flex hover:text-gray-400"
                          onClick={() => handleNavClick("/signup")}
                        >
                          Sign Up
                        </button>
                        <button
                          className="text-sm p-2 flex hover:text-gray-400"
                          onClick={() => handleNavClick("/signin")}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <ProfileDropDown
                email={session.data?.user?.email}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
        </>
      ) : (
        <div
          className={`fixed z-40 flex justify-between w-[97%] md:w-[94%] ${
            isOpen && screenSize >= 1024 && screenSize < 1280
              ? "lg:w-[75%] mr-[4rem]"
              : "lg:w-[79%]"
          } xl:w-8/12 border border-[#ffffff88] rounded-full items-center px-1 sm:p-1.5 Xl:p-[0.8vh] bg-white bg-opacity-30 backdrop-blur-md top-6 sm:top-4 Xl:top-[2vh]`}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex items-center space-x-2">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-9 2xl:w-10 Xl:w-[6vh] h-9 2xl:h-10 Xl:h-[6vh] object-cover rounded-full"
              />
            </Link>
          </div>
          <div className="hidden md:flex">
            <ul className="flex space-x-2 lg:space-x-4 xl:space-x-7 Xl:space-x-[1.6vw] text-white text-xs md:text-[12px] 2xl:text-[14px] Xl:text-[0.9vw] items-center">
              {data.navLinks.map((item) => (
                <li
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  className="relative"
                >
                  <Link
                    href={item.url}
                    onClick={() => {
                      AnimationManager.autoKill = true;
                      setSelected(item.name);
                      handleNavClick(item.url);
                    }}
                    className={`${
                      activeSection?.current === item.name ? "rounded-full" : ""
                    } hover:text-gray-300 ease-in-out-expo duration-300 transition-all cursor-pointer `}
                  >
                    {item.name}
                    {/* underline animation */}
                    <div
                      className={`absolute mt-[0.3vh] Xl:mt-[0.9vh] h-[0.5vh] bg-customBlack2 bg-opacity-90 rounded-full transition-all duration-500 ease-in-out
      ${activeSection?.current === item.name ? "w-full" : "w-0"}`}
                    ></div>
                  </Link>
                  {/* Check for subLinks and render them on hover */}
                  {item.subLinks.length > 0 && hoveredItem === item.id && (
                    <div
                      onMouseEnter={() => setHoveredItem(item.id)}
                      className="absolute z-10 mt-4 Xl:mt-[3.5vh] bg-customBlack text-white rounded-lg Xl:rounded-[1.5vh] ring-1 Xl:ring-4 ring-white ring-opacity-70"
                    >
                      {item.subLinks.map((subLink) => (
                        <Link
                          key={subLink.id}
                          href={subLink.url}
                          className="block px-4 Xl:px-[1vw] py-3 Xl:py-[2.5vh]"
                          onClick={() => handleNavClick(subLink.url)}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:flex gap-2 Xl:gap-[0.5vw] items-center">
            <Button
              text="Get The App"
              bgcolor="bg-customPurple"
              textcolor="text-white Xl:text-[0.9vw]"
              bordercolor="border-customPurple"
              height="h-7 sm:h-9 2xl:h-10 Xl:h-[6vh]"
              width="w-24 2xl:w-28 Xl:w-[7vw]"
              onClickFn={() => handleNavClick("/")}
            />
            {/* secondary Navbar button */}
            {!session.data?.user ? (
              <Button
                text="Login"
                bgcolor="bg-transparent hover:bg-white ease-in-out-expo duration-100 transition-all"
                textcolor="text-white Xl:text-[0.9vw] hover:text-black hover:font-semibold ease-in-out-expo duration-100 transition-all"
                bordercolor="border-white ease-in-out-expo duration-100 transition-all"
                height="h-7 sm:h-9 2xl:h-10 Xl:h-[6vh]"
                width="w-24 2xl:w-28 Xl:w-[7vw]"
                onClickFn={() => router.push("/signin")}
              />
            ) : (
              <ProfileDropDown
                email={session.data?.user?.email}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
          {/* Hamburger Menu for Small Screens */}
          <div className="block md:hidden">
            <Hamburger
              size={20}
              color="#ffffff"
              toggled={open}
              toggle={setOpen}
            />
            {open && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex z-[900] absolute top-2 right-2 bg-customBlack rounded-lg border-[1px]"
                ref={ref}
              >
                <div className="flex flex-col space-y-2 w-32 divide-y-[1px]">
                  {data.navLinks.map((item) => (
                    <button
                      key={item.id}
                      className="text-sm p-2 flex hover:text-gray-400"
                      onClick={() =>
                        handleNavClick(
                          item.subLinks.length > 0
                            ? item.subLinks[0].url
                            : item.url
                        )
                      }
                      onMouseEnter={() => setHoveredItem(item.id)}
                    >
                      {/* {item.name} */}
                      {item.subLinks.length > 0
                        ? item.subLinks[0].name
                        : item.name}
                    </button>
                  ))}
                  {!session.data?.user && (
                    <>
                      <button
                        className="text-sm p-2 flex hover:text-gray-400"
                        onClick={() => handleNavClick("/signup")}
                      >
                        Sign Up
                      </button>
                      <button
                        className="text-sm p-2 flex hover:text-gray-400"
                        onClick={() => handleNavClick("/signin")}
                      >
                        Login
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
