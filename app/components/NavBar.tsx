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
  // const [currentSection, setCurrentSection] = useState(activeSection?.current);

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
        // AnimationManager.stopAllAnimations();
        // section.scrollIntoView({ behavior: "smooth", block: "start" });
        // window.dispatchEvent(new CustomEvent("navClick", { detail: url }));
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
        bgcolor="bg-transparent"
        textcolor="text-customPurple Xl:text-[0.9vw]"
        bordercolor="border-customPurple"
        height="h-9 Xl:h-[5vh]"
        width="w-24 Xl:w-[7vw]"
        onClickFn={() => router.push("/signup")}
      />
      <Button
        text="Login"
        bgcolor="bg-customPurple"
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
        path.split("/")[1] && "py-4 Xl:py-[2.5vh] px-4"
      }`}
    >
      {path.split("/")[1] != "" ? (
        <>
          {/* Logo and Page Name for Documentation */}
          <div className="flex items-center space-x-2 w-[17rem]">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-8 sm:w-10 h-8 sm:h-10 Xl:w-[2.5vw] Xl:h-[2.5vw] object-cover rounded-full"
              />
            </Link>
            <div className="text-white text-md sm:text-lg Xl:text-[1.4vw] w-20">
              OvaDrive
            </div>
          </div>
          <div className="flex justify-between w-full">
            {path.split("/")[1] !== "documentation" ? (
              <div className="my-auto lg:opacity-0 text-white text-base sm:text-lg lg:ml-[8%] 2xl:ml-[15%] 3xl:ml-[20%]">
                {pageName}
              </div>
            ) : (
              <div className="my-auto text-white text-base sm:text-lg Xl:text-[1.4vw] lg:ml-[8%] 2xl:ml-[15%] 3xl:ml-[20%] Xl:ml-[10vw]">
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
              ? "lg:w-[82%] mr-[6rem]"
              : "lg:w-[90%]"
          } xl:w-9/12 border border-[#ffffff88] rounded-full items-center px-1 sm:p-2 Xl:px-[0.3vw] bg-white bg-opacity-30 backdrop-blur-md top-6 sm:top-4`}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex items-center space-x-2">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-10 Xl:w-[2.5vw] h-10 Xl:h-[2.5vw] object-cover rounded-full"
              />
            </Link>
          </div>
          <div className="hidden md:flex">
            <ul className="flex space-x-2 lg:space-x-5 xl:space-x-8 Xl:space-x-[1.5vw] text-white text-xs md:text-sm Xl:text-[0.8vw] items-center">
              {data.navLinks.map((item) => (
                <li
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  className="relative" // Add relative positioning for the dropdown
                >
                  <Link
                    href={item.url}
                    onClick={() => {
                      AnimationManager.autoKill = true;
                      setSelected(item.name);
                      handleNavClick(item.url);
                    }}
                    className={`${
                      AnimationManager.activeSection === item.name
                        ? "bg-customBlack2 p-2 Xl:p-[1vh] rounded-full"
                        : ""
                    } hover:text-gray-400 ease-in-out-expo duration-300 transition-all ${
                      ["AboutUs", "Our Team"].includes(item.name)
                        ? "cursor-default"
                        : "cursor-pointer"
                    }`}
                  >
                    {item.name}
                  </Link>
                  {/* Check for subLinks and render them on hover */}
                  {item.subLinks.length > 0 && hoveredItem === item.id && (
                    <div
                      onMouseEnter={() => setHoveredItem(item.id)}
                      className="absolute z-10 mt-5 Xl:mt-[3vh] bg-customBlack text-white rounded-lg Xl:rounded-3xl ring-1 Xl:ring-4 ring-white ring-opacity-70"
                    >
                      {item.subLinks.map((subLink) => (
                        <Link
                          key={subLink.id}
                          href={subLink.url}
                          className="block px-4 Xl:px-[1vw] py-3 Xl:py-[2vh]"
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
          <div className="hidden md:flex gap-2 Xl:gap-6 items-center">
            <Button
              text="Get The App"
              bgcolor="bg-customPurple"
              textcolor="text-white Xl:text-[0.9vw]"
              bordercolor="border-customPurple"
              height="h-7 sm:h-10 Xl:h-[5vh]"
              width="w-24 lg:w-28 Xl:w-[7vw]"
              onClickFn={() => handleNavClick("/")}
            />
            {/* secondary Navbar button */}
            {!session.data?.user ? (
              <Button
                text="Login"
                bgcolor="bg-transparent"
                textcolor="text-white Xl:text-[0.9vw]"
                bordercolor="border-white"
                height="h-7 sm:h-10 Xl:h-[5vh]"
                width="w-24 lg:w-28 Xl:w-[7vw]"
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
                className="flex z-[900] absolute top-8 right-8 bg-customBlack rounded-lg border-[1px]"
                ref={ref}
              >
                <div className="flex flex-col space-y-2 w-32 divide-y-[1px]">
                  {data.navLinks.map((item) => (
                    <button
                      key={item.id}
                      className="text-sm p-2 flex hover:text-gray-400"
                      onClick={() => handleNavClick(item.url)}
                    >
                      {item.name}
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
