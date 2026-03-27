import type { Metadata } from "next";
import { Manrope, Noto_Sans_Thai } from "next/font/google"; 
import "./globals.css";
import { ResumeProvider } from "@/context/ResumeContext"; 

const manrope = Manrope({ subsets: ["latin"] });
const notoThai = Noto_Sans_Thai({ subsets: ["thai"] });

export const metadata: Metadata = {
  title: "Kitsakorn | Full Stack Dev",
  description: "Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className="antialiased bg-black text-white"
        style={{ 
          fontFamily: `${manrope.style.fontFamily}, ${notoThai.style.fontFamily}, sans-serif` 
        }}
      >
        {}
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}