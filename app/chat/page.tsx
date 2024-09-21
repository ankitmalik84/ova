// app/chat/page.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { Paperclip } from "lucide-react";
import NavBar from "../components/NavBar";
import MediaOptions from "@/app/chat/components/MediaOptions";
import LeftSidebar from "@/app/chat/components/LeftSidebar";
import TopNavigation from "@/app/chat/components/TopNavigation";

// WEBSOCKETS IMPLEMENTATION FOR CHAT FUNCTIONALITY AND PRISMA IMPLEMENTATION FOR DB OPERATIONS WILL BE REMAINING
// IMPLEMENTATION OF SHOW CHATS FOR SELECTED DATE WILL BE REMAINING
// IMPLEMENTATION OF SCHEDULED ACTIONS WILL BE REMAINING
// IMPLEMENTATION OF SUMMARY PROMPTS WILL BE REMAINING
// IMPLEMENTATION OF MEDIA UPLOAD FUNCTIONALITY WILL BE REMAINING
// IMPLEMENTATION OF CALENDAR FUNCTIONALITY WILL BE REMAINING

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "model",
      content: "Hello, how can I assist you today?",
      time: "10:00 AM",
    },
    {
      sender: "user",
      content: "Can you tell me about the weather?",
      time: "10:01 AM",
    },
  ]);

  const [date, setDate] = useState<Date | undefined>(new Date()); // Add date state
  const mediaPopUp = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Handle scroll to the bottom when messages are updated
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle click outside of media options popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mediaPopUp.current &&
        !mediaPopUp.current.contains(event.target as Node)
      ) {
        setShowMediaOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMediaOptions]);

  // Event handler for message input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Handle sending a message and simulate a response from the model
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleTimeString("en-US", options);

    if (message.trim()) {
      const newMessage = {
        sender: "user",
        content: message,
        time: currentTime,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");

      // Simulate model response after 1 second
      setTimeout(() => {
        const modelMessage = {
          sender: "model",
          content: "The weather is sunny today with a high of 25°C.",
          time: new Date().toLocaleTimeString("en-US", options),
        };
        setMessages((prevMessages) => [...prevMessages, modelMessage]);
      }, 1000);
    }
  };

  // Toggle the media options popup
  const toggleMediaOptions = () => {
    setShowMediaOptions(!showMediaOptions);
  };

  // Handle media selection
  const handleMediaSelect = (mediaType: string) => {
    setShowMediaOptions(false); // Close media options after selection
    console.log("Selected media type:", mediaType);

    // Open file dialog or implement media handling logic based on mediaType
    if (mediaType === "camera") {
      // Implement camera access logic here (if applicable)
    } else if (mediaType === "document") {
      // Open file dialog for document upload
      const input = document.createElement("input");
      input.type = "file";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          // Handle file upload logic
          const currentTime = new Date().toLocaleTimeString("en-US", options);
          const newMessage = {
            sender: "user",
            content: `Uploaded document: ${file.name}`,
            time: currentTime,
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      };
      input.click();
    } else if (mediaType === "gallery") {
      // Open file dialog for image upload
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          // Handle image upload logic
          const currentTime = new Date().toLocaleTimeString("en-US", options);
          const newMessage = {
            sender: "user",
            content: `Uploaded image: ${file.name}`,
            time: currentTime,
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      };
      input.click();
    } else if (mediaType === "audio") {
      // Open file dialog for audio upload
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "audio/*";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          // Handle audio upload logic
          const currentTime = new Date().toLocaleTimeString("en-US", options);
          const newMessage = {
            sender: "user",
            content: `Uploaded audio: ${file.name}`,
            time: currentTime,
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      };
      input.click();
    }
  };

  const handleSummaryPromptClick = (prompt: string) => {
    console.log("Summary prompt clicked:", prompt);
    // Implement your logic here
  };

  const handleScheduledActionClick = (action: string) => {
    console.log("Scheduled action clicked:", action);
    // Implement your logic here
  };

  // Define the button click handlers
  const handleImageGenerate = () => {
    console.log("Image generation logic here");
    // Implement image generation logic
  };

  const handleMusicGenerate = () => {
    console.log("Music generation logic here");
    // Implement music generation logic
  };

  const handleScheduleEvent = () => {
    console.log("Schedule event logic here");
    // Implement event scheduling logic
  };

  const handleSummary = () => {
    console.log("Summary logic here");
    // Implement summary logic
  };
  useEffect(() => {
    console.log("Date changed to:", date);
    // Implement your logic here
  }, [date]);

  return (
    <div className="h-[90vh] Xl:h-[88vh] pb-4  pt-2 md:px-12 lg:px-16 Xl:px-[10vw]">
      <NavBar />
      <div className="flex gap-5 2xl:gap-6 3xl:gap-8 Xl:gap-[1.5vw] h-full">
        <LeftSidebar
          handleSummaryPromptClick={handleSummaryPromptClick}
          handleScheduledActionClick={handleScheduledActionClick}
          date={date} // Pass date to LeftSidebar
          setDate={setDate} // Pass setDate to LeftSidebar
        />
        {/* Main Chat Area */}
        <div className=" flex-1 w-[100%] lg:w-[95%] xl:w-[94%] flex flex-col justify-between rounded-xl Xl:rounded-[2vh] bg-customBlack2 relative">
          <h1 className="absolute z-[99999] hidden lg:flex -top-12 Xl:-top-[6vh] text-white text-base sm:text-lg Xl:text-[3vh]">
            Chat
          </h1>
          {/* Top Navigation */}
          <TopNavigation
            onImageGenerate={handleImageGenerate}
            onMusicGenerate={handleMusicGenerate}
            onScheduleEvent={handleScheduleEvent}
            onSummary={handleSummary}
          />

          {/* Chat Messages Area */}
          <div className=" flex-1 pt-28 Xl:pt-[15vh] pb-16 Xl:pb-[9vh] p-4 Xl:px-[2vh] overflow-y-auto z-10 top-0 bottom-0 absolute w-full rounded-xl Xl:rounded-[2vh]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } mb-4 Xl:mb-8`}
              >
                {msg.sender === "model" && (
                  <img
                    src="/images/logo.png"
                    alt="model logo"
                    className="h-7 w-7 Xl:h-[4vh] Xl:w-[4vh] mr-2 Xl:mr-[1vh]"
                  />
                )}
                <div
                  className={`max-w-[80%] p-3 Xl:p-[1.5vh] rounded-xl Xl:rounded-2xl text-white ${
                    msg.sender === "model"
                      ? "bg-[#A600FC] rounded-tl-none Xl:rounded-tl-none"
                      : "bg-customPurple bg-opacity-40 rounded-tr-none Xl:rounded-tr-none"
                  }`}
                >
                  <p className="text-sm Xl:text-[1.8vh] Xl:leading-[2vh]">
                    {msg.content}
                  </p>
                  <p className="text-xs Xl:text-[1.4vh] mt-2 Xl:mt-[1.8vh] text-right">
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            {/* Invisible div to anchor the scroll position */}
            <div ref={bottomRef} />
          </div>

          {/* Message Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 Xl:p-[4vh] bg-customBlack2 flex items-center relative z-20 rounded-b-xl Xl:rounded-b-[2vh] max-h-32"
          >
            {/* media upload options */}
            {showMediaOptions && (
              <MediaOptions
                mediaPopUpRef={mediaPopUp}
                onMediaSelect={handleMediaSelect}
              />
            )}

            <div className="flex items-center h-auto flex-1 bg-customBlack text-white border-none rounded-xl relative">
              {/* Media Toggle Button */}
              <button
                type="button"
                className="absolute left-0 ml-2 Xl:ml-[1vh]"
                onClick={toggleMediaOptions}
              >
                <Paperclip className="h-5 w-5 Xl:h-[2.5vh] Xl:w-[2.5vh]" />
              </button>
              {/* Input Field */}
              <textarea
                placeholder="Type here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown} // Handle key down events
                className="pt-3 pl-10 Xl:pl-[4.5vh] w-full bg-customBlack Xl:text-[2vh] text-white border-none h-12 Xl:h-[5vh] rounded-xl"
                style={{ maxHeight: "12rem" }}
              ></textarea>
            </div>
            {/* Send Button */}
            <Button
              type="submit"
              className="ml-2 Xl:ml-[1.5vh] w-10 h-10 Xl:w-[5vh] Xl:h-[5vh] bg-purple-600 rounded-full flex justify-center items-center"
            >
              <img
                src="/images/icons/send.png"
                className="h-6 w-6 Xl:w-[3vh] Xl:h-[3vh] invert"
                alt="send icon"
              />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
