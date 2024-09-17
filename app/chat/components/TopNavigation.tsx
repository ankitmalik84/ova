// app/chat/components/TopNavigation.tsx
import React from "react";
import { Button } from "@/app/components/ui/button";

interface TopNavigationProps {
  onImageGenerate: () => void;
  onMusicGenerate: () => void;
  onScheduleEvent: () => void;
  onSummary: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  onImageGenerate,
  onMusicGenerate,
  onScheduleEvent,
  onSummary,
}) => {
  return (
    <div className="p-4 Xl:p-[3vh] flex flex-col gap-2 Xl:gap-[2vh] z-20 rounded-xl Xl:rounded-[2vh] relative bg-customBlack2">
      <h2 className="text-lg Xl:text-[2.5vh] font-semibold bg-customBlack2">
        Try features like-
      </h2>
      <div className="flex flex-wrap gap-2 Xl:gap-3 bg-customBlack2">
        <Button
          variant="outline"
          className="text-white Xl:h-[4vh] Xl:text-[1.6vh] border-white border-opacity-75 rounded-xl Xl:py-[2vh] Xl:rounded-[1.2vh]"
          onClick={onImageGenerate} // Add onClick handler
        >
          Generate an image for me
        </Button>
        <Button
          variant="outline"
          className="text-white Xl:h-[4vh] Xl:text-[1.6vh] border-white border-opacity-75 rounded-xl Xl:py-[2vh] Xl:rounded-[1.2vh]"
          onClick={onMusicGenerate} // Add onClick handler
        >
          Generate a music for me
        </Button>
        <Button
          variant="outline"
          className="text-white Xl:h-[4vh] Xl:text-[1.6vh] border-white border-opacity-75 rounded-xl Xl:py-[2vh] Xl:rounded-[1.2vh]"
          onClick={onScheduleEvent} // Add onClick handler
        >
          Schedule an event for me on calendar
        </Button>
        <Button
          variant="outline"
          className="text-white Xl:h-[4vh] Xl:text-[1.6vh] border-white border-opacity-75 rounded-xl Xl:py-[2vh] Xl:rounded-[1.2vh]"
          onClick={onSummary} // Add onClick handler
        >
          Write a summary of past 24 hours
        </Button>
      </div>
    </div>
  );
};

export default TopNavigation;
