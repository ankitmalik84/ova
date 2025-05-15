// app/chat/layout.tsx
import React from "react";
import { ThemeToggle } from "@/app/components/ThemeToggle";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <div>
      <ThemeToggle />
      {children}
    </div>
  );
};

export default ChatLayout;
