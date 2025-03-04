"use client";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }) {
  const router = useRouter();

  const handleResize = () => {
    if(window.screen.width < 768) {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
  }
  
  const handleLogoClick = () => {
    router.push("/");
  };

  // Re-renderizar cuando localStorage cambie
  useEffect(() => {

    let menu = document.getElementById("menu")
    
    
    handleResize();
    window.addEventListener("resize", handleResize);

  }, []);

  return (
    <html lang="en">
      <head>
        <title>Inscripciones Xuquer Animació</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={`${geistSans.variable}`}>
        <header>
          <a onClick={handleLogoClick} className="logo">
            <img src="/logo.png" alt="Xuquer Animacio" />
          </a>

          <nav id="menu">
            <a><img src="/menu.png" /></a>
          </nav>

        </header>

        {children}

        <footer></footer>
      </body>
    </html>
  );
}
