// app/documentation/layout.tsx

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to use OvaDrive, the always-ready AI voice assistant that helps organize your life. Discover features, commands, and how to get the most out of your personal AI assistant.",
  keywords: [
    "OvaDrive documentation",
    "AI assistant guide",
    "voice command manual",
    "AI voice assistant help",
    "personal data management",
  ],
  openGraph: {
    title: "OvaDrive Documentation",
    description:
      "Learn how to use your always-ready AI voice assistant to organize your thoughts and life.",
    images: ["/images/logo.png"],
  },
  twitter: {
    title: "OvaDrive Documentation",
    description:
      "Master your OvaDrive AI voice assistant with our comprehensive documentation.",
  },
};

interface DocumentationProps {
  children: React.ReactNode;
}

const Documentation: React.FC<DocumentationProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Documentation;
