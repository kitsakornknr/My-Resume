import type { Metadata } from "next";
import { Manrope, Noto_Sans_Thai } from "next/font/google"; 
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

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
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}