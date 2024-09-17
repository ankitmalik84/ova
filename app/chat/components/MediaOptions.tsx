import React from "react";
import { Headphones } from "lucide-react"; // Import custom icon

interface MediaOptionsProps {
  mediaPopUpRef: React.RefObject<HTMLDivElement>;
  onMediaSelect: (mediaType: string) => void; // Add this prop
}

// Single Media Option component (internal to MediaOptions)
const MediaOption: React.FC<{
  iconSrc?: string;
  IconComponent?: any;
  label: string;
  alt: string;
  onClick: () => void; // Add onClick prop
}> = ({ iconSrc, IconComponent, label, alt, onClick }) => {
  return (
    <div className="flex flex-col items-center gap-2 Xl:gap-4">
      <button
        onClick={onClick}
        className="h-10 Xl:h-[5vh] w-10 Xl:w-[5vh] bg-customPurple rounded-full text-center flex justify-center items-center text-white"
      >
        {iconSrc ? (
          <img
            src={iconSrc}
            className="h-7 Xl:h-[3.5vh] w-7 Xl:w-[3.5vh] invert"
            alt={alt}
          />
        ) : (
          IconComponent && (
            <IconComponent className="h-7 Xl:h-[3.5vh] w-7 Xl:w-[3.5vh] text-white-500" />
          )
        )}
      </button>
      <span className="text-xs Xl:text-[1.5vh]">{label}</span>
    </div>
  );
};

const MediaOptions: React.FC<MediaOptionsProps> = ({
  mediaPopUpRef,
  onMediaSelect,
}) => {
  return (
    <div
      ref={mediaPopUpRef}
      className="absolute bottom-20 Xl:bottom-[10vh] left-4 Xl:left-[4vh] bg-customGray rounded-xl p-4 Xl:p-[2vh] shadow-lg flex gap-4 Xl:gap-[2vh] z-50"
    >
      <MediaOption
        iconSrc="/images/icons/camera.png"
        label="Camera"
        alt="camera icon"
        onClick={() => onMediaSelect("camera")} // Handle camera click
      />
      <MediaOption
        iconSrc="/images/icons/document.png"
        label="Document"
        alt="document icon"
        onClick={() => onMediaSelect("document")} // Handle document click
      />
      <MediaOption
        iconSrc="/images/icons/gallery.png"
        label="Gallery"
        alt="gallery icon"
        onClick={() => onMediaSelect("gallery")} // Handle gallery click
      />
      <MediaOption
        IconComponent={Headphones}
        label="Audio"
        alt="audio icon"
        onClick={() => onMediaSelect("audio")} // Handle audio click
      />
    </div>
  );
};

export default MediaOptions;
