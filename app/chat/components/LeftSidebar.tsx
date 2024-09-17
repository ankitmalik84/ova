// app/chat/components/LeftSidebar.tsx

import React from "react";
import { Clock4, Smile, Album } from "lucide-react"; // Import icons if needed
import { CalendarComp } from "@/app/chat/components/Calendar";

interface LeftSidebarProps {
  handleSummaryPromptClick: (prompt: string) => void;
  handleScheduledActionClick: (action: string) => void;
  date: Date | undefined; // Accept date as prop
  setDate: (date: Date | undefined) => void; // Accept setDate as prop
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  handleSummaryPromptClick,
  handleScheduledActionClick,
  date,
  setDate,
}) => {
  return (
    <div className="lg:w-[22%] xl:w-[23%] hidden lg:flex flex-col">
      {/* Left side Utilities */}
      <div className="flex flex-col">
        <h2 className="text-sm 2xl:text-base Xl:text-[2vh] font-semibold mb-4 Xl:mb-[2.5vh] text-customGray2">
          Summary prompts
        </h2>
        <ul className="space-y-5 3xl:space-y-6 Xl:space-y-[3vh]">
          <li>
            <button
              className="flex items-center w-full text-left text-sm 2xl:text-base Xl:text-[2vh]"
              onClick={() => handleSummaryPromptClick("Upcoming events")}
            >
              <img
                src="/images/icons/calendar.png"
                alt="summary"
                className="mr-2 h-4 2xl:h-6 Xl:h-[3vh] w-4 2xl:w-6 Xl:w-[3vh] object-cover"
              />
              Upcoming events
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full text-left text-sm 2xl:text-base Xl:text-[2vh]"
              onClick={() => handleSummaryPromptClick("Summary about you")}
            >
              <img
                src="/images/icons/notes.png"
                alt="summary"
                className="mr-2 h-4 2xl:h-6 Xl:h-[3vh] w-4 2xl:w-6 Xl:w-[3vh] object-cover"
              />
              Summary about you
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full text-left text-sm 2xl:text-base Xl:text-[2vh]"
              onClick={() =>
                handleSummaryPromptClick("Guess your astrological sign")
              }
            >
              <img
                src="/images/icons/star.png"
                alt="summary"
                className="mr-2 h-4 2xl:h-6 Xl:h-[3vh] w-4 2xl:w-6 Xl:w-[3vh] invert"
              />
              Guess your astrological sign
            </button>
          </li>
        </ul>
        <h2 className="text-sm 2xl:text-base Xl:text-[2vh] font-semibold mt-4 3xl:mt-8 Xl:mt-[3vh] mb-4 Xl:mb-[3vh] text-customGray2">
          Scheduled actions
        </h2>
        <ul className="space-y-5 3xl:space-y-6 Xl:space-y-[3vh] mb-6">
          <li>
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => handleScheduledActionClick("Today's summary")}
            >
              <span className="flex items-center text-sm 2xl:text-base Xl:text-[2vh]">
                <Clock4 className="mr-2 h-4 2xl:h-6 Xl:h-[3vh] w-4 2xl:w-6 Xl:w-[3vh]" />{" "}
                Today's summary
              </span>
              <span className="text-xs Xl:text-[1.5vh] text-customGray2">
                08:30 pm
              </span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => handleScheduledActionClick("Sentimental score")}
            >
              <span className="flex items-center text-sm 2xl:text-base Xl:text-[2vh]">
                <Smile className="mr-2 h-4 2xl:h-6 Xl:h-[3vh] w-4 2xl:w-6 Xl:w-[3vh]" />{" "}
                Sentimental score
              </span>
              <span className="text-xs Xl:text-[1.5vh] text-customGray2">
                08:30 pm
              </span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => handleScheduledActionClick("Poem about your day")}
            >
              <span className="flex items-center text-sm 2xl:text-base Xl:text-[2vh]">
                <Album className="mr-2 h-4 2xl:h-6 Xl:h-[3vh] w-4 2xl:w-6 Xl:w-[3vh]" />{" "}
                Poem about your day
              </span>
              <span className="text-xs Xl:text-[1.5vh] text-customGray2">
                08:30 pm
              </span>
            </button>
          </li>
        </ul>
      </div>
      {/* Calendar Component */}
      <div className="mt-auto">
        <CalendarComp date={date} setDate={setDate} />{" "}
        {/* Pass date and setDate */}
      </div>
    </div>
  );
};

export default LeftSidebar;
