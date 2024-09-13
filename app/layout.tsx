import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "@/app/context/ToasterContext";
import AuthContextProvider from "@/app/context/AuthContext";
import { Providers } from "./providers";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
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
