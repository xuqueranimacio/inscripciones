"use client";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FooterComponent } from "./components/FooterComponent";
import { verificarSesion } from "./components/utils";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isMobileView, setMobileView] = useState(false);
  
  const router = useRouter();

  const handleResize = useCallback(() => {
    const mobileWidth = 768;
    const currentWidth = window.innerWidth;
    setMobileView(currentWidth < mobileWidth);
    if(isMobileView){
      let menu = document.getElementById("menu");
      if(menu){
        menu.style.display = "flex";
      }
    }else{
      let menu = document.getElementById("menu")
      if(menu){
        menu.style.display = "hidden";
      }
    }
  }, []);
  
  const handleLogoClick = () => {
    router.push("/");
  };

  useEffect(() => {
    // Check login status
    if (verificarSesion()) {
      setIsLoggedIn(true);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/x-icon" href="/logo.png"/>
        <title>Inscripciones Xuquer Animació</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={`${geistSans.variable}`}>
        <header>
          <a onClick={handleLogoClick} className="logo">
            <img src="/logo.png" alt="Xuquer Animacio" />
          </a>

          {isMobileView ? (
            <nav 
              id="menu" 
            >
              <img src="/menu.png" alt="Menu" />
            </nav>
          ) : (
            <div className="navLinks" id="links">
              <Link href="/">Inicio</Link>
              <Link href="/#inscripciones">Inscripciones</Link>
              <Link href="/#funcionamiento">¿Cómo funciona?</Link>
              <Link href="/terms">Términos y Condiciones</Link>
              {isLoggedIn && (
                <Link href="/administrador">Panel de Administrador</Link>
              )}
            </div>
          )}

          {isMobileView && isAsideOpen && (
            <div className="mobile-menu">
              <Link href="/">Inicio</Link>
              <Link href="/#inscripciones">Inscripciones</Link>
              <Link href="/#funcionamiento">¿Cómo funciona?</Link>
              <Link href="/terms">Términos y Condiciones</Link>
              {isLoggedIn && (
                <Link href="/administrador">Panel de Administrador</Link>
              )}
            </div>
          )}
        </header>

        {children}

        <FooterComponent />
      </body>
    </html>
  );
}