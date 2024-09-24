"use client";

import { useState, useEffect, forwardRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import data from "@/app/data.json";
import { FaLinkedin, FaGithub } from "react-icons/fa";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  data: string;
  img: string;
  linkedin?: string;
  github?: string;
}

const teamMembers: TeamMember[] = data.team;

const OurTeam = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const [currentMemberImage, setCurrentMemberImage] = useState(
    teamMembers[0].img
  );

  const leftSliderSettings1 = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    speed: 800,
    arrows: false,
  };

  const leftSliderSettings2 = {
    dots: false,
    infinite: true,
    autoplay: true,
    vertical: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    speed: 800,
    arrows: false,
    afterChange: (current: number) => {
      setCurrentMemberImage(teamMembers[current].img);
    },
  };

  const rightSliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    speed: 800,
    arrows: false,
    responsive: [
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (ref && "current" in ref && ref.current) {
      (
        ref.current as HTMLDivElement
      ).style.backgroundImage = `url(${currentMemberImage})`;
      (ref.current as HTMLDivElement).style.backgroundSize = "cover";
      (ref.current as HTMLDivElement).style.backgroundPosition = "center";
      (ref.current as HTMLDivElement).style.opacity = "0.3";
    }
  }, [currentMemberImage, ref]);

  return (
    <div className="mx-auto h-[700px] md:h-[400px] lg:h-[500px] Xl:h-[55vh] max-w-[1420px] Xl:max-w-[90vw]">
      <h1 className="text-3xl font-bold mb-10 Xl:text-[1.8vw] Xl:mb-[3vh]">
        Our Team
      </h1>
      <div className="flex flex-col md:flex-row w-full">
        {/* Left Side: One slider for content, one for images */}
        <div className="w-full lg:w-1/2 flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <Slider {...leftSliderSettings2}>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="px-1 sm:px-2 Xl:px-[1vh] h-[60px] sm:h-[70px] Xl:h-[8vh] w-full"
                >
                  <div className="flex flex-col">
                    <h2 className="text-lg sm:text-xl xl:text-[23px] xl:leading-[30px] Xl:text-[1.5vw] Xl:leading-[2vw] font-semibold">
                      {member.name}
                    </h2>
                    <div className="bg-customPurple h-[2px] Xl:h-[0.4vh] w-[90%]"></div>
                    <p className="text-sm Xl:text-[1vw] Xl:leading-[1.5vw] font-normal">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
            <Slider {...leftSliderSettings2}>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="h-[200px] sm:h-[330px] Xl:h-[38vh] w-full"
                >
                  <div className="p-1 sm:px-2 Xl:p-[1vh] flex flex-col gap-1 sm:gap-2">
                    <p className="text-sm sm:text-base leading-5 sm:leading-6 Xl:text-[1vw] Xl:leading-[1.4vw]">
                      {member.data}
                    </p>
                    {/* {member.linkedin && ( */}
                    <div className="flex gap-2">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-200 transition-colors duration-300"
                      >
                        <FaLinkedin className="h-[3vh] w-[3vh] xl:h-[4vh] xl:w-[4vh]" />
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-200 transition-colors duration-300"
                      >
                        <FaGithub className="h-[3vh] w-[3vh] xl:h-[4vh] xl:w-[4vh]" />
                      </a>
                    </div>

                    {/* )} */}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full sm:w-1/2">
            <Slider {...leftSliderSettings1}>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="h-[340px] Xl:h-[46vh] w-full border-2 relative border-white"
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Right Slider: Next Two Images */}
        <div className="hidden lg:block lg:w-1/2">
          <Slider {...rightSliderSettings}>
            {teamMembers.map((_, index) => {
              const nextIndex1 = (index + 1) % teamMembers.length;

              return (
                <div
                  key={index}
                  className="h-[340px] Xl:h-[46vh] pt-[36px] Xl:pt-[6vh]"
                >
                  <div className="p-1">
                    <div className="h-[300px] Xl:h-[40vh] w-full relative">
                      <Image
                        src={teamMembers[nextIndex1].img}
                        alt={teamMembers[nextIndex1].name}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
});

OurTeam.displayName = "OurTeam";

export default OurTeam;
