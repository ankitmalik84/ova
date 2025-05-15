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

  return <div className="h-full w-full bg-background text-foreground"></div>;
}
