"use client";

import { useState, useEffect, forwardRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import data from "@/app/data.json";
import { FaLinkedin } from "react-icons/fa";

interface TeamMember {
  id: number;
  name: string;
  data: string;
  img: string;
  linkedin?: string;
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
    <div className="mx-auto h-[700px] md:h-[400px] lg:h-[500px] max-w-[1420px]">
      <h1 className="text-3xl font-bold mb-10">Our Team</h1>
      <div className="flex flex-col md:flex-row w-full">
        {/* Left Side: One slider for content, one for images */}
        <div className="w-full lg:w-1/2 flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <Slider {...leftSliderSettings2}>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="h-[30px] sm:h-[40px] w-full flex items-center"
                >
                  <div className="p-1 sm:p-2">
                    <h2 className="text-lg sm:text-2xl font-semibold">
                      {member.name}
                    </h2>
                  </div>
                </div>
              ))}
            </Slider>
            <Slider {...leftSliderSettings2}>
              {teamMembers.map((member) => (
                <div key={member.id} className="h-[220px] sm:h-[420px] w-full">
                  <div className="p-1 sm:p-2 flex flex-col gap-1 sm:gap-2">
                    <p className="mt-2 sm:mt-4 text-sm sm:text-base leading-5 sm:leading-6">
                      {member.data}
                    </p>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-200 transition-colors duration-300"
                      >
                        <FaLinkedin size={24} />
                      </a>
                    )}
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
                  className="h-[340px] w-full border-2 relative border-white"
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
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
                <div key={index} className="h-[340px] pt-[36px]">
                  <div className="p-1">
                    <div className="h-[300px] w-full relative">
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
