import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "@/app/context/ToasterContext";
import AuthContextProvider from "@/app/context/AuthContext";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-customBlack text-foreground`}>
        <Providers>
          <AuthContextProvider>
            <ToasterContext />
            {children}
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
