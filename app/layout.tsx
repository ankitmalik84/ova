import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "@/app/context/ToasterContext";
import { Providers } from "./providers";
import FirebaseContextProvider from "./context/FirebaseContext";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "OvaDrive - Your AI Voice Assistant",
    template: "%s | OvaDrive",
  },
  description:
    "OvaDrive is the ultimate voice assistant that follows you everywhere, learning about your life and helping you organize your thoughts and tasks. Own your data, own your life, own your future.",
  keywords: [
    "AI voice assistant",
    "personal assistant",
    "AI assistant",
    "voice commands",
    "productivity tool",
    "life organization",
    "voice AI",
    "data ownership",
  ],
  authors: [{ name: "OvaDrive Team" }, { name: "Jack Jay" }],
  viewport:
    "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ovadrive.com",
    siteName: "OvaDrive",
    title: "OvaDrive - Your Always-Ready AI Voice Assistant",
    description:
      "Own your data, own your life, own your future with OvaDrive - the ultimate voice assistant that helps you organize your thoughts and life.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "OvaDrive AI Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OvaDrive - Your Always-Ready AI Voice Assistant",
    description:
      "The next evolution in how humans interact with technology. Always ready to help with whatever you need.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-customBlack text-foreground`}>
        <Providers>
          <FirebaseContextProvider>
            <ToasterContext />
            {children}
          </FirebaseContextProvider>
        </Providers>
      </body>
    </html>
  );
}
