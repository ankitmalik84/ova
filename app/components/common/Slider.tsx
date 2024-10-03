import { FC } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/legacy/image";

interface SliderItem {
  id: number;
  img: string;
}

interface SliderCompProps {
  heading: string;
  data: SliderItem[];
}

const SliderComp: FC<SliderCompProps> = ({ heading, data }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    speed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="h-full flex flex-col ">
      <h2 className="text-white text-3xl Xl:text-[4vh] mb-8 xl:mb-6 Xl:mb-[6vh] pl-6 xl:pl-[5vh] ">
        {heading}
      </h2>
      <Slider {...settings}>
        {data.map((item) => (
          <div key={item.id} className="px-1 Xl:px-[0.4vw]">
            <div className="relative h-[60vh] xl:h-[65vh] Xl:h-[70vh] w-full">
              <Image
                src={item.img}
                alt="Slider Image"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComp;
